'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, Globe, ShieldCheck, Sparkles, Award, Cpu, Database, 
  Layers, ArrowRight, CheckCircle2, Star, Users, Briefcase, Zap,
  ExternalLink, TrendingUp, Handshake
} from 'lucide-react';

export default function ClientsPartnersPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'tech' | 'industrial' | 'fintech'>('all');

  const partners = [
    {
      name: 'Google Cloud & Gemini AI',
      category: 'tech',
      type: 'Premier AI Infrastructure Partner',
      description: 'Leveraging Google Vertex AI and Gemini LLM pipelines for enterprise agentic automation and smart invoice parsing.',
      badge: 'Tier 1 Alliance',
      color: 'from-blue-600/20 to-cyan-600/20 border-blue-500/30 text-blue-400',
    },
    {
      name: 'Nvidia NIM & Triton',
      category: 'tech',
      type: 'AI Compute & Microservices Partner',
      description: 'Accelerating high-throughput inference and robotics vision models using Nvidia NIM microservices architecture.',
      badge: 'Compute Partner',
      color: 'from-emerald-600/20 to-green-600/20 border-emerald-500/30 text-emerald-400',
    },
    {
      name: 'ABC Technologies (Turnkey Division)',
      category: 'industrial',
      type: 'Turnkey IIoT & Automation Client Systems',
      description: 'Built state-of-the-art turnkey industrial automation platforms, precision sensor telemetry, and real-time cloud analytics.',
      badge: 'Flagship Upgrade Case Study',
      color: 'from-rose-600/20 to-amber-600/20 border-rose-500/30 text-rose-400',
    },
    {
      name: 'Amazon Web Services (AWS)',
      category: 'tech',
      type: 'Advanced Cloud Consulting Partner',
      description: 'Architecting multi-region DevOps pipelines, Serverless Lambda microservices, and military-grade RDS data warehouses.',
      badge: 'Cloud Alliance',
      color: 'from-amber-600/20 to-orange-600/20 border-amber-500/30 text-amber-400',
    },
    {
      name: 'OpenRouter & AI Orchestration Hub',
      category: 'tech',
      type: 'Multi-LLM Routing Partner',
      description: 'Seamless intelligent routing and fallback strategies across top frontier AI models with zero downtime.',
      badge: 'Network Partner',
      color: 'from-purple-600/20 to-indigo-600/20 border-purple-500/30 text-purple-400',
    },
    {
      name: 'Vercel & Next.js Enterprise',
      category: 'tech',
      type: 'Web Architecture Alliance',
      description: 'Delivering sub-millisecond edge global rendering, Turbopack builds, and highly responsive frontend interfaces.',
      badge: 'Edge Partner',
      color: 'from-slate-700/40 to-slate-800/40 border-slate-500/30 text-slate-200',
    },
    {
      name: 'Global FinLedger Corp',
      category: 'fintech',
      type: 'Enterprise FinTech Client',
      description: 'Built high-concurrency ledger processing systems capable of handling 50,000+ encrypted financial transactions per second.',
      badge: 'FinTech Success Story',
      color: 'from-indigo-600/20 to-blue-600/20 border-indigo-500/30 text-indigo-400',
    },
    {
      name: 'Apex Robotics Automation',
      category: 'industrial',
      type: 'Smart Assembly Partner',
      description: 'Co-developed AI-driven assembly line inspection pods with sub-millisecond defect identification accuracy.',
      badge: 'Robotics Partner',
      color: 'from-cyan-600/20 to-blue-600/20 border-cyan-500/30 text-cyan-400',
    },
  ];

  const filteredPartners = activeTab === 'all' 
    ? partners 
    : partners.filter(p => p.category === activeTab);

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/30 text-xs font-bold text-blue-400 uppercase tracking-wider">
          <Handshake className="w-4 h-4 text-purple-400" />
          <span>Ecosystem & Client Network</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Enterprise Clients & <span className="text-gradient">Strategic Partners</span>
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          At ABC Technologies, we collaborate with frontier AI infrastructure providers and deliver mission-critical software upgrades for industry leaders globally.
        </p>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-white/10 text-center space-y-1">
          <div className="text-3xl sm:text-4xl font-extrabold text-gradient">40+</div>
          <div className="text-xs sm:text-sm font-semibold text-slate-300">Enterprise Clients Shipped</div>
          <p className="text-[11px] text-slate-400">Across US, UK, India & APAC</p>
        </div>
        <div className="glass-card p-6 rounded-3xl border border-white/10 text-center space-y-1">
          <div className="text-3xl sm:text-4xl font-extrabold text-blue-400">99.99%</div>
          <div className="text-xs sm:text-sm font-semibold text-slate-300">SLA Uptime Maintained</div>
          <p className="text-[11px] text-slate-400">Supported by multi-region fallback</p>
        </div>
        <div className="glass-card p-6 rounded-3xl border border-white/10 text-center space-y-1">
          <div className="text-3xl sm:text-4xl font-extrabold text-purple-400">Tier 1</div>
          <div className="text-xs sm:text-sm font-semibold text-slate-300">Technology Alliances</div>
          <p className="text-[11px] text-slate-400">Direct AI & Cloud integrations</p>
        </div>
        <div className="glass-card p-6 rounded-3xl border border-white/10 text-center space-y-1">
          <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">$120M+</div>
          <div className="text-xs sm:text-sm font-semibold text-slate-300">Client Revenue Enabled</div>
          <p className="text-[11px] text-slate-400">Through custom digital engineering</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Featured Ecosystem & Client Showcase</h2>
            <p className="text-sm text-slate-400">Explore our strategic alliances and turnkey modernization case studies.</p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Network (8)
            </button>
            <button
              onClick={() => setActiveTab('tech')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'tech' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              AI & Cloud Alliances
            </button>
            <button
              onClick={() => setActiveTab('industrial')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'industrial' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              Industrial & IoT Clients
            </button>
            <button
              onClick={() => setActiveTab('fintech')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'fintech' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              FinTech Systems
            </button>
          </div>
        </div>

        {/* Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPartners.map((partner, idx) => (
            <div
              key={idx}
              className={`glass-card rounded-3xl p-6 border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 bg-gradient-to-br ${partner.color}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 border border-white/10 text-white tracking-wide uppercase">
                    {partner.badge}
                  </span>
                  <Sparkles className="w-4 h-4 opacity-70" />
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-white tracking-tight">{partner.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wider opacity-90 mt-0.5">{partner.type}</p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {partner.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Verified Partner</span>
                </div>
                <Link href="/contact" className="text-xs font-bold hover:underline flex items-center gap-1">
                  <span>Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Case Study Highlight */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-blue-500/30 bg-gradient-to-r from-slate-900 via-blue-950/40 to-indigo-950/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Spotlight Client Transformation</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Turnkey Enterprise Upgrade: ABC Technologies Ecosystem
            </h2>
            
            <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
              By replacing fragmented legacy tooling and outdated data platforms with modern ABC Technologies architecture, enterprise client plants achieve sub-millisecond IoT sensor telemetry and real-time cloud orchestration.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-white">10x Query Speedup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-white">Zero Downtime Migration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-white">AES-256 Cloud Encryption</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center items-center lg:items-end">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-extrabold text-base shadow-2xl shadow-blue-500/30 hover:opacity-95 transition-all flex items-center justify-center gap-3 text-center"
            >
              <span>Schedule Architecture Audit</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
