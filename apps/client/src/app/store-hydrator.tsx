'use client';

import { useAuthStore } from '@/entities/user/model/store';
import { useEffect } from 'react';

export function StoreHydrator() {
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return null;
}
