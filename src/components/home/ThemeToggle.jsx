"use client";

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from '@gravity-ui/icons';
import { motion, AnimatePresence } from 'motion/react';

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
            className="relative p-2 rounded-full bg-rose-50 dark:bg-zinc-800 text-rose-500 hover:bg-rose-100 dark:hover:bg-zinc-700 transition-colors overflow-hidden"
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={resolvedTheme}
                    initial={{ y: -15, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 15, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    {resolvedTheme === "dark" ? (
                        <Sun width={18} height={18} />
                    ) : (
                        <Moon width={18} height={18} />
                    )}
                </motion.div>
            </AnimatePresence>
        </button>
    );
};

export default ThemeToggle;