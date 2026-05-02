'use client';

import GenericTable from '@/shared/components/table/GenericTable';
import { useUserColumns } from '../columns';
import { useUserFilterControls, USER_DEFAULT_FILTERS } from '../filter-controls';
import { applyFilters } from '../utils';
import UserRowActions from '../row-actions';
import type { User } from '../types';

type Props = { data: User[]; isLoading?: boolean };

/**
 * Thin wrapper — configures GenericTable for row-selection mode.
 * Contains zero table rendering logic.
 */
export default function SelectionTable({ data, isLoading }: Props) {
  const columns = useUserColumns();
  const filterControls = useUserFilterControls();

  return (
    <GenericTable
      data={data}
      columns={columns}
      getRowId={(u) => u.id}
      mode="selection"
      isLoading={isLoading}
      filterFn={applyFilters}
      defaultFilters={USER_DEFAULT_FILTERS}
      filterControls={filterControls}
      renderRowActions={(u) => <UserRowActions user={u} />}
    />
  );
}
