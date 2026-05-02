'use client';

import { Search, RotateCcw } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { isRTL, type Locale } from '@/i18n/config';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { FilterControl, TableFilters } from '@/shared/types/table';

type Props = {
  filters: TableFilters;
  onChange: (filters: TableFilters) => void;
  controls: FilterControl[];
};

export default function TableToolbar({ filters, onChange, controls }: Props) {
  const t = useTranslations('table');
  const locale = useLocale();
  const rtl = isRTL(locale as Locale);
  const set = (patch: Partial<TableFilters>) => onChange({ ...filters, ...patch } as TableFilters);


  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-border" dir={rtl ? 'rtl' : 'ltr'}>
      {controls.map((ctrl) => {
        if (ctrl.type === 'search') {
          return (
            <div key="search" className="relative flex-1 min-w-48">
              <Search className="absolute start-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                className="ps-8"
                placeholder={ctrl.placeholder ?? t('search')}
                value={filters[ctrl.key] ?? ''}
                onChange={(e) => set({ [ctrl.key]: e.target.value })}
              />
            </div>
          );
        }

        if (ctrl.type === 'select') {
          return (
            <Select
              key={ctrl.key}
              value={filters[ctrl.key] ?? 'all'}
              onValueChange={(v) => set({ [ctrl.key]: v })}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder={ctrl.label} />
              </SelectTrigger>
              <SelectContent>
                {ctrl.options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }

        if (ctrl.type === 'date-range') {
          return (
            <div key={`${ctrl.fromKey}-${ctrl.toKey}`} className="flex items-center gap-1">
              <Input
                type="date"
                className="w-36"
                title={ctrl.fromLabel}
                value={filters[ctrl.fromKey] ?? ''}
                onChange={(e) => set({ [ctrl.fromKey]: e.target.value })}
              />
              <span className="text-muted-foreground text-sm">–</span>
              <Input
                type="date"
                className="w-36"
                title={ctrl.toLabel}
                value={filters[ctrl.toKey] ?? ''}
                onChange={(e) => set({ [ctrl.toKey]: e.target.value })}
              />
            </div>
          );
        }

        return null;
      })}

      <Button
        size="sm"
        variant="outline"
        className="ms-auto gap-1.5 border-dashed border-primary/40 text-primary hover:text-primary hover:border-primary hover:bg-primary/5"
        onClick={() => onChange(buildResetFilters(controls))}
      >
        <RotateCcw className="h-3.5 w-3.5" />
        {t('resetFilters')}
      </Button>
    </div>
  );
}

/** Derive the empty/reset state from the control config — no hardcoded keys. */
function buildResetFilters(controls: FilterControl[]): TableFilters {
  const defaults: TableFilters = {};
  for (const ctrl of controls) {
    if (ctrl.type === 'search') defaults[ctrl.key] = '';
    else if (ctrl.type === 'select') defaults[ctrl.key] = 'all';
    else if (ctrl.type === 'date-range') {
      defaults[ctrl.fromKey] = '';
      defaults[ctrl.toKey] = '';
    }
  }
  return defaults;
}
