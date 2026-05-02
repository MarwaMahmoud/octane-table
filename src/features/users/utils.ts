import type { User } from './types';
import type { TableFilters } from '@/shared/types/table';

export function applyFilters(users: User[], filters: TableFilters): User[] {
  return users.filter((u) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q) && !u.id.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (filters.role && filters.role !== 'all' && u.role !== filters.role) return false;
    if (filters.status && filters.status !== 'all' && u.subscription !== filters.status) return false;
    if (filters.joinedFrom && u.joinedDate < filters.joinedFrom) return false;
    if (filters.joinedTo && u.joinedDate > filters.joinedTo) return false;
    return true;
  });
}

export function formatDate(iso: string, locale: string): string {
  return new Date(iso).toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatCurrency(amount: number, locale: string): string {
  return amount.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
