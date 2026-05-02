'use client';

import { useTranslations } from 'next-intl';
import type { FilterControl, TableFilters } from '@/shared/types/table';

export const USER_DEFAULT_FILTERS: TableFilters = {
  search: '',
  role: 'all',
  status: 'all',
  joinedFrom: '',
  joinedTo: '',
};

/**
 * Hook returning fully-translated FilterControl config for the User domain.
 * Passed to GenericTable so the toolbar renders with no hardcoded strings.
 */
export function useUserFilterControls(): FilterControl[] {
  const tf = useTranslations('users.filters');
  const tr = useTranslations('users.roles');
  const ts = useTranslations('users.statuses');

  return [
    { type: 'search', key: 'search' },
    {
      type: 'select',
      key: 'role',
      label: tf('role'),
      options: [
        { value: 'all', label: tf('allRoles') },
        { value: 'Admin', label: tr('admin') },
        { value: 'Editor', label: tr('editor') },
        { value: 'Viewer', label: tr('viewer') },
      ],
    },
    {
      type: 'select',
      key: 'status',
      label: tf('status'),
      options: [
        { value: 'all', label: tf('allStatuses') },
        { value: 'Active', label: ts('active') },
        { value: 'Inactive', label: ts('inactive') },
        { value: 'Pending', label: ts('pending') },
      ],
    },
    {
      type: 'date-range',
      fromKey: 'joinedFrom',
      toKey: 'joinedTo',
      fromLabel: tf('from'),
      toLabel: tf('to'),
    },
  ];
}
