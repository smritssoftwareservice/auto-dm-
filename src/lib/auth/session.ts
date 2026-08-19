import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

const SESSION_COOKIE_NAME = 'dmflow_session';
const AUTH_SECRET = process.env.AUTH_SECRET || 'dmflow_ai_super_secret_auth_key_32_chars_min';

export interface AuthSessionPayload {
  userId: string;
  email: string;
  name: string;
  organizationId: string;
  organizationSlug: string;
  plan: string;
  role: string;
  userRole: string; // 'SUPERADMIN' | 'USER'
  exp: number;
}

// 1. Password Hashing (PBKDF2 with SHA-256)
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');
  return `${salt}:${hash}`;
}

export function comparePassword(password: string, storedHash: string): boolean {
  if (!storedHash || !storedHash.includes(':')) return false;
  const [salt, originalHash] = storedHash.split(':');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(originalHash, 'hex'));
}

// 2. Token Signing & Verification
function signToken(payload: Record<string, any>): string {
  const jsonStr = JSON.stringify(payload);
  const base64Payload = Buffer.from(jsonStr).toString('base64url');
  const signature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(base64Payload)
    .digest('base64url');

  return `${base64Payload}.${signature}`;
}

function verifyToken(token: string): AuthSessionPayload | null {
  try {
    if (!token || !token.includes('.')) return null;
    const [base64Payload, signature] = token.split('.');

    const expectedSignature = crypto
      .createHmac('sha256', AUTH_SECRET)
      .update(base64Payload)
      .digest('base64url');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const jsonStr = Buffer.from(base64Payload, 'base64url').toString('utf8');
    const payload = JSON.parse(jsonStr) as AuthSessionPayload;

    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired token
    }

    return payload;
  } catch {
    return null;
  }
}

// 3. Create Session Response
export function createSessionToken(payload: Omit<AuthSessionPayload, 'exp'>): string {
  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days
  return signToken({ ...payload, exp });
}

export async function setSessionCookie(payload: Omit<AuthSessionPayload, 'exp'>, res?: NextResponse) {
  const token = createSessionToken(payload);
  try {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });
  } catch {
    // Ignore if headers already sent
  }

  if (res) {
    res.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });
  }

  return token;
}

export async function clearSessionCookie(res?: NextResponse) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
  } catch {
    // Ignore
  }

  if (res) {
    res.cookies.delete(SESSION_COOKIE_NAME);
  }
}

// 4. Retrieve Authenticated User & Scoped Organization Context
export async function getAuthenticatedSession(req?: NextRequest): Promise<AuthSessionPayload | null> {
  let token: string | undefined;

  if (req) {
    token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!token) {
      const authHeader = req.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }
  } else {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    } catch {
      token = undefined;
    }
  }

  if (!token) return null;
  return verifyToken(token);
}

// 5. Require Auth Helper (returns session or null with HTTP status 401)
export async function requireAuthContext(req: NextRequest): Promise<{
  session: AuthSessionPayload;
  errorResponse?: NextResponse;
}> {
  const session = await getAuthenticatedSession(req);
  if (!session) {
    return {
      session: null as any,
      errorResponse: NextResponse.json(
        { error: 'Unauthorized: Session missing or invalid' },
        { status: 401 }
      ),
    };
  }

  return { session };
}
