import { NextRequest, NextResponse } from 'next/server';
import { requireAuthContext } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { session, errorResponse } = await requireAuthContext(req);
  if (errorResponse) return errorResponse;

  const orgId = session.organizationId;

  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [totalLeads, newLeads7d, totalConversations, aiResponsesCount, productsAggregate, linkPage] = await Promise.all([
      prisma.lead.count({ where: { organizationId: orgId } }),
      prisma.lead.count({ where: { organizationId: orgId, createdAt: { gte: sevenDaysAgo } } }),
      prisma.conversation.count({ where: { organizationId: orgId } }),
      prisma.message.count({
        where: {
          conversation: { organizationId: orgId },
          sender: 'AI_AGENT',
        },
      }),
      prisma.digitalProduct.aggregate({
        where: { organizationId: orgId },
        _sum: { revenue: true },
      }),
      prisma.linkPage.findUnique({
        where: { organizationId: orgId },
      }),
    ]);

    const revenue = productsAggregate._sum.revenue || 0;
    const linkViews = linkPage?.viewsCount || 0;
    const conversionRate = totalConversations > 0 ? Math.round((totalLeads / totalConversations) * 100) : 0;

    // Generate real daily chart data for last 7 days
    const chartData = [];
    for (let i = 6; i >= 0; i--) {
      const dateObj = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
      const dayEnd = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + 1);

      const dayLabel = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

      const [dayLeads, dayConversations] = await Promise.all([
        prisma.lead.count({
          where: { organizationId: orgId, createdAt: { gte: dayStart, lt: dayEnd } },
        }),
        prisma.conversation.count({
          where: { organizationId: orgId, createdAt: { gte: dayStart, lt: dayEnd } },
        }),
      ]);

      chartData.push({
        date: dayLabel,
        leads: dayLeads,
        conversations: dayConversations,
        revenue: 0,
      });
    }

    return NextResponse.json({
      totalLeads,
      newLeads7d,
      totalConversations,
      aiResponsesCount,
      conversionRate,
      revenue,
      linkViews,
      formSubmissions: 0,
      chartData,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to compute analytics' }, { status: 500 });
  }
}
