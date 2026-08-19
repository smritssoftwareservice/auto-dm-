import { prisma } from '@/lib/prisma';
import { APP_CONFIG } from '@/lib/config';

export type FeatureType = 'MESSAGES' | 'AUTOMATIONS' | 'LEADS' | 'INSTAGRAM_ACCOUNTS';

export async function getOrganizationPlanDetails(organizationId: string) {
  const org = await prisma.organization.findUnique({
    where: { id: organizationId },
    include: {
      subscriptions: true,
    },
  });

  const planKey = (org?.subscriptions?.[0]?.plan || org?.plan || 'FREE').toUpperCase() as keyof typeof APP_CONFIG.plans;
  const planLimits = APP_CONFIG.plans[planKey] || APP_CONFIG.plans.FREE;

  return {
    organization: org,
    planKey,
    planLimits,
  };
}

export async function checkEntitlement(
  organizationId: string,
  feature: FeatureType
): Promise<{ allowed: boolean; currentUsage: number; limit: number; error?: string }> {
  const { planKey, planLimits } = await getOrganizationPlanDetails(organizationId);

  // Calculate current period (start of month)
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  if (feature === 'MESSAGES') {
    const usageAggregate = await prisma.usageEvent.aggregate({
      where: {
        organizationId,
        eventType: 'INSTAGRAM_DM_SENT',
        timestamp: { gte: startOfMonth },
      },
      _sum: { count: true },
    });

    const currentUsage = usageAggregate._sum.count || 0;
    const limit = planLimits.executionsPerMonth;

    if (currentUsage >= limit) {
      return {
        allowed: false,
        currentUsage,
        limit,
        error: `Monthly message limit (${limit.toLocaleString()}) reached for your ${planKey} plan. Upgrade plan to send more DMs.`,
      };
    }

    return { allowed: true, currentUsage, limit };
  }

  if (feature === 'AUTOMATIONS') {
    const currentUsage = await prisma.automation.count({
      where: { organizationId },
    });
    const limit = planLimits.automations;

    if (currentUsage >= limit) {
      return {
        allowed: false,
        currentUsage,
        limit,
        error: `Automation limit (${limit}) reached for your ${planKey} plan. Upgrade to create more visual workflows.`,
      };
    }

    return { allowed: true, currentUsage, limit };
  }

  if (feature === 'LEADS') {
    const currentUsage = await prisma.lead.count({
      where: { organizationId },
    });
    const limit = planLimits.leadsLimit;

    if (currentUsage >= limit) {
      return {
        allowed: false,
        currentUsage,
        limit,
        error: `Lead limit (${limit}) reached for your ${planKey} plan. Upgrade to store unlimited CRM contacts.`,
      };
    }

    return { allowed: true, currentUsage, limit };
  }

  if (feature === 'INSTAGRAM_ACCOUNTS') {
    const currentUsage = await prisma.instagramAccount.count({
      where: { organizationId, status: 'CONNECTED' },
    });
    const limit = planLimits.instagramAccounts;

    if (currentUsage >= limit) {
      return {
        allowed: false,
        currentUsage,
        limit,
        error: `Connected account limit (${limit}) reached for your ${planKey} plan.`,
      };
    }

    return { allowed: true, currentUsage, limit };
  }

  return { allowed: true, currentUsage: 0, limit: 999999 };
}

export async function recordUsageEvent(organizationId: string, eventType: string, count: number = 1) {
  try {
    await prisma.usageEvent.create({
      data: {
        organizationId,
        eventType,
        count,
      },
    });
  } catch (err) {
    console.error('[Record Usage Event Error]:', err);
  }
}
