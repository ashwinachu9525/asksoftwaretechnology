import { NextResponse } from 'next/server';
import { prisma, ensureSeedData } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });

    // If user is not found, attempt seeding or auto-create if valid demo credentials were provided
    if (!user) {
      await ensureSeedData();
      user = await prisma.user.findUnique({ where: { email } });
    }

    if (!user && (email.toLowerCase() === 'admin@asksoftware.tech' || email.toLowerCase() === 'admin@abctechnologies.com') && password === 'admin123') {
      user = await prisma.user.upsert({
        where: { email: email.toLowerCase() },
        update: { password: 'admin123' },
        create: {
          email: email.toLowerCase(),
          password: 'admin123',
          name: 'ABC Admin Team',
        },
      });
    }

    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Invalid login credentials. Default demo credentials: admin@asksoftware.tech / admin123' }, { status: 401 });
    }

    // Return user info on success
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
