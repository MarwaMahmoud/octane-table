'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';
import { useLocale } from 'next-intl';
import type { Route } from 'next';

export default function AppNav() {
  const locale = useLocale();

  return (
    <nav className="flex items-center">
      <Link
        href={`/${locale}` as Route}
        className="flex items-center gap-2 py-4"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Zap className="h-4 w-4" />
        </div>
        <span className="text-sm font-semibold tracking-tight">Octane</span>
      </Link>
    </nav>
  );
}
