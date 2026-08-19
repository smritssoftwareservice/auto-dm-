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
    const automation = await prisma.automation.findFirst({
      where: {
        id,
        organizationId: session.organizationId,
      },
    });

    if (!automation) {
      return NextResponse.json({ error: 'Automation not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ automation });
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
    const existing = await prisma.automation.findFirst({
      where: { id, organizationId: session.organizationId },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Automation not found or unauthorized' }, { status: 404 });
    }

    const updated = await prisma.automation.update({
      where: { id },
      data: {
        name: body.name ?? existing.name,
        description: body.description ?? existing.description,
        status: body.status ?? existing.status,
        triggerKeyword: body.triggerKeyword ?? existing.triggerKeyword,
        nodesJson: body.nodes ? JSON.stringify(body.nodes) : existing.nodesJson,
      },
    });

    return NextResponse.json({ success: true, automation: updated });
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
    const existing = await prisma.automation.findFirst({
      where: { id, organizationId: session.organizationId },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Automation not found or unauthorized' }, { status: 404 });
    }

    await prisma.automation.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Automation deleted' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
