'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { UserStatus } from './types';

const statusConfig: Record<UserStatus, { dot: string; bg: string; text: string }> = {
  Active:   { dot: 'bg-emerald-500', bg: 'bg-emerald-50',  text: 'text-emerald-700' },
  Inactive: { dot: 'bg-zinc-400',    bg: 'bg-zinc-100',    text: 'text-zinc-600'    },
  Pending:  { dot: 'bg-amber-500',   bg: 'bg-amber-50',    text: 'text-amber-700'   },
};

const statusKey: Record<UserStatus, 'active' | 'inactive' | 'pending'> = {
  Active: 'active',
  Inactive: 'inactive',
  Pending: 'pending',
};

export default function StatusBadge({ status }: { status: UserStatus }) {
  const t = useTranslations('users.statuses');
  const { dot, bg, text } = statusConfig[status];
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium', bg, text)}>
      <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', dot)} />
      {t(statusKey[status])}
    </span>
  );
}
