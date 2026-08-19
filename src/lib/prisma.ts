import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

// Resolve absolute path for SQLite file database to prevent Error code 14 in Next.js/Vercel serverless
function resolveDatabaseUrl(): string {
  const envUrl = process.env.DATABASE_URL || 'file:./dev.db';

  if (envUrl.startsWith('file:')) {
    let relativePath = envUrl.replace('file:', '').trim();
    
    // Remove query params if any
    const queryIdx = relativePath.indexOf('?');
    let queryParams = '';
    if (queryIdx !== -1) {
      queryParams = relativePath.substring(queryIdx);
      relativePath = relativePath.substring(0, queryIdx);
    }

    let absoluteDbPath: string;
    if (path.isAbsolute(relativePath)) {
      absoluteDbPath = relativePath;
    } else {
      absoluteDbPath = path.resolve(process.cwd(), 'prisma', path.basename(relativePath));
    }

    // On Vercel / Read-only serverless environment
    if (process.env.VERCEL) {
      const tmpPath = path.join('/tmp', path.basename(relativePath));
      try {
        if (!fs.existsSync(tmpPath) && fs.existsSync(/*turbopackIgnore: true*/ absoluteDbPath)) {
          fs.copyFileSync(absoluteDbPath, tmpPath);
        }
      } catch (err) {
        console.error('[Prisma Vercel DB Copy Error]:', err);
      }
      absoluteDbPath = tmpPath;
    }

    return `file:${absoluteDbPath}${queryParams}`;
  }

  return envUrl;
}

const dbUrl = resolveDatabaseUrl();
process.env.DATABASE_URL = dbUrl;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
