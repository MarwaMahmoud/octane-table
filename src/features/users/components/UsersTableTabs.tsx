'use client';

import { useTranslations } from 'next-intl';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useTableQuery } from '@/shared/hooks/useTableQuery';
import { Table2, Rows3 } from 'lucide-react';
import SelectionTable from './SelectionTable';
import ExpandableTable from './ExpandableTable';
import type { User } from '../types';

export default function UsersTableTabs() {
  const t = useTranslations('nav');
  const { data, isLoading } = useTableQuery<User>('/api/users');

  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm">
      <Tabs defaultValue="selection" className="w-full">

        {/* Premium Header Zone */}
        <div className="flex items-center justify-center border-b border-border/60 px-6 py-4 bg-muted/20">
          <TabsList className="h-11 rounded-xl bg-muted p-1 gap-1">
            <TabsTrigger
              value="selection"
              className="flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium text-muted-foreground transition-all data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              <Table2 className="h-4 w-4" />
              {t('usersSelection')}
            </TabsTrigger>

            <TabsTrigger
              value="expandable"
              className="flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium text-muted-foreground transition-all data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              <Rows3 className="h-4 w-4" />
              {t('usersExpandable')}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="selection" className="mt-0">
          <SelectionTable data={data} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="expandable" className="mt-0">
          <ExpandableTable data={data} isLoading={isLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
}