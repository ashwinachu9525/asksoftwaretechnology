import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL || 'file:./dev.db',
  });
  return new PrismaClient({ adapter, log: ['error'] });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function ensureSeedData() {
  try {
    const userCount = await prisma.user.count();
    if (userCount === 0) {
      await prisma.user.create({
        data: {
          email: 'admin@abctechnologies.com',
          password: 'admin123', // Demo login credentials
          name: 'ABC Admin Team',
        },
      });
    }

    const postCount = await prisma.post.count();
    if (postCount === 0) {
      await prisma.post.createMany({
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

    const sysConfig = await prisma.systemConfig.findUnique({
      where: { id: 'global' },
    });
    if (!sysConfig) {
      await prisma.systemConfig.create({
        data: {
          id: 'global',
          aiPrimaryProvider: 'Google Gemini',
          aiFallbackOrder: 'Google Gemini,Nvidia NIM,OpenRouter,OpenAI',
        },
      });
    }
  } catch (err) {
    console.error('Failed to seed DB:', err);
  }
}
