import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { decryptValue } from '@/lib/crypto';

// Helper for calling Google Gemini API REST endpoint
async function callGemini(apiKey: string, prompt: string): Promise<string | null> {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (err) {
    return null;
  }
}

// Helper for calling OpenAI API REST endpoint
async function callOpenAI(apiKey: string, prompt: string, model = 'gpt-4o-mini'): Promise<string | null> {
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.choices?.[0]?.message?.content || null;
  } catch (err) {
    return null;
  }
}

// Helper for calling OpenRouter API REST endpoint
async function callOpenRouter(apiKey: string, prompt: string): Promise<string | null> {
  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-pro',
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.choices?.[0]?.message?.content || null;
  } catch (err) {
    return null;
  }
}

// Helper for calling NVIDIA NIM API REST endpoint
async function callNvidiaNim(apiKey: string, prompt: string): Promise<string | null> {
  try {
    const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'meta/llama-3.1-70b-instruct',
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.choices?.[0]?.message?.content || null;
  } catch (err) {
    return null;
  }
}

// High quality structured fallback generator when live keys are unconfigured or fail
function getFallbackGeneration(action: string, topic?: string, category?: string): { title: string; excerpt: string; content: string } {
  const cat = category || 'AI & Tech';
  const t = topic || 'Scaling AI Agent Architectures in Enterprise Systems';

  if (action === 'suggest') {
    const titles = [
      `Next-Generation ${cat}: How Ask Software Technologies Transforms Digital Workflows`,
      `Architecting High-Concurrency Systems: Lessons from Ask Engineering Pods`,
      `Why 2026 is the Tipping Point for Autonomous AI Agents in Enterprise Software`,
    ];
    const pickedTitle = titles[Math.floor(Math.random() * titles.length)];
    return {
      title: pickedTitle,
      excerpt: `An architectural analysis on how ${cat.toLowerCase()} pipelines reduce operational latency by 45% and accelerate time-to-market.`,
      content: `### Executive Overview\nAs organizations scale, traditional software monoliths become bottlenecks. At Ask Software Technologies, our engineering pods deploy AI-driven distributed microservices designed for 99.999% uptime.\n\n### The Core Architectural Principles\n1. **Event-Driven Resilience**: Decoupling user mutations from analytics ingestion.\n2. **Zero-Trust Security Framework**: Enforcing AES-256 encryption across all data layers.\n3. **Agentic Automation**: Utilizing intelligent autonomous agents to monitor health and auto-heal pods.\n\n### Partner with Ask Software Technologies\nReady to transform your technical architecture? Contact our engineering leadership today!`,
    };
  }

  return {
    title: t,
    excerpt: `Discover the exact engineering roadmap and best practices for integrating ${cat} into core enterprise infrastructures.`,
    content: `When engineering high-performance digital products, architectural decisions made on day one dictate your scalability five years later. At **Ask Software Technologies**, we specialize in designing systems that thrive under immense load.\n\n### 1. Eliminating Single Points of Failure\nBy leveraging multi-region cloud clustering and intelligent read/write replication, system downtime becomes a artifact of the past.\n\n### 2. AI-Native Workflow Orchestration\nIntegrating LLMs directly into transactional databases allows real-time data synthesis and predictive anomaly detection.\n\n### Conclusion\nWhether modernizing legacy codebases or building high-speed greenfield projects, Ask Software Technologies provides world-class execution.`,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, topic, category, existingContent } = body;

    const config = await prisma.systemConfig.findUnique({
      where: { id: 'global' },
    });

    const primary = config?.aiPrimaryProvider || 'Google Gemini';
    const fallbackList = config?.aiFallbackOrder
      ? config.aiFallbackOrder.split(',')
      : ['Google Gemini', 'Nvidia NIM', 'OpenRouter', 'OpenAI'];

    // Ensure primary is checked first, followed by fallbacks
    const providersToTry = [primary, ...fallbackList.filter((p) => p !== primary)];

    const prompt = action === 'beautify'
      ? `You are a senior tech editor at Ask Software Technologies. Rewrite and format the following blog article into beautiful markdown with professional headers (###), engaging intro, bullet points, and clean syntax:\n\n${existingContent}`
      : `You are Chief AI Architect at Ask Software Technologies. Write a comprehensive, engaging tech blog post about "${topic || 'Enterprise Software Innovations'}" in the category "${category || 'AI & Tech'}". Return JSON format with fields: "title", "excerpt", and "content" (in markdown).`;

    for (const provider of providersToTry) {
      let resultText: string | null = null;

      if (provider === 'Google Gemini' && config?.geminiKeyEncrypted) {
        const key = decryptValue(config.geminiKeyEncrypted);
        if (key) resultText = await callGemini(key, prompt);
      } else if (provider === 'OpenAI' && config?.openaiKeyEncrypted) {
        const key = decryptValue(config.openaiKeyEncrypted);
        if (key) resultText = await callOpenAI(key, prompt);
      } else if (provider === 'Nvidia NIM' && config?.nvidiaKeyEncrypted) {
        const key = decryptValue(config.nvidiaKeyEncrypted);
        if (key) resultText = await callNvidiaNim(key, prompt);
      } else if (provider === 'OpenRouter' && config?.openrouterKeyEncrypted) {
        const key = decryptValue(config.openrouterKeyEncrypted);
        if (key) resultText = await callOpenRouter(key, prompt);
      }

      if (resultText) {
        // If result is JSON or markdown
        try {
          // Try parsing JSON if action is write/suggest
          const cleaned = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleaned);
          if (parsed.title && parsed.content) {
            return NextResponse.json({
              success: true,
              providerUsed: provider,
              result: parsed,
            });
          }
        } catch (e) {
          // If raw markdown returned
          return NextResponse.json({
            success: true,
            providerUsed: provider,
            result: {
              title: topic || 'AI & Enterprise Innovation',
              excerpt: resultText.substring(0, 140) + '...',
              content: resultText,
            },
          });
        }
      }
    }

    // If all configured live providers fail or no keys entered yet, return our high quality fallback orchestrator
    const simulated = getFallbackGeneration(action, topic, category);
    return NextResponse.json({
      success: true,
      providerUsed: `${primary} (Orchestrator Sandbox Mode)`,
      result: simulated,
      note: 'Generated using Ask AI Orchestrator sandbox. Add live API keys in AI Settings to enable live neural generation.',
    });
  } catch (error) {
    console.error('AI Orchestrator Error:', error);
    return NextResponse.json({ error: 'AI Orchestration failed' }, { status: 500 });
  }
}
