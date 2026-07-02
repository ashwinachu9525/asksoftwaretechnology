import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { encryptValue, maskKey } from '@/lib/crypto';

export async function GET() {
  try {
    let config = await prisma.systemConfig.findUnique({
      where: { id: 'global' },
    });

    if (!config) {
      config = await prisma.systemConfig.create({
        data: {
          id: 'global',
          aiPrimaryProvider: 'Google Gemini',
          aiFallbackOrder: 'Google Gemini,Nvidia NIM,OpenRouter,OpenAI',
        },
      });
    }

    // Mask sensitive keys before returning to client UI
    return NextResponse.json({
      smtp: {
        host: config.smtpHost || '',
        port: config.smtpPort || 587,
        user: config.smtpUser || '',
        from: config.smtpFrom || '',
        secure: config.smtpSecure || false,
        passConfigured: !!config.smtpPassEncrypted,
        maskedPass: maskKey(config.smtpPassEncrypted),
      },
      ai: {
        primaryProvider: config.aiPrimaryProvider || 'Google Gemini',
        fallbackOrder: config.aiFallbackOrder ? config.aiFallbackOrder.split(',') : ['Google Gemini', 'Nvidia NIM', 'OpenRouter', 'OpenAI'],
        keys: {
          gemini: { configured: !!config.geminiKeyEncrypted, masked: maskKey(config.geminiKeyEncrypted) },
          openai: { configured: !!config.openaiKeyEncrypted, masked: maskKey(config.openaiKeyEncrypted) },
          nvidia: { configured: !!config.nvidiaKeyEncrypted, masked: maskKey(config.nvidiaKeyEncrypted) },
          openrouter: { configured: !!config.openrouterKeyEncrypted, masked: maskKey(config.openrouterKeyEncrypted) },
        },
      },
    });
  } catch (error) {
    console.error('Error reading config:', error);
    return NextResponse.json({ error: 'Failed to read configuration' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { section, smtp, ai } = body;

    let config = await prisma.systemConfig.findUnique({
      where: { id: 'global' },
    });

    if (!config) {
      config = await prisma.systemConfig.create({ data: { id: 'global' } });
    }

    if (section === 'smtp' && smtp) {
      const updateData: any = {
        smtpHost: smtp.host,
        smtpPort: Number(smtp.port) || 587,
        smtpUser: smtp.user,
        smtpFrom: smtp.from,
        smtpSecure: Boolean(smtp.secure),
      };

      // Only encrypt and replace password if a new plaintext password was entered
      if (smtp.pass && !smtp.pass.includes('••••')) {
        updateData.smtpPassEncrypted = encryptValue(smtp.pass);
      }

      await prisma.systemConfig.update({
        where: { id: 'global' },
        data: updateData,
      });

      return NextResponse.json({ success: true, message: 'SMTP credentials saved with AES-256-GCM encryption.' });
    }

    if (section === 'ai' && ai) {
      const updateData: any = {
        aiPrimaryProvider: ai.primaryProvider || 'Google Gemini',
      };

      if (Array.isArray(ai.fallbackOrder)) {
        updateData.aiFallbackOrder = ai.fallbackOrder.join(',');
      }

      // Only encrypt and replace API keys if new values are entered (not masked placeholders)
      if (ai.geminiKey && !ai.geminiKey.includes('••••')) {
        updateData.geminiKeyEncrypted = encryptValue(ai.geminiKey);
      }
      if (ai.openaiKey && !ai.openaiKey.includes('••••')) {
        updateData.openaiKeyEncrypted = encryptValue(ai.openaiKey);
      }
      if (ai.nvidiaKey && !ai.nvidiaKey.includes('••••')) {
        updateData.nvidiaKeyEncrypted = encryptValue(ai.nvidiaKey);
      }
      if (ai.openrouterKey && !ai.openrouterKey.includes('••••')) {
        updateData.openrouterKeyEncrypted = encryptValue(ai.openrouterKey);
      }

      await prisma.systemConfig.update({
        where: { id: 'global' },
        data: updateData,
      });

      return NextResponse.json({ success: true, message: 'AI Orchestrator settings saved securely.' });
    }

    return NextResponse.json({ error: 'Invalid configuration section' }, { status: 400 });
  } catch (error) {
    console.error('Error updating config:', error);
    return NextResponse.json({ error: 'Failed to update configuration' }, { status: 500 });
  }
}
