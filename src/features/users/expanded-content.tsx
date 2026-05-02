'use client';

import { useTranslations } from 'next-intl';
import type { User } from './types';

/**
 * Renders the expanded sub-row for a User in the Expandable table variant.
 * Passed as renderExpandedContent={(u) => <UserExpandedContent user={u} />}.
 */
export default function UserExpandedContent({ user }: { user: User }) {
  const t = useTranslations('users.expandable');

  return (
    <div className="px-6 py-4">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-start pb-2.5 pe-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{t('linkedEntities')}</th>
            <th className="text-start pb-2.5 pe-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{t('linkedEmails')}</th>
            <th className="text-start pb-2.5 pe-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{t('usageQueries')}</th>
            <th className="text-start pb-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{t('lastActiveInEntity')}</th>
          </tr>
        </thead>
        <tbody>
          {user.linkedEntities.map((entity, i) => (
            <tr key={i} className="border-t border-border/30 transition-colors hover:bg-muted/20">
              <td className="py-2 pe-4">{entity.entity}</td>
              <td className="py-2 pe-4 text-muted-foreground">{entity.linkedEmail}</td>
              <td className="py-2 pe-4">{entity.usageQueries.toLocaleString()}</td>
              <td className="py-2 text-muted-foreground">{entity.lastActiveInEntity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
