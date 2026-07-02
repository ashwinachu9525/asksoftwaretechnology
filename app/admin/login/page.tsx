'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, KeyRound, ArrowRight, ShieldCheck, Terminal } from 'lucide-react';
import { Alert } from '@/components/ui/alert';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@asksoftware.tech');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Save user session
      localStorage.setItem('ask_admin_session', JSON.stringify(data.user));
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid login credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 max-w-md mx-auto px-4 sm:px-6 relative min-h-[85vh] flex flex-col justify-center">
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <div className="glass-card p-8 sm:p-10 rounded-3xl space-y-8 border border-white/10 dark:border-white/10 light:border-slate-200 shadow-2xl relative z-10">
        <div className="text-center space-y-3">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center mx-auto shadow-lg shadow-purple-500/30">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white dark:text-white light:text-slate-900">Ask Team CMS Login</h1>
          <p className="text-xs text-slate-400">
            Secure Portal for managing Enterprise CMS & AI Orchestrator.
          </p>
        </div>

        {error && (
          <Alert variant="destructive" title="Authentication Error">
            {error}
          </Alert>
        )}

        <div className="p-3.5 rounded-xl bg-purple-950/40 dark:bg-purple-950/40 light:bg-purple-50 border border-purple-500/30 text-xs text-purple-200 dark:text-purple-200 light:text-purple-900 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-purple-300 dark:text-purple-300 light:text-purple-800">
            <ShieldCheck className="w-4 h-4" /> Default Demo Credentials:
          </div>
          <div>Email: <strong className="text-white dark:text-white light:text-slate-900 select-all">admin@asksoftware.tech</strong></div>
          <div>Password: <strong className="text-white dark:text-white light:text-slate-900 select-all">admin123</strong></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700 block">
              Team Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="admin@asksoftware.tech"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700 block">
              Security Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Access CMS Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
