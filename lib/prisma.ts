import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import fs from 'fs';
import path from 'path';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function isPostgresUrl(rawUrl: string): boolean {
  if (!rawUrl) return false;
  const lower = rawUrl.toLowerCase().trim();
  return (
    lower.startsWith('postgres://') ||
    lower.startsWith('postgresql://') ||
    lower.startsWith('jdbc:postgresql://') ||
    lower.startsWith('prisma://') ||
    lower.startsWith('neon://') ||
    lower.includes('aivencloud') ||
    lower.includes('neondb') ||
    lower.includes('supabase') ||
    lower.includes('sslmode=') ||
    (lower.includes('@') && !lower.startsWith('file:'))
  );
}

function normalizePostgresUrl(rawUrl: string): string {
  let url = rawUrl.trim();
  if (url.startsWith('jdbc:')) {
    url = url.slice(5);
  }
  if (!url.startsWith('postgres://') && !url.startsWith('postgresql://') && !url.startsWith('prisma://') && !url.startsWith('neon://')) {
    url = 'postgres://' + url;
  }
  return url;
}

function createPrismaClient() {
  const rawDbUrl = (process.env.DATABASE_URL || 'file:./dev.db').trim();

  if (isPostgresUrl(rawDbUrl)) {
    const normalizedUrl = normalizePostgresUrl(rawDbUrl);
    const isSsl = normalizedUrl.includes('sslmode=') || normalizedUrl.includes('ssl=true') || normalizedUrl.includes('aivencloud') || !normalizedUrl.includes('localhost');
    let connectionString = normalizedUrl;

    if (isSsl) {
      try {
        const url = new URL(normalizedUrl);
        url.searchParams.delete('ssl');
        url.searchParams.set('sslmode', 'no-verify');
        connectionString = url.toString();
      } catch {
        if (connectionString.includes('sslmode=')) {
          connectionString = connectionString.replace(/sslmode=[^&]+/, 'sslmode=no-verify');
        } else {
          connectionString += (connectionString.includes('?') ? '&' : '?') + 'sslmode=no-verify';
        }
      }
    }

    const pool = new Pool({
      connectionString,
      ssl: isSsl ? { rejectUnauthorized: false } : undefined,
      max: 1,
      connectionTimeoutMillis: 15000,
    });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter, log: ['error'] });
  }

  const filePath = rawDbUrl.replace(/^file:/, '').trim() || './dev.db';
  try {
    const dirPath = path.dirname(path.resolve(filePath));
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  } catch {
    // Ignore directory creation errors
  }

  const adapter = new PrismaBetterSqlite3({
    url: rawDbUrl,
  });
  return new PrismaClient({ adapter, log: ['error'] });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

let hasSeeded = false;

export async function ensureSeedData() {
  if (hasSeeded || process.env.NEXT_PHASE === 'phase-production-build') return;
  try {
    await prisma.user.upsert({
      where: { email: 'admin@asksoftware.tech' },
      update: {},
      create: {
        email: 'admin@asksoftware.tech',
        password: 'admin123', // Demo login credentials
        name: 'ABC Admin Team',
      },
    });

    await prisma.user.upsert({
      where: { email: 'admin@abctechnologies.com' },
      update: {},
      create: {
        email: 'admin@abctechnologies.com',
        password: 'admin123',
        name: 'ABC Admin Team',
      },
    });

    const postCount = await prisma.post.count();
    if (postCount === 0) {
      await prisma.post.createMany({
        skipDuplicates: true,
        data: [
          {
            title: 'How AI & Machine Learning Are Transforming Enterprise Custom Software in 2026',
            slug: 'ai-ml-transforming-enterprise-software-2026',
            excerpt: 'Discover why integrating Large Language Models and custom neural networks into core business architectures yields 40% higher productivity.',
            content: `Modern software architecture has fundamentally evolved. At ABC Technologies, we've witnessed first-hand how integrating intelligent agents and AI pipelines into custom enterprise software transforms organizational speed and scalability.

### The Shift from Static Systems to Adaptive Intelligence
Traditional enterprise workflows often rely on static rules and manual oversight. By embedding predictive machine learning pipelines directly into business logic, companies automate complex decision-making.

### Key Benefits We Deliver:
1. **Real-time Data Processing**: Analyze millions of events with sub-millisecond latency.
2. **Automated Workflow Orchestration**: Reduce operational friction with autonomous AI subagents.
3. **Enterprise-Grade Security**: Keep sensitive corporate data strictly protected within isolated VPCs.

Whether you are scaling a fast-growing startup or modernizing legacy infrastructure, ABC Technologies provides the architectural excellence needed to thrive.`,
            category: 'AI & Tech',
            author: 'Aswin Kumar - Chief Architect',
          },
          {
            title: 'Why Microservices & Cloud Native DevOps Are Critical for High-Growth Startups',
            slug: 'microservices-cloud-native-devops-startups',
            excerpt: 'Learn the architectural blueprints that enable startups to scale from 1,000 to 10M active users without system downtime.',
            content: `When building a startup, speed to market is critical—but scalability is what keeps you alive when viral growth hits. At ABC Technologies, we design cloud-native infrastructures that scale effortlessly.

### Why Serverless and Containerization Win
By leveraging Docker, Kubernetes, and edge-deployed serverless functions, your infrastructure automatically adapts to traffic spikes while keeping cloud bills optimized.

### 3 Rules for Cloud Architecture:
- **Decouple Core Services**: Ensure user authentication, database writes, and background workers run independently.
- **Automate CI/CD Pipelines**: Deploy code dozens of times per day with zero downtime.
- **Comprehensive Observability**: Implement real-time telemetry and tracing from day one.

Reach out to our cloud engineering team today to audit your current architecture!`,
            category: 'Cloud Engineering',
            author: 'ABC DevOps Team',
          },
          {
            title: 'Introducing ABC Technologies: Building Next-Gen Digital Products',
            slug: 'introducing-abc-technologies',
            excerpt: 'We are thrilled to officially launch our custom software engineering and digital transformation studio focused on delivering high-impact software.',
            content: `Welcome to ABC Technologies! We founded this company with a singular mission: to eliminate the gap between complex software engineering concepts and breathtaking, reliable digital products.

### Who We Are
We are a specialized team of senior full-stack engineers, AI researchers, and UI/UX designers obsessed with clean code and remarkable user experiences.

### What We Offer
- **Custom Enterprise Applications**: Tailored web and mobile platforms built with React, Next.js, TypeScript, and native mobile stacks.
- **AI & LLM Integration**: Custom RAG pipelines, fine-tuned models, and agentic workflows.
- **UI/UX Design Systems**: World-class interfaces designed for maximum user engagement.

Explore our services and get in touch with our founders to discuss your next big idea!`,
            category: 'Startup News',
            author: 'Leadership Team',
          },
        ],
      });
    }

    await prisma.systemConfig.upsert({
      where: { id: 'global' },
      update: {},
      create: {
        id: 'global',
        aiPrimaryProvider: 'Google Gemini',
        aiFallbackOrder: 'Google Gemini,Nvidia NIM,OpenRouter,OpenAI',
      },
    });

    hasSeeded = true;
  } catch (err) {
    console.error('Failed to seed DB:', err);
  }
}
