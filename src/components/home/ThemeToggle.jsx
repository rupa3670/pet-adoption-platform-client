"use client";

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from '@gravity-ui/icons';

const ThemeToggle = () => {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-rose-50 dark:bg-zinc-800 text-rose-500 hover:bg-rose-100 dark:hover:bg-zinc-700 transition-colors"
            aria-label="Toggle theme"
        >
            {resolvedTheme === "dark" ? <Sun width={18} height={18} /> : <Moon width={18} height={18} />}
        </button>
    );
};

export default ThemeToggle;