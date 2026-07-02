'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { 
  PlusCircle, Trash2, LogOut, ShieldCheck, Sparkles, ExternalLink, 
  RefreshCw, FileText, User, Tag, Activity, AlertTriangle, Mail, 
  Cpu, HelpCircle, Lock, Key, ArrowUp, ArrowDown, CheckCircle2, 
  Send, Eye, BookOpen, Zap, Menu, X, Inbox, Terminal, LayoutDashboard,
  Settings, MessageSquare, Upload, Image as ImageIcon
} from 'lucide-react';
import { Alert } from '@/components/ui/alert';
import { ThemeToggle } from '@/components/ThemeToggle';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  publishedAt: string;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'blog' | 'inquiries' | 'smtp' | 'ai' | 'help'>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState<{ type: 'success' | 'destructive'; title: string; text: string } | null>(null);

  // Data states
  const [posts, setPosts] = useState<Post[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [analytics, setAnalytics] = useState<{ totalVisitors: number; recentVisitors: any[]; errors: any[] }>({
    totalVisitors: 0,
    recentVisitors: [],
    errors: [],
  });
  const [loading, setLoading] = useState(true);

  // Blog Form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('AI & Tech');
  const [author, setAuthor] = useState('ABC Engineering Squad');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [previewMode, setPreviewMode] = useState<'edit' | 'preview' | 'split'>('edit');
  const [uploadingImg, setUploadingImg] = useState(false);
  const [blogSubmitting, setBlogSubmitting] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);

  // SMTP Settings
  const [smtpHost, setSmtpHost] = useState('');
  const [smtpPort, setSmtpPort] = useState(587);
  const [smtpUser, setSmtpUser] = useState('');
  const [smtpPass, setSmtpPass] = useState('');
  const [smtpFrom, setSmtpFrom] = useState('');
  const [smtpSecure, setSmtpSecure] = useState(false);
  const [smtpConfigured, setSmtpConfigured] = useState(false);
  const [smtpSaving, setSmtpSaving] = useState(false);
  const [smtpTesting, setSmtpTesting] = useState(false);

  // AI Orchestrator Settings
  const [aiPrimary, setAiPrimary] = useState('Google Gemini');
  const [aiFallback, setAiFallback] = useState<string[]>(['Google Gemini', 'Nvidia NIM', 'OpenRouter', 'OpenAI']);
  const [geminiKey, setGeminiKey] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [nvidiaKey, setNvidiaKey] = useState('');
  const [openrouterKey, setOpenrouterKey] = useState('');
  const [keyStatus, setKeyStatus] = useState<any>({
    gemini: { configured: false },
    openai: { configured: false },
    nvidia: { configured: false },
    openrouter: { configured: false },
  });
  const [aiSaving, setAiSaving] = useState(false);

  const router = useRouter();

  const loadData = async () => {
    try {
      setLoading(true);
      // Posts
      const postsRes = await fetch('/api/posts');
      const postsData = await postsRes.json();
      if (postsData.posts) setPosts(postsData.posts);

      // Inquiries
      const inquiriesRes = await fetch('/api/contact');
      const inquiriesData = await inquiriesRes.json();
      if (inquiriesData.inquiries) setInquiries(inquiriesData.inquiries);

      // Analytics
      const analyticsRes = await fetch('/api/analytics/log');
      const analyticsData = await analyticsRes.json();
      if (analyticsData.totalVisitors !== undefined) setAnalytics(analyticsData);

      // System Config
      const configRes = await fetch('/api/admin/config');
      const configData = await configRes.json();
      if (configData.smtp) {
        setSmtpHost(configData.smtp.host || '');
        setSmtpPort(configData.smtp.port || 587);
        setSmtpUser(configData.smtp.user || '');
        setSmtpFrom(configData.smtp.from || '');
        setSmtpSecure(configData.smtp.secure || false);
        setSmtpConfigured(configData.smtp.passConfigured || false);
        if (configData.smtp.maskedPass) setSmtpPass(configData.smtp.maskedPass);
      }
      if (configData.ai) {
        setAiPrimary(configData.ai.primaryProvider || 'Google Gemini');
        if (Array.isArray(configData.ai.fallbackOrder)) setAiFallback(configData.ai.fallbackOrder);
        if (configData.ai.keys) {
          setKeyStatus(configData.ai.keys);
          if (configData.ai.keys.gemini.masked) setGeminiKey(configData.ai.keys.gemini.masked);
          if (configData.ai.keys.openai.masked) setOpenaiKey(configData.ai.keys.openai.masked);
          if (configData.ai.keys.nvidia.masked) setNvidiaKey(configData.ai.keys.nvidia.masked);
          if (configData.ai.keys.openrouter.masked) setOpenrouterKey(configData.ai.keys.openrouter.masked);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const session = localStorage.getItem('ask_admin_session');
    if (!session) {
      router.push('/admin/login');
      return;
    }
    setUser(JSON.parse(session));
    loadData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('ask_admin_session');
    router.push('/admin/login');
  };

  const insertFormatting = (prefix: string, suffix: string = '', defaultText: string = '') => {
    const textarea = document.getElementById('markdown-editor') as HTMLTextAreaElement | null;
    if (!textarea) {
      setContent((prev) => prev + '\n' + prefix + defaultText + suffix);
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end) || defaultText;
    const newContent = content.substring(0, start) + prefix + selected + suffix + content.substring(end);
    setContent(newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 10);
  };

  const handleLocalImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImg(true);
    setAlertMsg(null);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      insertFormatting(`![${data.name || 'Local Image'}](${data.url})`);
      setAlertMsg({
        type: 'success',
        title: 'Image Uploaded successfully!',
        text: `Uploaded "${data.name}" and inserted into article markdown.`,
      });
    } catch (err: any) {
      setAlertMsg({ type: 'destructive', title: 'Image Upload Failed', text: err.message });
    } finally {
      setUploadingImg(false);
      e.target.value = '';
    }
  };

  // Blog Handlers
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlogSubmitting(true);
    setAlertMsg(null);

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, author, excerpt, content }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to publish article');

      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setAlertMsg({
        type: 'success',
        title: 'Article Published to Cloud Database!',
        text: `"${title}" is now live on your website's Blog & News section.`,
      });
      setTitle('');
      setExcerpt('');
      setContent('');
      loadData();
    } catch (err: any) {
      setAlertMsg({ type: 'destructive', title: 'Publishing Failed', text: err.message });
    } finally {
      setBlogSubmitting(false);
    }
  };

  const handleDeletePost = async (id: string, postTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${postTitle}"?`)) return;
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAlertMsg({ type: 'success', title: 'Article Deleted', text: `Removed "${postTitle}" from database.` });
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm('Delete this contact inquiry?')) return;
    await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
    loadData();
  };

  const handleAiGenerateBlog = async (action: 'blog' | 'suggest') => {
    setAiGenerating(true);
    setAlertMsg(null);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          topic: title || 'Enterprise Custom Software & AI Engineering Innovations',
          category,
        }),
      });
      const data = await res.json();
      if (data.result) {
        if (data.result.title) setTitle(data.result.title);
        if (data.result.excerpt) setExcerpt(data.result.excerpt);
        if (data.result.content) setContent(data.result.content);
        setAlertMsg({
          type: 'success',
          title: `AI Generation Success (${data.providerUsed})`,
          text: data.note || `Successfully generated structured article using ${data.providerUsed}.`,
        });
      }
    } catch (err: any) {
      setAlertMsg({ type: 'destructive', title: 'AI Error', text: err.message || 'Generation failed' });
    } finally {
      setAiGenerating(false);
    }
  };

  // SMTP Handlers
  const handleSaveSmtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSmtpSaving(true);
    setAlertMsg(null);
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'smtp',
          smtp: { host: smtpHost, port: smtpPort, user: smtpUser, pass: smtpPass, from: smtpFrom, secure: smtpSecure },
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setAlertMsg({ type: 'success', title: 'Military-Grade Encryption Applied', text: data.message });
        loadData();
      }
    } catch (err: any) {
      setAlertMsg({ type: 'destructive', title: 'Save Failed', text: err.message });
    } finally {
      setSmtpSaving(false);
    }
  };

  const handleTestSmtp = async () => {
    setSmtpTesting(true);
    setAlertMsg(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isTestMail: true }),
      });
      const data = await res.json();
      if (res.ok) {
        setAlertMsg({ type: 'success', title: 'SMTP Mail Trigger Success!', text: data.message });
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      setAlertMsg({ type: 'destructive', title: 'SMTP Test Failed', text: err.message });
    } finally {
      setSmtpTesting(false);
    }
  };

  // AI Orchestrator Handlers
  const handleMoveFallback = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...aiFallback];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;
    setAiFallback(newOrder);
  };

  const handleSaveAi = async (e: React.FormEvent) => {
    e.preventDefault();
    setAiSaving(true);
    setAlertMsg(null);
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'ai',
          ai: {
            primaryProvider: aiPrimary,
            fallbackOrder: aiFallback,
            geminiKey,
            openaiKey,
            nvidiaKey,
            openrouterKey,
          },
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setAlertMsg({ type: 'success', title: 'AI Orchestrator Updated', text: data.message });
        loadData();
      }
    } catch (err: any) {
      setAlertMsg({ type: 'destructive', title: 'Save Failed', text: err.message });
    } finally {
      setAiSaving(false);
    }
  };

  const handleClearErrors = async () => {
    await fetch('/api/analytics/log?target=errors', { method: 'DELETE' });
    loadData();
  };

  if (!user) return null;

  const initials = user.name ? user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'AD';

  const navItems = [
    { id: 'overview', label: 'Overview & Telemetry', icon: LayoutDashboard, count: undefined },
    { id: 'blog', label: 'AI Blog & News Studio', icon: FileText, count: posts.length },
    { id: 'inquiries', label: 'Contact Inquiries', icon: Inbox, count: inquiries.length },
    { id: 'smtp', label: 'SMTP Mail Settings', icon: Mail, count: undefined },
    { id: 'ai', label: 'AI Orchestrator Suite', icon: Cpu, count: undefined },
    { id: 'help', label: 'Help & Documentation', icon: HelpCircle, count: undefined },
  ];

  return (
    <div className="flex min-h-screen w-full bg-slate-950 dark:bg-slate-950 light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-900 font-sans">
      {/* ── Open-Invoice Inspired Desktop Sidebar ── */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col lg:flex glass-sidebar border-r border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
        {/* Sidebar Header */}
        <div className="flex h-16 shrink-0 items-center border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-lg shadow-blue-500/30">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-white dark:text-white light:text-slate-900 tracking-tight">ASK SUITE</span>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Enterprise CMS</p>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Admin Management
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id as any); setAlertMsg(null); }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                  active
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-slate-900/60 dark:hover:bg-slate-900/60 light:hover:bg-slate-200/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${active ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'}`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 p-4 space-y-3 shrink-0 bg-slate-900/30 dark:bg-slate-900/30 light:bg-slate-100">
          <div className="flex items-center gap-3 px-1">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xs font-bold shadow-md">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white dark:text-white light:text-slate-900 truncate">{user.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded-xl bg-rose-950/60 dark:bg-rose-950/60 light:bg-rose-100 border border-rose-500/30 text-xs font-bold text-rose-300 dark:text-rose-300 light:text-rose-700 hover:bg-rose-900/80 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main Right Layout Container ── */}
      <div className="flex flex-col lg:pl-64 w-full min-w-0 min-h-screen">
        {/* Sticky Top Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 bg-slate-950/80 dark:bg-slate-950/80 light:bg-white/80 backdrop-blur-xl px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 dark:text-purple-400 light:text-purple-600">
              <ShieldCheck className="w-4 h-4" />
              <span>AES-256-GCM Military Grade Console</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border border-slate-700 dark:border-slate-700 light:border-slate-300 text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-700 hover:text-white flex items-center gap-1.5"
            >
              <span>View Public Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={loadData}
              className="p-2 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border border-slate-700 text-slate-400 hover:text-white"
              title="Refresh All Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <ThemeToggle />
          </div>
        </header>

        {/* Mobile Navigation Sheet */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden bg-slate-950/95 p-6 flex flex-col justify-between animate-in fade-in">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-extrabold text-white text-base">ASK SUITE</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTab(item.id as any); setMobileMenuOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold ${
                        activeTab === item.id ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'text-slate-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-4 rounded-xl bg-rose-950/80 border border-rose-500/40 text-sm font-bold text-rose-300 flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        )}

        {/* Page Content Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full min-w-0 mx-auto">
          {alertMsg && (
            <Alert variant={alertMsg.type} title={alertMsg.title} onClose={() => setAlertMsg(null)}>
              {alertMsg.text}
            </Alert>
          )}

          {/* TAB 1: OVERVIEW & TELEMETRY */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-blue-400 text-xs font-bold uppercase tracking-wider">
                    <span>Total Live Visitors</span>
                    <Eye className="w-4 h-4" />
                  </div>
                  <div className="text-3xl font-extrabold text-white dark:text-white light:text-slate-900">{analytics.totalVisitors}</div>
                  <p className="text-[11px] text-slate-400">Recorded across site via background Telemetry</p>
                </div>

                <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-purple-400 text-xs font-bold uppercase tracking-wider">
                    <span>Published Articles</span>
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="text-3xl font-extrabold text-white dark:text-white light:text-slate-900">{posts.length}</div>
                  <p className="text-[11px] text-slate-400">Active Blog & News posts</p>
                </div>

                <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <span>Contact Inquiries</span>
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="text-3xl font-extrabold text-white dark:text-white light:text-slate-900">{inquiries.length}</div>
                  <p className="text-[11px] text-slate-400">Project leads submitted from Contact form</p>
                </div>
              </div>

              {/* Full Page Error Logs Table */}
              <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                    <h3 className="font-bold text-white dark:text-white light:text-slate-900 text-base">Full Page & System Error Capture Log</h3>
                  </div>
                  {analytics.errors.length > 0 && (
                    <button
                      onClick={handleClearErrors}
                      className="px-3 py-1.5 rounded-lg bg-rose-950/60 border border-rose-500/30 text-xs font-semibold text-rose-300 hover:bg-rose-900 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Clear All Errors
                    </button>
                  )}
                </div>

                {analytics.errors.length === 0 ? (
                  <div className="py-12 text-center space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <p className="font-bold text-white dark:text-white light:text-slate-900">System Healthy: 0 Runtime Errors Captured</p>
                    <p className="text-xs text-slate-400">Any runtime bugs or failed script calls will be captured here automatically.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 uppercase">
                          <th className="py-3 px-4">Severity</th>
                          <th className="py-3 px-4">Path</th>
                          <th className="py-3 px-4">Error Message</th>
                          <th className="py-3 px-4">Stack Trace</th>
                          <th className="py-3 px-4">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {analytics.errors.map((err: any) => (
                          <tr key={err.id} className="hover:bg-white/5">
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold text-[10px]">
                                {err.severity}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-blue-400 font-bold">{err.path || '/'}</td>
                            <td className="py-3 px-4 text-white dark:text-white light:text-slate-900 max-w-xs truncate font-sans">{err.message}</td>
                            <td className="py-3 px-4 text-slate-400 max-w-sm truncate">{err.stack}</td>
                            <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                              {new Date(err.createdAt).toLocaleTimeString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: AI BLOG & NEWS STUDIO */}
          {activeTab === 'blog' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in">
              <div className="lg:col-span-7 glass-card p-8 rounded-3xl space-y-6 border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
                  <div className="flex items-center gap-2">
                    <PlusCircle className="w-5 h-5 text-blue-400" />
                    <h2 className="text-lg font-bold text-white dark:text-white light:text-slate-900">Publish New Article</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAiGenerateBlog('suggest')}
                      disabled={aiGenerating}
                      className="px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-xs font-bold text-purple-300 hover:bg-purple-900 flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" />
                      <span>AI Suggest Topic</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAiGenerateBlog('blog')}
                      disabled={aiGenerating}
                      className="px-3 py-1.5 rounded-xl bg-blue-950/60 border border-blue-500/30 text-xs font-bold text-blue-300 hover:bg-blue-900 flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <Zap className="w-3.5 h-3.5 text-blue-400" />
                      <span>{aiGenerating ? 'AI Writing...' : 'AI Generate Article'}</span>
                    </button>
                  </div>
                </div>

                <form onSubmit={handleCreatePost} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Article Title *</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., How ABC Technologies scales AI models..."
                      className="w-full bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-xl px-4 py-3 text-sm focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5 text-purple-400" /> Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500"
                      >
                        <option value="AI & Tech">AI & Tech</option>
                        <option value="Cloud Engineering">Cloud Engineering</option>
                        <option value="Startup News">Startup News</option>
                        <option value="Product Architecture">Product Architecture</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-emerald-400" /> Author Name
                      </label>
                      <input
                        type="text"
                        required
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500"
                      >
                      </input>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Short Excerpt</label>
                    <input
                      type="text"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="1-2 sentences summarizing the article..."
                      className="w-full bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Markdown Content *</label>
                      <div className="flex items-center gap-1 bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-200 p-1 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-300">
                        <button
                          type="button"
                          onClick={() => setPreviewMode('edit')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                            previewMode === 'edit'
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900'
                          }`}
                        >
                          <Terminal className="w-3.5 h-3.5" /> Edit Mode
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewMode('preview')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                            previewMode === 'preview'
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900'
                          }`}
                        >
                          <Eye className="w-3.5 h-3.5" /> Live Preview
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewMode('split')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                            previewMode === 'split'
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900'
                          }`}
                        >
                          <LayoutDashboard className="w-3.5 h-3.5" /> Split View
                        </button>
                      </div>
                    </div>

                    {/* Hidden input for local image uploads */}
                    <input
                      type="file"
                      id="local-image-upload"
                      accept="image/*"
                      onChange={handleLocalImageUpload}
                      className="hidden"
                    />

                    {/* Rich Formatting Toolbar inspired by screenshot */}
                    <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 shadow-inner">
                      {/* Group 1: Headings */}
                      <div className="flex items-center bg-slate-950 dark:bg-slate-950 light:bg-white rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-300 overflow-hidden">
                        <button
                          type="button"
                          title="add h1 (Large Title)"
                          onClick={() => insertFormatting('# ', '', 'Heading 1')}
                          className="px-3 py-1.5 text-xs font-extrabold text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-white/10 hover:text-white transition-colors border-r border-slate-800/80 dark:border-slate-800/80 light:border-slate-300"
                        >
                          h1
                        </button>
                        <button
                          type="button"
                          title="add h2 (Section Title)"
                          onClick={() => insertFormatting('## ', '', 'Heading 2')}
                          className="px-3 py-1.5 text-xs font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-white/10 hover:text-white transition-colors border-r border-slate-800/80 dark:border-slate-800/80 light:border-slate-300"
                        >
                          h2
                        </button>
                        <button
                          type="button"
                          title="add h3 (Sub-section Title)"
                          onClick={() => insertFormatting('### ', '', 'Heading 3')}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          h3
                        </button>
                      </div>

                      {/* Group 2: Media & Links */}
                      <div className="flex items-center bg-slate-950 dark:bg-slate-950 light:bg-white rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-300 overflow-hidden">
                        <button
                          type="button"
                          title="Insert Link"
                          onClick={() => insertFormatting('[', '](https://example.com)', 'Link Text')}
                          className="p-2.5 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-white/10 hover:text-blue-400 transition-colors border-r border-slate-800/80 dark:border-slate-800/80 light:border-slate-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          title="add image (Upload Local Image File from Computer)"
                          onClick={() => document.getElementById('local-image-upload')?.click()}
                          disabled={uploadingImg}
                          className="px-3 py-1.5 text-xs font-bold flex items-center gap-1.5 text-slate-200 dark:text-slate-200 light:text-slate-700 hover:bg-white/10 hover:text-emerald-400 transition-colors border-r border-slate-800/80 dark:border-slate-800/80 light:border-slate-300 disabled:opacity-50"
                        >
                          {uploadingImg ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                          ) : (
                            <Upload className="w-3.5 h-3.5 text-emerald-400" />
                          )}
                          <span>{uploadingImg ? 'Uploading...' : 'Image'}</span>
                        </button>
                        <button
                          type="button"
                          title="add image URL (Insert Web Image Link)"
                          onClick={() => insertFormatting('![', '](https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80)', 'Industrial Automation Dashboard')}
                          className="p-2.5 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-white/10 hover:text-emerald-400 transition-colors border-r border-slate-800/80 dark:border-slate-800/80 light:border-slate-300"
                        >
                          <ImageIcon className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          title="Insert Video Embed / URL"
                          onClick={() => insertFormatting('<video controls className="w-full rounded-2xl my-4 shadow-xl border border-slate-800"><source src="', '" type="video/mp4" /></video>', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4')}
                          className="p-2.5 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-white/10 hover:text-purple-400 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        </button>
                      </div>

                      {/* Group 3: Formatting */}
                      <div className="flex items-center bg-slate-950 dark:bg-slate-950 light:bg-white rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-300 overflow-hidden">
                        <button
                          type="button"
                          title="Bold Text"
                          onClick={() => insertFormatting('**', '**', 'bold text')}
                          className="px-2.5 py-1.5 font-extrabold text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-white/10 hover:text-white transition-colors border-r border-slate-800/80 dark:border-slate-800/80 light:border-slate-300"
                        >
                          B
                        </button>
                        <button
                          type="button"
                          title="Italic Text"
                          onClick={() => insertFormatting('*', '*', 'italic text')}
                          className="px-2.5 py-1.5 italic font-serif text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-white/10 hover:text-white transition-colors border-r border-slate-800/80 dark:border-slate-800/80 light:border-slate-300"
                        >
                          i
                        </button>
                        <button
                          type="button"
                          title="Code Block"
                          onClick={() => insertFormatting('```ts\n', '\n```', '// Code snippet here\nconst telemetry = "Active";')}
                          className="p-2 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-white/10 hover:text-amber-400 transition-colors font-mono text-xs"
                        >
                          &lt;&gt;
                        </button>
                      </div>

                      {/* Group 4: Tables, Lists, Divider */}
                      <div className="flex items-center bg-slate-950 dark:bg-slate-950 light:bg-white rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-300 overflow-hidden">
                        <button
                          type="button"
                          title="Insert Table"
                          onClick={() => insertFormatting('\n| Parameter | Value | Status |\n| :--- | :--- | :--- |\n| Uptime | 99.99% | Verified |\n| Latency | < 5ms | Optimal |\n')}
                          className="p-2 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-white/10 hover:text-blue-400 transition-colors border-r border-slate-800/80 dark:border-slate-800/80 light:border-slate-300"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        </button>
                        <button
                          type="button"
                          title="Insert Bullet List"
                          onClick={() => insertFormatting('\n- ', '', 'High-Precision Turnkey Engineering\n- Custom AI Agent Workflows')}
                          className="p-2 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-white/10 hover:text-purple-400 transition-colors border-r border-slate-800/80 dark:border-slate-800/80 light:border-slate-300"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        <button
                          type="button"
                          title="Insert Horizontal Divider"
                          onClick={() => insertFormatting('\n---\n')}
                          className="px-2.5 py-1.5 font-bold text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          —
                        </button>
                      </div>
                    </div>

                    {/* Display modes */}
                    {previewMode === 'edit' && (
                      <textarea
                        id="markdown-editor"
                        required
                        rows={10}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write or let AI generate your article markdown content here... Try clicking h1, Image, Video, or Table above!"
                        className="w-full bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-2xl p-4 text-sm font-mono focus:border-blue-500 transition-colors"
                      />
                    )}

                    {previewMode === 'preview' && (
                      <div className="w-full min-h-[280px] p-6 rounded-2xl bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 overflow-y-auto max-h-[600px]">
                        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider pb-3 mb-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-300 flex items-center justify-between">
                          <span>Live Render Preview</span>
                          <span className="text-[10px] text-slate-500">GFM + Media Enabled</span>
                        </div>
                        <MarkdownRenderer content={content || '*Nothing to preview yet... Click Edit Mode or format buttons!*'} />
                      </div>
                    )}

                    {previewMode === 'split' && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
                        <div>
                          <div className="text-xs font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                            <span>Markdown Editor</span>
                            <span className="text-[10px] text-purple-400">Live Sync</span>
                          </div>
                          <textarea
                            id="markdown-editor"
                            required
                            rows={12}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write markdown here..."
                            className="w-full h-[360px] bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-2xl p-4 text-sm font-mono focus:border-blue-500 transition-colors resize-none"
                          />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-400 mb-1.5">Live Preview</div>
                          <div className="w-full h-[360px] p-5 rounded-2xl bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 overflow-y-auto">
                            <MarkdownRenderer content={content || '*Nothing to preview yet...*'} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={blogSubmitting}
                    className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Sparkles className="w-5 h-5 animate-pulse text-blue-200" />
                    <span>{blogSubmitting ? 'Publishing to Cloud Database...' : 'Publish Article to Live Website'}</span>
                  </button>
                </form>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="glass-card p-6 rounded-3xl space-y-4 border border-white/10">
                  <h3 className="font-bold text-white dark:text-white light:text-slate-900 text-base pb-3 border-b border-slate-800">Live Articles ({posts.length})</h3>
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                    {posts.map((post) => (
                      <div key={post.id} className="p-4 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 border border-slate-800 flex items-start justify-between gap-3">
                        <div className="space-y-1 flex-1 min-w-0">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">{post.category}</span>
                          <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900 truncate">{post.title}</h4>
                          <p className="text-xs text-slate-400">By {post.author}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Link href={`/blog/${post.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-white"><ExternalLink className="w-4 h-4" /></Link>
                          <button onClick={() => handleDeletePost(post.id, post.title)} className="p-2 text-rose-400 hover:text-rose-200"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTACT INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="glass-card p-8 rounded-3xl space-y-6 border border-white/10 animate-in fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
                <div className="flex items-center gap-2">
                  <Inbox className="w-6 h-6 text-emerald-400" />
                  <h2 className="text-2xl font-extrabold text-white dark:text-white light:text-slate-900">Project Leads & Inquiries</h2>
                </div>
                {inquiries.length > 0 && (
                  <button
                    onClick={async () => {
                      if (window.confirm('Clear all inquiries?')) {
                        await fetch('/api/contact', { method: 'DELETE' });
                        loadData();
                      }
                    }}
                    className="px-3.5 py-2 rounded-xl bg-rose-950/60 border border-rose-500/30 text-xs font-bold text-rose-300 hover:bg-rose-900"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {inquiries.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <MessageSquare className="w-12 h-12 text-slate-600 mx-auto" />
                  <p className="font-bold text-white dark:text-white light:text-slate-900 text-lg">No Inquiries Submitted Yet</p>
                  <p className="text-sm text-slate-400">When visitors fill out the Contact Us form, their scope details appear here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="p-6 rounded-2xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-4 shadow-lg">
                      <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
                        <div>
                          <h4 className="font-bold text-white dark:text-white light:text-slate-900 text-base">{inq.name}</h4>
                          <a href={`mailto:${inq.email}`} className="text-xs text-blue-400 hover:underline">{inq.email}</a>
                        </div>
                        <button onClick={() => handleDeleteInquiry(inq.id)} className="text-rose-400 hover:text-rose-300">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                        <div><strong className="text-slate-500">Company:</strong> {inq.company || 'N/A'}</div>
                        <div><strong className="text-slate-500">Budget:</strong> {inq.budget}</div>
                        <div className="col-span-2"><strong className="text-slate-500">Service:</strong> {inq.service}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950 dark:bg-slate-950 light:bg-slate-100 text-xs font-mono text-slate-200 dark:text-slate-200 light:text-slate-800 whitespace-pre-wrap">
                        {inq.message}
                      </div>
                      <div className="text-[10px] text-slate-500 text-right">
                        Received: {new Date(inq.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SMTP MAIL SETTINGS */}
          {activeTab === 'smtp' && (
            <div className="max-w-3xl mx-auto glass-card p-8 sm:p-10 rounded-3xl space-y-8 border border-white/10 animate-in fade-in">
              <div className="space-y-2 pb-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
                <div className="flex items-center gap-2">
                  <Mail className="w-6 h-6 text-blue-400" />
                  <h2 className="text-2xl font-extrabold text-white dark:text-white light:text-slate-900">Encrypted SMTP Configuration</h2>
                </div>
                <p className="text-xs text-slate-300">
                  Configure SMTP server credentials so the Contact Us form triggers email dispatch. Passwords use <strong className="text-emerald-400">Military-Grade AES-256-GCM encryption</strong>.
                </p>
              </div>

              <form onSubmit={handleSaveSmtp} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">SMTP Host Server *</label>
                    <input
                      type="text"
                      required
                      value={smtpHost}
                      onChange={(e) => setSmtpHost(e.target.value)}
                      placeholder="smtp.gmail.com or smtp.sendgrid.net"
                      className="w-full bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Port *</label>
                    <input
                      type="number"
                      required
                      value={smtpPort}
                      onChange={(e) => setSmtpPort(Number(e.target.value))}
                      className="w-full bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">SMTP Username / Email *</label>
                    <input
                      type="text"
                      required
                      value={smtpUser}
                      onChange={(e) => setSmtpUser(e.target.value)}
                      placeholder="hello@asksoftware.tech or apikey"
                      className="w-full bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                      <span>SMTP Password *</span>
                      {smtpConfigured && <span className="text-[10px] text-emerald-400 flex items-center gap-0.5"><Lock className="w-3 h-3" /> Encrypted</span>}
                    </label>
                    <input
                      type="password"
                      value={smtpPass}
                      onChange={(e) => setSmtpPass(e.target.value)}
                      placeholder={smtpConfigured ? '•••••••• (AES-256 Encrypted)' : 'Enter SMTP Secret Password'}
                      className="w-full bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 rounded-xl px-4 py-3 text-sm font-mono focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">From Email Address</label>
                    <input
                      type="text"
                      value={smtpFrom}
                      onChange={(e) => setSmtpFrom(e.target.value)}
                      placeholder="hello@asksoftware.tech"
                      className="w-full bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500"
                    />
                  </div>
                  <div className="pt-5 flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="ssl"
                      checked={smtpSecure}
                      onChange={(e) => setSmtpSecure(e.target.checked)}
                      className="w-5 h-5 rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0"
                    />
                    <label htmlFor="ssl" className="text-sm text-slate-300 font-semibold cursor-pointer">
                      Enable SSL/TLS (Port 465)
                    </label>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={smtpSaving}
                    className="flex-1 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Lock className="w-4 h-4" />
                    <span>{smtpSaving ? 'Encrypting & Saving...' : 'Save Encrypted SMTP Credentials'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleTestSmtp}
                    disabled={smtpTesting || !smtpConfigured}
                    className="px-6 py-4 rounded-xl font-bold text-slate-200 bg-slate-900 border border-slate-700 hover:text-white hover:border-blue-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 text-blue-400" />
                    <span>{smtpTesting ? 'Testing...' : 'Test Mail Trigger'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 5: AI ORCHESTRATOR CONFIGURATION */}
          {activeTab === 'ai' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 flex items-start gap-4">
                <div className="h-10 w-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white dark:text-white light:text-slate-900 text-base">Secure Storage</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    Your API keys are encrypted at rest using <strong className="text-emerald-400">AES-256-GCM</strong>. They are never exposed to the browser and are decrypted only temporarily in memory when communicating with providers.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveAi} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5 glass-card p-6 rounded-3xl space-y-6 border border-white/10">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white dark:text-white light:text-slate-900 block">Primary Provider</label>
                      <p className="text-xs text-slate-400">Select the default AI provider to handle your requests.</p>
                      <select
                        value={aiPrimary}
                        onChange={(e) => setAiPrimary(e.target.value)}
                        className="w-full bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold focus:border-purple-500 mt-2"
                      >
                        <option value="Google Gemini">Google Gemini</option>
                        <option value="Nvidia NIM">Nvidia NIM</option>
                        <option value="OpenRouter">OpenRouter</option>
                        <option value="OpenAI">OpenAI</option>
                      </select>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-slate-800 dark:border-slate-800 light:border-slate-200">
                      <div>
                        <label className="text-sm font-bold text-white dark:text-white light:text-slate-900 block">Fallback Order</label>
                        <p className="text-xs text-slate-400">Order providers. If the primary fails, the orchestrator will try the next available one.</p>
                      </div>
                      <div className="space-y-2">
                        {aiFallback.map((provider, idx) => (
                          <div key={provider} className="p-3 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="h-6 w-6 rounded-full bg-purple-500/10 text-purple-300 font-bold text-xs flex items-center justify-center">
                                {idx + 1}
                              </span>
                              <span className="text-sm font-bold text-white dark:text-white light:text-slate-900">{provider}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleMoveFallback(idx, 'up')}
                                disabled={idx === 0}
                                className="p-1.5 rounded bg-slate-950 text-slate-400 hover:text-white disabled:opacity-30"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMoveFallback(idx, 'down')}
                                disabled={idx === aiFallback.length - 1}
                                className="p-1.5 rounded bg-slate-950 text-slate-400 hover:text-white disabled:opacity-30"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={aiSaving}
                      className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Key className="w-4 h-4" />
                      <span>{aiSaving ? 'Encrypting & Saving...' : 'Save AI Orchestrator Config'}</span>
                    </button>
                  </div>

                  <div className="lg:col-span-7 space-y-5">
                    {/* Google Gemini Card */}
                    <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white dark:text-white light:text-slate-900 text-base">Google Gemini</h4>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${keyStatus.gemini.configured ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                          {keyStatus.gemini.configured ? 'Configured' : 'Not Configured'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 space-y-1 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 p-3.5 rounded-xl border border-slate-800">
                        <p className="font-bold text-slate-300 dark:text-slate-300 light:text-slate-700">How to get this key:</p>
                        <ol className="list-decimal list-inside space-y-0.5">
                          <li>Sign in to Google AI Studio.</li>
                          <li>Click &apos;Get API key&apos; in the left menu.</li>
                          <li>Click &apos;Create API key in new project&apos; and copy the value.</li>
                        </ol>
                        <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-blue-400 hover:underline font-bold pt-1">
                          <span>Open Google AI Studio</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <input
                        type="password"
                        value={geminiKey}
                        onChange={(e) => setGeminiKey(e.target.value)}
                        placeholder="Enter new key to replace..."
                        className="w-full bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 rounded-xl px-4 py-3 text-sm font-mono focus:border-purple-500"
                      />
                    </div>

                    {/* OpenAI Card */}
                    <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white dark:text-white light:text-slate-900 text-base">OpenAI</h4>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${keyStatus.openai.configured ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                          {keyStatus.openai.configured ? 'Configured' : 'Not Configured'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 space-y-1 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 p-3.5 rounded-xl border border-slate-800">
                        <p className="font-bold text-slate-300 dark:text-slate-300 light:text-slate-700">How to get this key:</p>
                        <ol className="list-decimal list-inside space-y-0.5">
                          <li>Sign in to the OpenAI Platform.</li>
                          <li>Navigate to Dashboard &gt; API keys.</li>
                          <li>Click &apos;Create new secret key&apos; and copy the key.</li>
                        </ol>
                        <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-blue-400 hover:underline font-bold pt-1">
                          <span>Open OpenAI Platform</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <input
                        type="password"
                        value={openaiKey}
                        onChange={(e) => setOpenaiKey(e.target.value)}
                        placeholder="Enter API key..."
                        className="w-full bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 rounded-xl px-4 py-3 text-sm font-mono focus:border-purple-500"
                      />
                    </div>

                    {/* Nvidia NIM Card */}
                    <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white dark:text-white light:text-slate-900 text-base">Nvidia NIM</h4>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${keyStatus.nvidia.configured ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                          {keyStatus.nvidia.configured ? 'Configured' : 'Not Configured'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 space-y-1 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 p-3.5 rounded-xl border border-slate-800">
                        <p className="font-bold text-slate-300 dark:text-slate-300 light:text-slate-700">How to get this key:</p>
                        <ol className="list-decimal list-inside space-y-0.5">
                          <li>Create or sign into your NVIDIA account.</li>
                          <li>Go to the API key section in your profile.</li>
                          <li>Click &apos;Generate Key&apos; and copy the newly generated key.</li>
                        </ol>
                        <a href="https://build.nvidia.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-blue-400 hover:underline font-bold pt-1">
                          <span>Open NVIDIA NGC</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <input
                        type="password"
                        value={nvidiaKey}
                        onChange={(e) => setNvidiaKey(e.target.value)}
                        placeholder="Enter new key to replace..."
                        className="w-full bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 rounded-xl px-4 py-3 text-sm font-mono focus:border-purple-500"
                      />
                    </div>

                    {/* OpenRouter Card */}
                    <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white dark:text-white light:text-slate-900 text-base">OpenRouter</h4>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${keyStatus.openrouter.configured ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                          {keyStatus.openrouter.configured ? 'Configured' : 'Not Configured'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 space-y-1 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 p-3.5 rounded-xl border border-slate-800">
                        <p className="font-bold text-slate-300 dark:text-slate-300 light:text-slate-700">How to get this key:</p>
                        <ol className="list-decimal list-inside space-y-0.5">
                          <li>Sign in to OpenRouter.</li>
                          <li>Go to your account Settings &gt; Keys.</li>
                          <li>Click &apos;Create Key&apos;, name it, and copy the key value.</li>
                        </ol>
                        <a href="https://openrouter.ai/keys" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-blue-400 hover:underline font-bold pt-1">
                          <span>Open OpenRouter</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <input
                        type="password"
                        value={openrouterKey}
                        onChange={(e) => setOpenrouterKey(e.target.value)}
                        placeholder="Enter new key to replace..."
                        className="w-full bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 rounded-xl px-4 py-3 text-sm font-mono focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* TAB 6: HELP & DOCUMENTATION MANUAL */}
          {activeTab === 'help' && (
            <div className="space-y-8 animate-in fade-in max-w-4xl mx-auto">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-extrabold text-white dark:text-white light:text-slate-900">System Configuration & Security Manual</h2>
                <p className="text-sm text-slate-400">Complete architectural guide for ABC Technologies administrators.</p>
              </div>

              <div className="space-y-6">
                <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                    <Lock className="w-5 h-5" />
                    <h3>Military-Grade AES-256-GCM Encryption</h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    All sensitive credentials (SMTP Passwords, Google Gemini keys, OpenAI keys, Nvidia NIM keys, and OpenRouter keys) are encrypted before writing to permanent database storage. We utilize 256-bit Advanced Encryption Standard in Galois/Counter Mode (GCM).
                  </p>
                </div>

                <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-base">
                    <Mail className="w-5 h-5" />
                    <h3>Contact Form SMTP Mail Trigger</h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    When a visitor submits an inquiry on `/contact`, our server endpoint (`/api/contact`) reads your configured SMTP credentials, decrypts the password in secure memory, and dispatches an email via Nodemailer to your target email address (`hello@asksoftware.tech`). All submissions are also logged under the &quot;Contact Inquiries&quot; tab.
                  </p>
                </div>

                <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                    <Cpu className="w-5 h-5" />
                    <h3>AI Orchestrator & Fallback Behavior</h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    The AI Orchestrator provides resilience across LLM providers. When you click <strong className="text-white">&quot;AI Generate Article&quot;</strong> in the Blog Studio, the orchestrator attempts your selected <strong className="text-purple-300">Primary Provider</strong> first. If that provider experiences rate limits or invalid keys, it cascades down your configured <strong className="text-purple-300">Fallback Order</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
