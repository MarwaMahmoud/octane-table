'use client';

import { MoreHorizontal, Eye, Pencil, Shield, UserX, Trash2 } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { isRTL, type Locale } from '@/i18n/config';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { User } from './types';

export default function UserRowActions({ user }: { user: User }) {
  const t = useTranslations('users.actions');
  const locale = useLocale();
  const rtl = isRTL(locale as Locale);

  return (
    <DropdownMenu dir={rtl ? 'rtl' : 'ltr'}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">{t('viewProfile')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Eye /> {t('viewProfile')}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Pencil /> {t('editDetails')}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Shield /> {t('changeRole')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserX /> {t('deactivateUser')}
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <Trash2 /> {t('delete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
