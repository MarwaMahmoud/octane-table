'use client';

import { useState, useEffect } from 'react';

export type QueryResult<T> = {
  data: T[];
  isLoading: boolean;
  error: Error | null;
};

/**
 * Generic fetch hook for table data.
 * Cancels in-flight requests on URL change or unmount.
 */
export function useTableQuery<T>(url: string): QueryResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res.json() as Promise<T[]>;
      })
      .then((json) => {
        if (!cancelled) { setData(json); setIsLoading(false); }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setIsLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [url]);

  return { data, isLoading, error };
}
