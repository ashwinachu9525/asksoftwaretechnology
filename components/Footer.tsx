'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, Globe, Share2, MessageCircle, Mail, MapPin, Phone, ArrowUpRight, Heart } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 relative overflow-hidden">
      {/* Background glowing glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Terminal className="h-5 w-5 text-white" />
              </div>
              <span className="font-extrabold text-lg text-white">
                ASK <span className="text-gradient">SOFTWARE</span> TECH
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Architecting modern, resilient, and intelligent digital solutions. We help startups and ambitious enterprises build next-generation web applications, AI systems, and cloud-native infrastructure.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://asksoftware.tech" target="_blank" rel="noreferrer" className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 transition-all" title="Website">
                <Globe className="h-4 w-4" />
              </a>
              <a href="https://asksoftware.tech" target="_blank" rel="noreferrer" className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 transition-all" title="Social">
                <Share2 className="h-4 w-4" />
              </a>
              <a href="mailto:hello@asksoftware.tech" className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 transition-all" title="Community">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="text-slate-400 hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-blue-400 transition-colors">About Company</Link></li>
              <li><Link href="/services" className="text-slate-400 hover:text-blue-400 transition-colors">Core Services</Link></li>
              <li><Link href="/clients-partners" className="text-slate-400 hover:text-blue-400 transition-colors">Clients & Partners</Link></li>
              <li><Link href="/blog" className="text-slate-400 hover:text-blue-400 transition-colors">Blog & News</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-blue-400 transition-colors">Contact Team</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Capabilities</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="text-slate-400">Custom Web Architecture</li>
              <li className="text-slate-400">AI & LLM Workflows</li>
              <li className="text-slate-400">Cloud & Kubernetes DevOps</li>
              <li className="text-slate-400">Mobile App Development</li>
              <li className="text-slate-400">Enterprise Modernization</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Headquarters</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Tech Innovation Hub, Suite 400<br />San Francisco, CA & Silicon Valley</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <a href="mailto:hello@asksoftware.tech" className="hover:text-white transition-colors">hello@asksoftware.tech</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+1 (800) 555-ASK-TECH</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Ask Software Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/admin/login" className="hover:text-slate-300 transition-colors flex items-center gap-1">
              <span>Admin Login</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
            <span className="flex items-center gap-1">
              Built with <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" /> by Ask Engineering
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
