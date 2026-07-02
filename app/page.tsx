import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { 
  ArrowRight, Sparkles, Terminal, Cpu, Cloud, Smartphone, 
  ShieldCheck, Zap, Code2, Users, Award, CheckCircle2, Calendar, BookOpen 
} from 'lucide-react';

export const revalidate = 0; // Ensure fresh blog posts are fetched dynamically

export default async function HomePage() {
  const latestPosts = await prisma.post.findMany({
    take: 3,
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-grid-pattern">
        {/* Background glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-blue-500/30 text-xs font-semibold tracking-wide uppercase text-blue-300 animate-in fade-in slide-in-from-top-4 duration-500 shadow-lg shadow-blue-500/10">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>ABC Technologies Studio</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15]">
              Architecting Digital Experiences That <span className="text-gradient">Define Industries</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              We empower turnkey manufacturing leaders and enterprise innovators with custom software engineering, industrial IIoT automation, and resilient cloud-native infrastructure.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 flex items-center justify-center gap-2 text-base group"
              >
                <span>Consult Our Architecture Team</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2 text-base shadow-inner"
              >
                <Terminal className="w-5 h-5 text-purple-400" />
                <span>Explore Core Services</span>
              </Link>
            </div>

            {/* Tech Stack Pills */}
            <div className="pt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
              <span className="font-semibold text-slate-500">ENGINEERED WITH:</span>
              <span className="px-3 py-1 rounded-md bg-slate-900/60 border border-slate-800 text-slate-300">Next.js 15+</span>
              <span className="px-3 py-1 rounded-md bg-slate-900/60 border border-slate-800 text-slate-300">TypeScript</span>
              <span className="px-3 py-1 rounded-md bg-slate-900/60 border border-slate-800 text-slate-300">Enterprise Cloud DB</span>
              <span className="px-3 py-1 rounded-md bg-slate-900/60 border border-slate-800 text-slate-300">Shadcn UI</span>
              <span className="px-3 py-1 rounded-md bg-slate-900/60 border border-slate-800 text-slate-300">AI / LLM Pipelines</span>
              <span className="px-3 py-1 rounded-md bg-slate-900/60 border border-slate-800 text-slate-300">Tailwind CSS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-900/60 border-y border-slate-800/80 py-12 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <p className="text-3xl lg:text-4xl font-extrabold text-white">99.99%</p>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Uptime Guarantee</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl lg:text-4xl font-extrabold text-gradient-blue">120+</p>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Custom Projects Shipped</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl lg:text-4xl font-extrabold text-purple-400">10M+</p>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">End-User Interactions</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl lg:text-4xl font-extrabold text-emerald-400">100%</p>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Client Retention Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400">What We Build</h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Comprehensive Engineering Capabilities
          </h3>
          <p className="text-slate-400 text-base">
            From zero-to-one product development to enterprise cloud transformation, our cross-functional engineering pods deliver production-ready code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Code2 className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-white">Custom Web Architecture</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                High-performance web applications built with Next.js, React 19, and serverless edge databases for zero latency.
              </p>
            </div>
            <Link href="/services" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-400 hover:text-blue-300">
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2 */}
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-4 border-purple-500/30">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Cpu className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-white">AI & Agentic Workflows</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Autonomous AI subagents, custom vector RAG pipelines, and fine-tuned LLM integration engineered into your core workflows.
              </p>
            </div>
            <Link href="/services" className="inline-flex items-center gap-1 text-sm font-semibold text-purple-400 hover:text-purple-300">
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 3 */}
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Cloud className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-white">Cloud Native DevOps</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Multi-region Kubernetes clusters, automated CI/CD deployment pipelines, and bulletproof infrastructure monitoring.
              </p>
            </div>
            <Link href="/services" className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-400 hover:text-emerald-300">
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 4 */}
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Smartphone className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-white">Mobile & UI/UX Studio</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Cross-platform iOS & Android apps that feel responsive, fluid, and beautifully intuitive for end users.
              </p>
            </div>
            <Link href="/services" className="inline-flex items-center gap-1 text-sm font-semibold text-amber-400 hover:text-amber-300">
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why ABC Technologies */}
      <section className="py-20 bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-bold text-blue-400 tracking-wide uppercase shadow-inner shadow-blue-500/20">
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-blue-400" />
              <span>ABC Technologies Studio</span>
            </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Why Industry Leaders Choose ABC Technologies
              </h3>
              <p className="text-slate-300 text-base leading-relaxed">
                We replace bureaucratic IT consultancies with agile, senior engineering talent. When you partner with us, you get direct access to seasoned architects who prioritize velocity and code quality above all else.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <h5 className="font-bold text-white text-base">Zero Technical Debt Guarantee</h5>
                    <p className="text-sm text-slate-400">Strict TypeScript typing, modular components, and comprehensive automated test coverage.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <h5 className="font-bold text-white text-base">Rapid 2-Week Engineering Sprints</h5>
                    <p className="text-sm text-slate-400">Iterative deliverables every 14 days so you can test features with real customers faster.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <h5 className="font-bold text-white text-base">Built-In CMS & SEO Architecture</h5>
                    <p className="text-sm text-slate-400">Integrated enterprise cloud database allowing your team to publish updates and telemetry effortlessly.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl relative border border-white/10 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Engineering Score</span>
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold">100% Verified</span>
              </div>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-300 font-medium">Performance & Load Time</span>
                    <span className="text-blue-400 font-bold">99 / 100</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full w-[99%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-300 font-medium">On-Page SEO Optimization</span>
                    <span className="text-emerald-400 font-bold">100 / 100</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full w-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-300 font-medium">Security & Data Encryption</span>
                    <span className="text-purple-400 font-bold">100 / 100</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog & News Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400">Company Intelligence</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              Latest Blog & News Updates
            </h3>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-slate-900 border border-slate-700 hover:border-purple-500/50 transition-all self-start md:self-auto"
          >
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span>View All Articles</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:border-blue-500/50 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-semibold">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-medium text-slate-300">
                <span>By {post.author}</span>
                <span className="text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r from-blue-950 via-indigo-950 to-purple-950 border-t border-blue-500/30">
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-6">
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to Build Your Next Software Breakthrough?
          </h3>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Schedule a 30-minute architecture discovery call with ABC Technologies. We will review your product roadmap and provide actionable engineering insights.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-2xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-500/40 transition-all flex items-center gap-2"
            >
              <span>Get in Touch Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
