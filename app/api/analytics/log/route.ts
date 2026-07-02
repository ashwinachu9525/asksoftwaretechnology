import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const totalVisitors = await prisma.visitorLog.count();
    const recentVisitors = await prisma.visitorLog.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
    });
    const errors = await prisma.errorLog.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      totalVisitors,
      recentVisitors,
      errors,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, path, userAgent, message, stack, severity } = body;

    if (type === 'visit') {
      await prisma.visitorLog.create({
        data: {
          path: path || '/',
          userAgent: userAgent || 'Unknown Browser',
          ip: request.headers.get('x-forwarded-for') || '127.0.0.1',
        },
      });
      return NextResponse.json({ success: true });
    }

    if (type === 'error') {
      await prisma.errorLog.create({
        data: {
          message: message || 'Unknown full page error occurred',
          stack: stack || 'No stack trace provided',
          path: path || '/',
          severity: severity || 'ERROR',
        },
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid log type' }, { status: 400 });
  } catch (error) {
    console.error('Error recording log:', error);
    return NextResponse.json({ error: 'Failed to record log' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const target = searchParams.get('target'); // 'errors' or 'visitors'

    if (target === 'errors') {
      await prisma.errorLog.deleteMany();
    } else if (target === 'visitors') {
      await prisma.visitorLog.deleteMany();
    } else {
      await prisma.errorLog.deleteMany();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error clearing logs:', error);
    return NextResponse.json({ error: 'Failed to clear logs' }, { status: 500 });
  }
}
