'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { isRTL, locales, type Locale } from '@/i18n/config';

export default function HtmlAttributes() {
  const params = useParams();
  const locale = params?.locale as string | undefined;

  useEffect(() => {
    if (!locale || !locales.includes(locale as Locale)) return;
    document.documentElement.lang = locale;
    document.documentElement.dir = isRTL(locale as Locale) ? 'rtl' : 'ltr';
  }, [locale]);

  return null;
}
