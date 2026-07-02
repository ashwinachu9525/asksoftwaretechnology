'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function TelemetryTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Record page visit
    const recordVisit = async () => {
      try {
        await fetch('/api/analytics/log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'visit',
            path: pathname,
            userAgent: navigator.userAgent,
          }),
        });
      } catch (err) {
        // Silently ignore telemetry failure
      }
    };

    recordVisit();
  }, [pathname]);

  useEffect(() => {
    // Capture global uncaught errors
    const handleError = (event: ErrorEvent) => {
      fetch('/api/analytics/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'error',
          message: event.message || 'Full page runtime error',
          stack: event.error?.stack || `${event.filename}:${event.lineno}:${event.colno}`,
          path: window.location.pathname,
          severity: 'CRITICAL',
        }),
      }).catch(() => {});
    };

    // Capture unhandled promise rejections
    const handleRejection = (event: PromiseRejectionEvent) => {
      fetch('/api/analytics/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'error',
          message: `Unhandled Rejection: ${event.reason?.message || event.reason}`,
          stack: event.reason?.stack || String(event.reason),
          path: window.location.pathname,
          severity: 'ERROR',
        }),
      }).catch(() => {});
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  return null;
}
