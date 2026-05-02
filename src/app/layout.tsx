import './globals.css';
import { ReactNode } from 'react';
import { getLocale } from 'next-intl/server';
import { isRTL, type Locale } from '@/i18n/config';
import HtmlAttributes from './HtmlAttributes';

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={isRTL(locale as Locale) ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body>
        <HtmlAttributes />
        {children}
      </body>
    </html>
  );
}
