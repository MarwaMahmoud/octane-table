'use client';

import { useTranslations, useLocale } from 'next-intl';
import type { ColumnDef } from '@/shared/types/table';
import type { User } from './types';
import StatusBadge from './status-badge';
import { formatDate, formatCurrency } from './utils';

/**
 * Hook returning the column definitions for the User domain.
 * Called inside SelectionTable / ExpandableTable so translations are always live.
 */
export function useUserColumns(): ColumnDef<User>[] {
  const t = useTranslations('users.columns');
  const locale = useLocale();

  return [
    {
      key: 'id',
      header: t('userId'),
      className: 'text-muted-foreground text-xs',
      render: (u) => u.id,
    },
    {
      key: 'nameEmail',
      header: t('nameEmail'),
      render: (u) => (
        <div>
          <div className="font-medium">{u.name}</div>
          <div className="text-xs text-muted-foreground">{u.email}</div>
        </div>
      ),
    },
    {
      key: 'role',
      header: t('role'),
      render: (u) => u.role,
    },
    {
      key: 'joinedDate',
      header: t('joinedDate'),
      render: (u) => formatDate(u.joinedDate, locale),
    },
    {
      key: 'lastActive',
      header: t('lastActive'),
      className: 'text-muted-foreground',
      render: (u) => u.lastActive,
    },
    {
      key: 'subscription',
      header: t('subscription'),
      render: (u) => <StatusBadge status={u.subscription} />,
    },
    {
      key: 'transactions',
      header: t('transactions'),
      className: 'text-end tabular-nums',
      headerClassName: 'text-end',
      render: (u) => formatCurrency(u.transactions, locale),
    },
  ];
}
