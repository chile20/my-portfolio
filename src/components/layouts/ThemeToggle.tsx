'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils/cn';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800">
      <button
        onClick={() => setTheme('light')}
        className={cn(
          'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          theme === 'light' 
            ? 'bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-300' 
            : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'
        )}
      >
        <Sun className="h-4 w-4" />
        <span>Light</span>
      </button>
      
      <button
        onClick={() => setTheme('dark')}
        className={cn(
          'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          theme === 'dark' 
            ? 'bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-300' 
            : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'
        )}
      >
        <Moon className="h-4 w-4" />
        <span>Dark</span>
      </button>
    </div>
  );
}

export function ThemeToggleCompact() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-lg p-2.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </button>
  );
}