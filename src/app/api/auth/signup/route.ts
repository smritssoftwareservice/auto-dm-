import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, setSessionCookie } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, organizationName, businessCategory } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email address already exists.' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = hashPassword(password);

    // Create User, Organization, Membership, AI Config, and Link Page in database transaction
    const orgName = organizationName || `${name.split(' ')[0]}'s Workspace`;
    const orgSlug = `${orgName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${Date.now()}`;

    const newUser = await prisma.user.create({
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
                businessCategory: businessCategory || 'Creator',
                plan: 'FREE',
                aiConfigurations: {
                  create: {
                    agentName: `${name.split(' ')[0]}'s AI Assistant`,
                    businessDescription: `${orgName} automated customer support and growth engine.`,
                    tone: 'Friendly',
                    instructions: 'Help customers with pricing, products, and bookings accurately.',
                    fallbackMessage: "I don't have that exact detail handy, but our team will connect with you shortly!",
                    handoffMessage: "Connecting you with our support team right now!",
                    status: 'ACTIVE',
                  },
                },
                subscriptions: {
                  create: {
                    plan: 'FREE',
                    status: 'active',
                  },
                },
                linkPages: {
                  create: {
                    username: orgSlug,
                    title: orgName,
                    bio: 'Welcome! Connect with us or explore our courses below.',
                    avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
                    theme: 'glass',
                    published: true,
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

    const membership = newUser.memberships[0];
    const org = membership.organization;

    // Set HTTP-only session cookie
    await setSessionCookie({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      organizationId: org.id,
      organizationSlug: org.slug,
      plan: org.plan,
      role: membership.role,
      userRole: newUser.role,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      organization: {
        id: org.id,
        name: org.name,
        slug: org.slug,
        plan: org.plan,
      },
    });
  } catch (err: any) {
    console.error('[Auth Signup Error]:', err);
    return NextResponse.json(
      { error: err.message || 'Registration failed' },
      { status: 500 }
    );
  }
}
