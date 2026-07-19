"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children, onClick }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            onClick={onClick}
            className={`transition-colors py-1 block ${
                isActive
                    ? "text-rose-500 font-bold border-b-2 border-rose-500"
                    : "text-zinc-600 dark:text-zinc-300 hover:text-rose-500 font-medium"
            }`}
        >
            {children}
        </Link>
    );
};

export default NavLink;