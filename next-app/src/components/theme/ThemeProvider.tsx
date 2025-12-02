'use client';

import { PropsWithChildren, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { initializeTheme, toggleTheme } from '@/features/ui/uiSlice';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.ui.theme);

  useEffect(() => {
    // Initialize theme from localStorage on mount
    dispatch(initializeTheme());
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggle: () => dispatch(toggleTheme()),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
