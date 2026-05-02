import type { ReactNode } from 'react';

// ─── Column Definition ────────────────────────────────────────────────────────

export type ColumnDef<T> = {
  key: string;
  header: string;
  className?: string;
  headerClassName?: string;
  render: (row: T) => ReactNode;
};

// ─── Filter Controls ──────────────────────────────────────────────────────────

export type SelectOption = { value: string; label: string };

export type FilterControl =
  | { type: 'search'; key: 'search'; placeholder?: string }
  | { type: 'select'; key: string; label: string; options: SelectOption[] }
  | {
      type: 'date-range';
      fromKey: string;
      toKey: string;
      fromLabel?: string;
      toLabel?: string;
    };

// ─── Filter State ─────────────────────────────────────────────────────────────

/** Flat string map so any feature can extend with its own filter keys. */
export type TableFilters = Record<string, string>;

// ─── GenericTable Props ───────────────────────────────────────────────────────

export type TableMode = 'selection' | 'expandable';

export type GenericTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  getRowId: (row: T) => string;
  mode: TableMode;

  /** Passed from the feature layer; used by the engine for client-side filtering. */
  filterFn: (data: T[], filters: TableFilters) => T[];
  defaultFilters: TableFilters;
  filterControls: FilterControl[];

  /** Optional: override the "no results" message. */
  emptyMessage?: string;

  /** Optional: show loading skeleton while data is being fetched. */
  isLoading?: boolean;

  /** Optional: render a dropdown/action menu for each row. */
  renderRowActions?: (row: T) => ReactNode;

  /** expandable mode — render the expanded sub-row content. */
  renderExpandedContent?: (row: T) => ReactNode;

  /** expandable mode — control whether a row shows the expand toggle. */
  canExpand?: (row: T) => boolean;
};
