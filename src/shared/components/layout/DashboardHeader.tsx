'use client';

import { useTranslations } from 'next-intl';
import { Plus, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardHeader() {
  const tUsers = useTranslations('users');
  const tTable = useTranslations('table');

  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{tUsers('title')}</h1>
        <p className="text-muted-foreground text-sm mt-1">{tUsers('subtitle')}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <Button size="sm">
          <Plus className="h-4 w-4 me-2" />
          {tTable('addNew')}
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 me-2" />
          {tTable('export')}
        </Button>
      </div>
    </div>
  );
}
