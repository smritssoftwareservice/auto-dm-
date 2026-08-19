import { NextRequest, NextResponse } from 'next/server';
import { requireAuthContext } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { session, errorResponse } = await requireAuthContext(req);
  if (errorResponse) return errorResponse;

  const { id } = await params;

  try {
    const lead = await prisma.lead.findFirst({
      where: { id, organizationId: session.organizationId },
      include: { conversations: true },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ lead });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { session, errorResponse } = await requireAuthContext(req);
  if (errorResponse) return errorResponse;

  const { id } = await params;
  const body = await req.json();

  try {
    const existing = await prisma.lead.findFirst({
      where: { id, organizationId: session.organizationId },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Lead not found or unauthorized' }, { status: 404 });
    }

    const updated = await prisma.lead.update({
      where: { id },
      data: {
        name: body.name ?? existing.name,
        email: body.email ?? existing.email,
        phone: body.phone ?? existing.phone,
        status: body.status ?? existing.status,
        leadScore: body.leadScore ?? existing.leadScore,
        notes: body.notes ?? existing.notes,
        tagsJson: body.tags ? JSON.stringify(body.tags) : existing.tagsJson,
        lastInteractionAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, lead: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { session, errorResponse } = await requireAuthContext(req);
  if (errorResponse) return errorResponse;

  const { id } = await params;

  try {
    const existing = await prisma.lead.findFirst({
      where: { id, organizationId: session.organizationId },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Lead not found or unauthorized' }, { status: 404 });
    }

    await prisma.lead.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Lead deleted' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
