import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Code2, Cpu, Cloud, Smartphone, Check, ArrowRight, Zap, Shield, Sparkles, Layers, Database 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services | ABC Technologies Studio',
  description: 'Explore ABC Technologies services: Custom enterprise web platforms, AI & LLM integration, cloud DevOps, and dedicated software engineering squads.',
};

export default function ServicesPage() {
  const services = [
    {
      icon: <Code2 className="w-8 h-8 text-blue-400" />,
      title: 'Custom Web & Enterprise Architecture',
      description: 'Full-stack engineering tailored to your proprietary business logic. We build zero-latency web applications using modern React 19, Next.js App Router, and serverless architectures.',
      deliverables: [
        'High-concurrency React & Next.js platforms',
        'Custom GraphQL & REST API gateways',
        'Multi-tenant enterprise SaaS infrastructure',
        'End-to-end automated testing pipelines',
      ],
      badge: 'Most Popular',
      borderColor: 'border-blue-500/40',
    },
    {
      icon: <Cpu className="w-8 h-8 text-purple-400" />,
      title: 'AI & Large Language Model Workflows',
      description: 'Turn your proprietary data into a competitive moat. We engineer vector databases, Retrieval-Augmented Generation (RAG) pipelines, and autonomous AI subagents.',
      deliverables: [
        'Custom RAG knowledge bases with OpenAI/Claude',
        'Fine-tuned domain-specific LLM models',
        'Automated AI workflow orchestration',
        'Secure enterprise VPC deployment',
      ],
      badge: 'Cutting Edge',
      borderColor: 'border-purple-500/40',
    },
    {
      icon: <Cloud className="w-8 h-8 text-emerald-400" />,
      title: 'Cloud Native Engineering & DevOps',
      description: 'Scale effortlessly to millions of requests without cloud bill sticker shock. We build containerized microservices and resilient CI/CD pipelines.',
      deliverables: [
        'Multi-region Kubernetes & Docker clusters',
        'Infrastructure as Code (Terraform / Pulumi)',
        'Continuous integration & deployment automation',
        'Comprehensive telemetry & APM observabilities',
      ],
      badge: 'High Reliability',
      borderColor: 'border-emerald-500/40',
    },
    {
      icon: <Smartphone className="w-8 h-8 text-amber-400" />,
      title: 'Mobile & UI/UX Digital Product Studio',
      description: 'Design and engineer cross-platform mobile experiences that feel like native iOS and Android apps, backed by award-winning UI/UX design systems.',
      deliverables: [
        'React Native & Flutter mobile applications',
        'Interactive design systems & Figma token libraries',
        'Fluid micro-animations & gesture interfaces',
        'App Store & Google Play optimization',
      ],
      badge: 'User Obsessed',
      borderColor: 'border-amber-500/40',
    },
    {
      icon: <Database className="w-8 h-8 text-rose-400" />,
      title: 'Turnkey Industrial & IIoT Solutions',
      description: 'End-to-end industrial software and sensor integration engineered for precision manufacturing, metal stamping plants, and assembly line automation.',
      deliverables: [
        'Real-time plant telemetry & IIoT sensor dashboards',
        'Turnkey automation project execution & commissioning',
        'Custom CAD/CAM tooling software pipelines',
        'Predictive machine maintenance AI models',
      ],
      badge: 'Industrial Grade',
      borderColor: 'border-rose-500/40',
    },
  ];

  const engagementModels = [
    {
      name: 'Dedicated Team Pod',
      subtitle: 'Ideal for fast-scaling Series A+ startups',
      price: '$12,500',
      period: 'per sprint (2 weeks)',
      features: [
        '2 Senior Full-Stack Engineers',
        '1 Dedicated DevOps / AI Architect',
        'Bi-weekly sprint demos & deliverables',
        'Direct Slack/Teams communication channel',
        'Zero technical debt guarantee',
      ],
      cta: 'Assemble Your Pod',
      popular: true,
    },
    {
      name: 'Fixed-Scope Product Build',
      subtitle: 'Ideal for zero-to-one MVP launch',
      price: '$25,000+',
      period: 'project milestone',
      features: [
        'Complete architectural scoping & specification',
        'High-fidelity Figma UI/UX prototypes',
        'Full deployment to production cloud',
        'Integrated CMS & Enterprise Cloud Database',
        '30 days post-launch warranty & support',
      ],
      cta: 'Get Fixed Quote',
      popular: false,
    },
    {
      name: 'Executive AI Advisory',
      subtitle: 'For enterprises modernizing legacy code',
      price: '$4,500',
      period: 'per month',
      features: [
        'Weekly architecture review sessions',
        'AI strategy & LLM pipeline blueprints',
        'Cloud cost optimization audit',
        'Security & compliance vulnerability assessment',
        'On-demand emergency debugging',
      ],
      cta: 'Book Discovery Call',
      popular: false,
    },
  ];

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-blue-400 uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          <span>Engineering Solutions</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          End-to-End <span className="text-gradient">Software Capabilities</span>
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          From complex distributed databases to sleek front-end interfaces, ABC Technologies provides the technical horsepower to bring your most ambitious digital ideas to life.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((svc, idx) => (
          <div
            key={idx}
            className={`glass-card p-8 rounded-3xl space-y-6 flex flex-col justify-between border ${svc.borderColor} hover:scale-[1.01] transition-all`}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="h-14 w-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                  {svc.icon}
                </div>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300">
                  {svc.badge}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">{svc.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{svc.description}</p>

              <div className="space-y-2 pt-4 border-t border-slate-800/80">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Key Deliverables:</p>
                <ul className="space-y-2">
                  {svc.deliverables.map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-semibold text-sm text-blue-400 hover:text-blue-300 group"
              >
                <span>Request Scope for this Service</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Engagement & Pricing Models */}
      <div className="space-y-12 pt-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Engagement Models</h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Flexible Engagement Tiers</h3>
          <p className="text-slate-400 text-base">
            Choose how you want to partner with ABC Technologies. No lock-in contracts, transparent sprint billing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {engagementModels.map((model, idx) => (
            <div
              key={idx}
              className={`glass-card p-8 rounded-3xl flex flex-col justify-between relative ${
                model.popular ? 'border-2 border-blue-500 shadow-2xl shadow-blue-500/20' : 'border border-white/10'
              }`}
            >
              {model.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                  Most Selected
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h4 className="text-2xl font-bold text-white">{model.name}</h4>
                  <p className="text-xs text-slate-400 mt-1">{model.subtitle}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">{model.price}</span>
                  <span className="text-xs text-slate-400">/ {model.period}</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">What is Included:</p>
                  <ul className="space-y-2.5">
                    {model.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href="/contact"
                  className={`w-full py-3.5 rounded-xl font-bold text-center block transition-all ${
                    model.popular
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 hover:opacity-95'
                      : 'bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {model.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
