import type { ReactNode } from 'react';
import AppNav from './AppNav';
import LanguageSwitcher from './LanguageSwitcher';
import DashboardHeader from './DashboardHeader';

type Props = { children: ReactNode };

export default function DashboardShell({ children }: Props) {
  return (
    <main className="min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between">
            <AppNav />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 space-y-6">
        <DashboardHeader />
        <section>{children}</section>
      </div>
    </main>
  );
}
