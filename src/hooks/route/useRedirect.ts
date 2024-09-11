'use client';
import { useRouter } from 'next-nprogress-bar';
import { useCallback } from 'react';

export const useRedirect = () => {
  const router = useRouter();
  const redirectToUrl = useCallback((url: string, isReplace = false) => {
    if (isReplace) {
      router.replace(url);
    } else {
      router.push(url);
    }
  }, []);

  return {
    redirectToUrl
  };
};
