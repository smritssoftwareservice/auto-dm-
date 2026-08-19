import { NextRequest, NextResponse } from 'next/server';
import { requireAuthContext } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { checkEntitlement } from '@/lib/subscriptions/entitlements';

export async function GET(req: NextRequest) {
  const { session, errorResponse } = await requireAuthContext(req);
  if (errorResponse) return errorResponse;

  try {
    const automations = await prisma.automation.findMany({
      where: { organizationId: session.organizationId },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({ automations });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch automations' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { session, errorResponse } = await requireAuthContext(req);
  if (errorResponse) return errorResponse;

  try {
    // Check entitlement
    const entitlement = await checkEntitlement(session.organizationId, 'AUTOMATIONS');
    if (!entitlement.allowed) {
      return NextResponse.json({ error: entitlement.error }, { status: 403 });
    }

    const body = await req.json();
    const { name, description, triggerType, triggerKeyword, postId, postCaption, nodes } = body;

    if (!name || !triggerType) {
      return NextResponse.json({ error: 'Automation name and trigger type are required' }, { status: 400 });
    }

    const automation = await prisma.automation.create({
      data: {
        organizationId: session.organizationId,
        name,
        description,
        status: 'ACTIVE',
        triggerType,
        triggerKeyword: triggerKeyword || undefined,
        postId: postId || undefined,
        postCaption: postCaption || undefined,
        nodesJson: JSON.stringify(nodes || []),
      },
    });

    return NextResponse.json({ success: true, automation });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create automation' }, { status: 500 });
  }
}
