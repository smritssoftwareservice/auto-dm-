import { NextRequest, NextResponse } from 'next/server';
import { requireAuthContext } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { checkEntitlement } from '@/lib/subscriptions/entitlements';

export async function GET(req: NextRequest) {
  const { session, errorResponse } = await requireAuthContext(req);
  if (errorResponse) return errorResponse;

  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search')?.toLowerCase();
  const status = searchParams.get('status');

  try {
    const whereClause: any = {
      organizationId: session.organizationId,
    };

    if (status && status !== 'ALL') {
      whereClause.status = status;
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { instagramUsername: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const leads = await prisma.lead.findMany({
      where: whereClause,
      orderBy: { lastInteractionAt: 'desc' },
    });

    return NextResponse.json({ leads });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { session, errorResponse } = await requireAuthContext(req);
  if (errorResponse) return errorResponse;

  try {
    const entitlement = await checkEntitlement(session.organizationId, 'LEADS');
    if (!entitlement.allowed) {
      return NextResponse.json({ error: entitlement.error }, { status: 403 });
    }

    const body = await req.json();
    const { name, instagramUsername, email, phone, company, status, leadScore, tags, notes } = body;

    if (!name || !instagramUsername) {
      return NextResponse.json({ error: 'Name and Instagram username are required' }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        organizationId: session.organizationId,
        name,
        instagramUsername: instagramUsername.replace('@', ''),
        email: email || undefined,
        phone: phone || undefined,
        company: company || undefined,
        status: status || 'NEW',
        leadScore: leadScore || 20,
        tagsJson: JSON.stringify(tags || []),
        notes: notes || undefined,
      },
    });

    return NextResponse.json({ success: true, lead });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create lead' }, { status: 500 });
  }
}
