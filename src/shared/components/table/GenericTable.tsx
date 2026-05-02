'use client';

import { Fragment } from 'react';
import { ChevronRight, Inbox, Loader2 } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { isRTL, type Locale } from '@/i18n/config';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTableState } from '@/shared/hooks/useTableState';
import TableToolbar from './TableToolbar';
import TablePagination from './TablePagination';
import type { GenericTableProps } from '@/shared/types/table';

/**
 * GenericTable<T> — the single table engine.
 *
 * Owns all state (filters, pagination, selection, expansion).
 * Renders toolbar, column headers, rows, empty state, and pagination.
 * Has zero knowledge of any domain model — all shape comes from props.
 *
 * Feature wrappers (SelectionTable, ExpandableTable) are pure configuration:
 * they supply columns, filterControls, filterFn, and render callbacks.
 */
export default function GenericTable<T>({
  data,
  columns,
  getRowId,
  mode,
  isLoading = false,
  emptyMessage,
  filterFn,
  defaultFilters,
  filterControls,
  renderRowActions,
  renderExpandedContent,
  canExpand,
}: GenericTableProps<T>) {
  const t = useTranslations('table');
  const tc = useTranslations('common');
  const locale = useLocale();
  const rtl = isRTL(locale as Locale);

  const {
    filters, handleFilterChange,
    page, pageSize, setPage, setPageSize,
    filtered, pageData,
    selected, toggleRow, setPageSelection,
    expanded, toggleExpand,
  } = useTableState({ data, filterFn, defaultFilters });

  // ── Selection helpers (only used when mode === 'selection') ───────────────
  const pageIds = pageData.map(getRowId);
  const allOnPageSelected = pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  const someOnPageSelected = !allOnPageSelected && pageIds.some((id) => selected.has(id));
  const handleToggleAll = () => setPageSelection(pageIds, !allOnPageSelected);

  // ── Column span for empty / loading rows ──────────────────────────────────
  // leading column (checkbox or expand toggle) + data columns + optional actions column
  const totalColumns = 1 + columns.length + (renderRowActions ? 1 : 0);

  return (
    <div>
      <TableToolbar filters={filters} onChange={handleFilterChange} controls={filterControls} />

      <Table dir={rtl ? 'rtl' : 'ltr'}>
        <TableHeader className="bg-muted/50">
          <TableRow>
            {/* Leading column */}
            <TableHead className="w-10">
              {mode === 'selection' && (
                <Checkbox
                  checked={allOnPageSelected ? true : someOnPageSelected ? 'indeterminate' : false}
                  onCheckedChange={handleToggleAll}
                  aria-label={allOnPageSelected ? t('deselectAll') : t('selectAll')}
                />
              )}
            </TableHead>

            {columns.map((col) => (
              <TableHead key={col.key} className={col.headerClassName}>
                {col.header}
              </TableHead>
            ))}

            {renderRowActions && <TableHead className="w-10" />}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={totalColumns} className="py-16 text-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="text-sm">{tc('loading')}</span>
                </div>
              </TableCell>
            </TableRow>
          ) : pageData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={totalColumns} className="py-16 text-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Inbox className="h-10 w-10 opacity-30" />
                  <span className="text-sm">{emptyMessage ?? tc('noResults')}</span>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            pageData.map((row) => {
              const id = getRowId(row);
              const isSelected = mode === 'selection' && selected.has(id);
              const isExpanded = mode === 'expandable' && expanded.has(id);
              const expandable =
                mode === 'expandable' &&
                renderExpandedContent !== undefined &&
                (canExpand ? canExpand(row) : true);

              return (
                <Fragment key={id}>
                  <TableRow
                    data-state={isSelected ? 'selected' : undefined}
                    aria-expanded={mode === 'expandable' ? isExpanded : undefined}
                  >
                    {/* Leading cell */}
                    <TableCell>
                      {mode === 'selection' && (
                        <Checkbox
                          checked={selected.has(id)}
                          onCheckedChange={() => toggleRow(id)}
                          aria-label={`Select row ${id}`}
                        />
                      )}
                      {mode === 'expandable' && expandable && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => toggleExpand(id)}
                          aria-label={isExpanded ? t('collapseRow') : t('expandRow')}
                        >
                          <ChevronRight className={cn('h-4 w-4 transition-transform duration-200', isExpanded ? 'rotate-90' : rtl && 'rotate-180')} />
                        </Button>
                      )}
                    </TableCell>

                    {columns.map((col) => (
                      <TableCell key={col.key} className={col.className}>
                        {col.render(row)}
                      </TableCell>
                    ))}

                    {renderRowActions && (
                      <TableCell>{renderRowActions(row)}</TableCell>
                    )}
                  </TableRow>

                  {/* Expanded sub-row */}
                  {mode === 'expandable' && isExpanded && renderExpandedContent && (
                    <TableRow className="bg-muted/30 hover:bg-muted/30 animate-in fade-in-0 duration-200">
                      {/* empty leading cell to match the toggle column */}
                      <TableCell />
                      <TableCell
                        colSpan={columns.length + (renderRowActions ? 1 : 0)}
                        className="p-0"
                      >
                        {renderExpandedContent(row)}
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })
          )}
        </TableBody>
      </Table>

      <TablePagination
        total={filtered.length}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
      />
    </div>
  );
}
