'use client';

import { usePathname, useRouter } from 'next/navigation';
import type { Route } from 'next';

const LANGS = [
  { locale: 'en', label: 'EN' },
  { locale: 'ar', label: 'AR' },
] as const;

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const current = pathname.startsWith('/ar') ? 'ar' : 'en';

  const switchTo = (locale: string) => {
    const newPath = pathname.replace(/^\/(en|ar)/, `/${locale}`);
    router.push(newPath as Route);
  };

  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-border bg-muted/40 p-0.5">
      {LANGS.map(({ locale, label }) => {
        const active = current === locale;
        return (
          <button
            key={locale}
            onClick={() => switchTo(locale)}
            disabled={active}
            className={[
              'rounded-md px-2.5 py-1 text-xs font-semibold transition-all duration-200',
              active
                ? 'bg-white text-foreground shadow-sm cursor-default'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/60 cursor-pointer',
            ].join(' ')}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
