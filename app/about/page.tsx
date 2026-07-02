import React from 'react';
import type { Metadata } from 'next';
import { Target, Award, Users, Zap, Shield, Heart, Terminal, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About ABC Technologies | Our Story & Engineering Leadership',
  description: 'Learn about ABC Technologies, our engineering principles, core mission, and the leadership team driving enterprise digital innovation.',
};

export default function AboutPage() {
  const values = [
    {
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      title: 'Relentless Velocity',
      description: 'We believe speed is a feature. Our agile engineering pods ship production code iteratively every two weeks.',
    },
    {
      icon: <Terminal className="w-6 h-6 text-purple-400" />,
      title: 'Architectural Excellence',
      description: 'Clean code is non-negotiable. We write modular, fully-typed TypeScript and design scalable microservice systems.',
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
      title: 'Uncompromised Security',
      description: 'From zero-trust network infrastructure to encrypted database layers, we treat client data security as sacred.',
    },
    {
      icon: <Heart className="w-6 h-6 text-rose-400" />,
      title: 'Radical Transparency',
      description: 'No hidden agency markups or vague timelines. You communicate directly with the engineers architecting your product.',
    },
  ];

  const team = [
    {
      name: 'Aswin Kumar',
      role: 'Founder & Chief Architect',
      bio: 'Ex-Senior Staff Engineer with 12+ years building high-throughput distributed systems and enterprise cloud infrastructure.',
      avatar: 'AK',
      gradient: 'from-blue-600 to-indigo-600',
    },
    {
      name: 'Elena Rostova',
      role: 'VP of AI & ML Systems',
      bio: 'PhD in Computer Science. Leads our Large Language Model fine-tuning pipelines and autonomous agent integration architectures.',
      avatar: 'ER',
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      name: 'Marcus Vance',
      role: 'Director of Cloud Engineering',
      bio: 'Kubernetes contributor and multi-region AWS/GCP infrastructure specialist ensuring 99.99% system availability.',
      avatar: 'MV',
      gradient: 'from-emerald-600 to-teal-600',
    },
    {
      name: 'Sophia Chen',
      role: 'Head of Product & UI/UX',
      bio: 'Obsessed with fluid micro-animations and intuitive design systems that turn complex enterprise software into delightful tools.',
      avatar: 'SC',
      gradient: 'from-amber-600 to-orange-600',
    },
  ];

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-blue-400 uppercase tracking-wider">
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Pioneering the Future of <span className="text-gradient">Custom Software Engineering</span>
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Founded with a rebel spirit, ABC Technologies emerged from a simple realization: traditional IT agencies are too slow, bloated, and disconnected from modern engineering breakthroughs.
        </p>
      </div>

      {/* Origin Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="glass-card p-8 sm:p-10 rounded-3xl space-y-6 relative border border-white/10">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Target className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">Our Core Mission</h3>
          <p className="text-slate-300 leading-relaxed">
            To empower forward-thinking startups and established enterprises with custom software solutions that aren’t just functional, but transformative. We bridge the gap between academic AI research and reliable, mission-critical business software.
          </p>
          <div className="pt-4 grid grid-cols-2 gap-4 border-t border-slate-800">
            <div>
              <p className="text-2xl font-bold text-blue-400">100%</p>
              <p className="text-xs text-slate-400">Senior Engineering Pods</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-400">Zero</p>
              <p className="text-xs text-slate-400">Outsourced Junior Code</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-3xl font-extrabold text-white">Why ABC Technologies?</h3>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
            We operate as a high-velocity extension of your internal team. When you engage with ABC Technologies, your software isn't handed off to account managers; it is crafted by elite full-stack engineers obsessed with uptime, speed, and clean code.
          </p>
          <ul className="space-y-3 pt-2">
            <li className="flex items-center gap-3 text-slate-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Direct engineer-to-client communication channels</span>
            </li>
            <li className="flex items-center gap-3 text-slate-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Future-proofed architectures designed for rapid scaling</span>
            </li>
            <li className="flex items-center gap-3 text-slate-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Integrated AI capabilities natively built into your product</span>
            </li>
            <li className="flex items-center gap-3 text-slate-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Deep expertise in turnkey industrial manufacturing & IIoT sensor automation</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400">Our Pillars</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">The Principles That Drive Us</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl space-y-4 hover:border-blue-500/50 transition-all">
              <div className="h-12 w-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                {val.icon}
              </div>
              <h4 className="text-lg font-bold text-white">{val.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Team */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Our Experts</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Engineering & Architectural Leadership</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="glass-card p-6 rounded-3xl flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white font-extrabold text-xl shadow-lg group-hover:scale-105 transition-transform`}>
                  {member.avatar}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">{member.name}</h4>
                  <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">{member.role}</p>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
