'use client';

import { useState, useMemo } from 'react';
import type { TableFilters } from '@/shared/types/table';

type Options<T> = {
  data: T[];
  filterFn: (data: T[], filters: TableFilters) => T[];
  defaultFilters: TableFilters;
  defaultPageSize?: number;
};

export type TableStateReturn<T> = {
  // ── filters
  filters: TableFilters;
  handleFilterChange: (f: TableFilters) => void;
  // ── pagination
  page: number;
  pageSize: number;
  setPage: (p: number) => void;
  setPageSize: (s: number) => void;
  // ── derived slices
  filtered: T[];
  pageData: T[];
  // ── row selection
  selected: Set<string>;
  toggleRow: (id: string) => void;
  setPageSelection: (ids: string[], checked: boolean) => void;
  // ── row expansion
  expanded: Set<string>;
  toggleExpand: (id: string) => void;
};

/**
 * Central state hook consumed exclusively by GenericTable.
 * Owns filter state, pagination, row selection and row expansion.
 * filterFn must be a stable reference (module-level function or useCallback).
 */
export function useTableState<T>({
  data,
  filterFn,
  defaultFilters,
  defaultPageSize = 10,
}: Options<T>): TableStateReturn<T> {
  const [filters, setFilters] = useState<TableFilters>(defaultFilters);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => filterFn(data, filters), [data, filterFn, filters]);

  const pageData = useMemo(
    () => pageSize === 0 ? filtered : filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page, pageSize],
  );

  const handleFilterChange = (f: TableFilters) => { setFilters(f); setPage(1); };

  const toggleRow = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const setPageSelection = (ids: string[], checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) ids.forEach((id) => next.add(id));
      else ids.forEach((id) => next.delete(id));
      return next;
    });
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) => new Set(prev.has(id) ? [] : [id]));
  };

  return {
    filters, handleFilterChange,
    page, pageSize, setPage, setPageSize,
    filtered, pageData,
    selected, toggleRow, setPageSelection,
    expanded, toggleExpand,
  };
}
