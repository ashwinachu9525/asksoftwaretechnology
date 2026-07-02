'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Mail, Phone, MapPin, Send, MessageSquare, Clock, ShieldCheck, 
  ChevronDown, ChevronUp, Sparkles, CheckCircle2, Globe 
} from 'lucide-react';
import { Alert } from '@/components/ui/alert';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Custom Web Architecture',
    budget: '$15k - $50k',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeLocation, setActiveLocation] = useState(0);

  const locations = [
    {
      city: 'Silicon Valley (HQ)',
      country: 'United States',
      address: 'Tech Innovation Hub, Suite 400, San Francisco, CA',
      phone: '+1 (800) 555-ASK-TECH',
      email: 'hq@asksoftware.tech',
      timezone: 'PST (UTC-8)',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764017948534!3d37.757814996609724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1719900000000!5m2!1sen!2sus',
    },
    {
      city: 'Bengaluru R&D Center',
      country: 'India',
      address: 'Electronic City Phase 1, Tech Corridor, Bengaluru, Karnataka',
      phone: '+91 80 4555 0192',
      email: 'india@asksoftware.tech',
      timezone: 'IST (UTC+5:30)',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.886539092!2d77.49085284307567!3d12.953959988118836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sin!4v1719900000000!5m2!1sen!2sin',
    },
    {
      city: 'London Innovation Hub',
      country: 'United Kingdom',
      address: 'Shoreditch Tech Tower, Shoreditch High St, London E1',
      phone: '+44 20 7946 0911',
      email: 'uk@asksoftware.tech',
      timezone: 'GMT (UTC+0)',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.47339870626!2d-0.24168058968037373!3d51.52855824164916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2suk!4v1719900000000!5m2!1sen!2suk',
    },
    {
      city: 'Singapore Cloud Center',
      country: 'Singapore',
      address: 'Marina Bay Financial Centre Tower 3, Singapore 018982',
      phone: '+65 6789 0123',
      email: 'apac@asksoftware.tech',
      timezone: 'SGT (UTC+8)',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.19036281522!2d103.70416182103322!3d1.3143393796336336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da11238a8b9375%3A0x887869cf52abf5c4!2sSingapore!5e0!3m2!1sen!2ssg!4v1719900000000!5m2!1sen!2ssg',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error('Contact submit error:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
      setFormData({
        name: '',
        email: '',
        company: '',
        service: 'Custom Web Architecture',
        budget: '$15k - $50k',
        message: '',
      });
    }
  };

  const faqs = [
    {
      q: 'How fast can Ask Software Technologies start on our project?',
      a: 'We typically onboard new engineering pods within 5 to 10 business days following architecture alignment and proposal approval.',
    },
    {
      q: 'Do we own the Intellectual Property (IP) and source code?',
      a: '100% yes. All source code, designs, and AI training pipelines are assigned strictly to your organization upon payment of sprint milestones.',
    },
    {
      q: 'Can your team take over existing codebase or legacy systems?',
      a: 'Yes. We conduct a thorough 3-day architectural audit to benchmark technical debt, security risks, and performance bottlenecks before executing modernization sprints.',
    },
    {
      q: 'How do you handle ongoing maintenance and hosting?',
      a: 'We deploy to cloud providers (AWS, GCP, Vercel) owned directly by you. We offer monthly SLA support packages for continuous monitoring and updates.',
    },
  ];

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-blue-400 uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Connect With Architecture Team</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Let’s Architect Your Next <span className="text-gradient">Breakthrough</span>
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Tell us about your project goals or technical hurdles. Our engineering directors will review your inquiry and respond within 12 business hours.
        </p>
      </div>

      {submitted && (
        <div className="max-w-2xl mx-auto">
          <Alert
            variant="success"
            title="Message Successfully Dispatched!"
            onClose={() => setSubmitted(false)}
          >
            Your inquiry has been routed directly to our core engineering inbox (<strong className="text-white">hello@asksoftware.tech</strong>). An architect will contact you shortly!
          </Alert>
        </div>
      )}

      {/* Main Form & Contact Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 glass-card p-8 sm:p-10 rounded-3xl space-y-6 border border-white/10 shadow-2xl">
          <h3 className="text-2xl font-bold text-white">Project Scope & Inquiry Form</h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Work Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@company.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Acme Corp or Startup Name"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Primary Service Interest
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="Custom Web Architecture">Custom Web Architecture</option>
                  <option value="AI & LLM Integration">AI & LLM Integration</option>
                  <option value="Cloud Engineering & DevOps">Cloud Engineering & DevOps</option>
                  <option value="Mobile App Engineering">Mobile App Engineering</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Estimated Project Budget
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="Under $15k">Under $15,000</option>
                <option value="$15k - $50k">$15,000 - $50,000</option>
                <option value="$50k - $150k">$50,000 - $150,000</option>
                <option value="$150k+ Enterprise">$150,000+ Enterprise Suite</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Project Architecture & Roadmap Details *
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us what you are trying to build, current technical bottlenecks, or target launch timeline..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 text-base disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              <span>{loading ? 'Dispatching to Engineering Team...' : 'Send Inquiry to Ask Software Tech'}</span>
            </button>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-card p-8 rounded-3xl space-y-6 border border-white/10">
            <h3 className="text-xl font-bold text-white">Direct Communication Channels</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              We don&apos;t hide behind automated gatekeepers. Reach out directly to our engineering coordinators.
            </p>

            <div className="space-y-5 pt-2">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">General & RFP Email</p>
                  <a href="mailto:hello@asksoftware.tech" className="text-base font-bold text-white hover:text-blue-400 transition-colors">
                    hello@asksoftware.tech
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Direct Hotline</p>
                  <p className="text-base font-bold text-white">+1 (800) 555-ASK-TECH</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Main Engineering Hub</p>
                  <p className="text-base font-bold text-white">Tech Innovation Hub, Suite 400</p>
                  <p className="text-xs text-slate-400">San Francisco, CA & Silicon Valley</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl space-y-4 border border-white/10 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Clock className="w-4 h-4" />
              <span>Rapid Response Commitment</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every submission is evaluated by an engineering tech lead—never an outsourced sales rep. You will receive an email with preliminary architecture notes within 12 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Global Locations with Small Square Box Google Maps */}
      <div className="space-y-10 pt-10 border-t border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5" />
              <span>Worldwide Presence</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">Our Global Engineering Offices</h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Select an office location below to view interactive map coordinates, regional timezones, and direct local contact details.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            {locations.map((loc, idx) => (
              <button
                key={idx}
                onClick={() => setActiveLocation(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeLocation === idx
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {loc.city.split(' ')[0]} ({loc.country})
              </button>
            ))}
          </div>
        </div>

        {/* Selected Location Highlight Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-blue-500/30 bg-gradient-to-br from-slate-900 via-blue-950/20 to-slate-900">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-6 w-full lg:w-auto">
              {/* Small Square Box Google Map */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-blue-500/40 shadow-2xl shadow-blue-500/20 shrink-0 relative group bg-slate-950">
                <iframe
                  src={locations[activeLocation].mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-auto"
                />
              </div>

              <div className="space-y-3 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold text-[10px] uppercase tracking-wider border border-blue-500/30">
                    {locations[activeLocation].country}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{locations[activeLocation].timezone}</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                  {locations[activeLocation].city}
                </h3>
                <p className="text-sm text-slate-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{locations[activeLocation].address}</span>
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-bold">
                  <span className="text-blue-400 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> {locations[activeLocation].phone}
                  </span>
                  <span className="text-purple-400 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> {locations[activeLocation].email}
                  </span>
                </div>
              </div>
            </div>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(locations[activeLocation].address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full lg:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shrink-0 border border-slate-700"
            >
              <Globe className="w-4 h-4 text-blue-400" />
              <span>Open Full Google Map</span>
            </a>
          </div>
        </div>

        {/* 4-Column Grid of All Locations with Small Square Box Maps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc, idx) => (
            <div
              key={idx}
              onClick={() => setActiveLocation(idx)}
              className={`glass-card p-5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                activeLocation === idx
                  ? 'border-blue-500 bg-blue-950/30 shadow-xl shadow-blue-500/10'
                  : 'border-white/10 hover:border-white/30 hover:bg-white/5'
              }`}
            >
              {/* Small Square Box Map */}
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-700 shrink-0 bg-slate-950 shadow-md">
                <iframe
                  src={loc.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  className="w-full h-full pointer-events-none"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider truncate">{loc.country}</p>
                <h4 className="text-sm font-extrabold text-white truncate mt-0.5">{loc.city.split(' ')[0]}</h4>
                <p className="text-[11px] text-slate-400 truncate mt-1">{loc.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-8 pt-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400">Frequently Asked Questions</h2>
          <h3 className="text-3xl font-extrabold text-white">Clear Answers for Technical Leaders</h3>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between font-bold text-white hover:text-blue-400 transition-colors"
              >
                <span className="text-base">{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-5 h-5 shrink-0" /> : <ChevronDown className="w-5 h-5 shrink-0" />}
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4 animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
