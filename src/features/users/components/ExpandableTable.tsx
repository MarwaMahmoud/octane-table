'use client';

import GenericTable from '@/shared/components/table/GenericTable';
import { useUserColumns } from '../columns';
import { useUserFilterControls, USER_DEFAULT_FILTERS } from '../filter-controls';
import { applyFilters } from '../utils';
import UserRowActions from '../row-actions';
import UserExpandedContent from '../expanded-content';
import type { User } from '../types';

type Props = { data: User[]; isLoading?: boolean };

/**
 * Thin wrapper — configures GenericTable for expandable-rows mode.
 * Contains zero table rendering logic.
 */
export default function ExpandableTable({ data, isLoading }: Props) {
  const columns = useUserColumns();
  const filterControls = useUserFilterControls();

  return (
    <GenericTable
      data={data}
      columns={columns}
      getRowId={(u) => u.id}
      mode="expandable"
      isLoading={isLoading}
      filterFn={applyFilters}
      defaultFilters={USER_DEFAULT_FILTERS}
      filterControls={filterControls}
      canExpand={(u) => u.linkedEntities.length > 0}
      renderExpandedContent={(u) => <UserExpandedContent user={u} />}
      renderRowActions={(u) => <UserRowActions user={u} />}
    />
  );
}
