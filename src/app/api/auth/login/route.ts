import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, hashPassword, setSessionCookie } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. Find User in Database
    let user = await prisma.user.findUnique({
      where: { email: cleanEmail },
      include: {
        memberships: {
          include: {
            organization: true,
          },
        },
      },
    });

    // 2. If user exists, verify password
    if (user && user.passwordHash) {
      const isValid = comparePassword(password, user.passwordHash);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }
    } else {
      // 3. If user does not exist (or database was reset), auto-provision user on the fly
      const name = cleanEmail.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ') || 'Creator User';
      const passwordHash = hashPassword(password);
      const orgName = `${name}'s Workspace`;
      const orgSlug = `${name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${Date.now()}`;

      try {
        user = await prisma.user.create({
          data: {
            email: cleanEmail,
            name,
            passwordHash,
            role: 'USER',
            memberships: {
              create: {
                organization: {
                  create: {
                    name: orgName,
                    slug: orgSlug,
                    businessCategory: 'Creator',
                    plan: 'FREE',
                    subscriptions: {
                      create: {
                        plan: 'FREE',
                        status: 'active',
                      },
                    },
                  },
                },
                role: 'OWNER',
              },
            },
          },
          include: {
            memberships: {
              include: {
                organization: true,
              },
            },
          },
        });
      } catch (createErr) {
        console.error('[Auto-provision User Error]:', createErr);
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }
    }

    const membership = user.memberships[0];
    const org = membership?.organization || { id: 'default', slug: 'default', plan: 'FREE', name: 'Default Workspace' };

    const payload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      organizationId: org.id,
      organizationSlug: org.slug,
      plan: org.plan,
      role: membership?.role || 'MEMBER',
      userRole: user.role,
    };

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      organization: {
        id: org.id,
        name: org.name,
        slug: org.slug,
        plan: org.plan,
      },
    });

    // Set HTTP-only session cookie directly on response object for 100% reliability
    await setSessionCookie(payload, response);

    return response;
  } catch (err: any) {
    console.error('[Auth Login Error]:', err);
    return NextResponse.json(
      { error: err.message || 'Authentication failed' },
      { status: 500 }
    );
  }
}
