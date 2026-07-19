"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { usePathname, useRouter } from 'next/navigation';
import { Bars, CaretDown, Xmark } from '@gravity-ui/icons';
import { Button } from '@heroui/react';
import NavLink from '@/components/NavLink';

const Navbar = () => {
    const router = useRouter();
    const pathName = usePathname();
    const { data: session, isPending } = authClient.useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);
 
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    setIsOpen(false);
                    setIsMobileMenuOpen(false);
                    router.push('/login');
                    router.refresh();
                },
            },
        });
    };

    const isActive = (path)=> pathName === path;

    return (
        <nav className=' fixed top-0 left-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 z-50'>
            <div className='flex justify-between items-center p-4 px-6 md:px-12'>
                
                <div className='flex items-center gap-4'>
                    <Button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-1 min-w-0 h-auto bg-transparent text-zinc-600 dark:text-zinc-300 focus:outline-none"
                    >
                        {isMobileMenuOpen ? <Xmark width={24} height={24}/> : <Bars width={24} height={24}/>} 
                    </Button>

                    <Link href={'/'} className='flex items-center gap-2'>
                        <Image src={'/assets/logo.jpg'} height={35} width={35} alt='Logo' className='rounded-full' />
                        <span className='font-bold text-xl text-rose-500'>Pet Adoption</span>
                    </Link>
                </div>

                <ul className='hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-300'>
<li><NavLink href={'/'} className='hover:text-rose-500 transition-colors'>Home</NavLink></li>
 <li><NavLink href={'/all-pets'} className='hover:text-rose-500 transition-colors'>All Pets</NavLink></li>
                    
 {session && (
                        <>
    <li><NavLink href={'/my-requests'} className='hover:text-rose-500 transition-colors'>My Requests</NavLink></li>
                            <li><NavLink href={'/add-pet'} className='hover:text-rose-500 transition-colors'>Add Pet</NavLink></li>
                        </>
                    )}
                </ul>

                <div className='relative' ref={dropdownRef}>
                    {isPending ? (
                        <div className="h-9 w-24 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-lg" />
                    ) : session ? (
                        <div>
                            <button 
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100 hover:bg-rose-100 transition-all focus:outline-none"
                            >
                                <span className="text-sm font-bold text-rose-600">{session.user.name}</span>
                                <span className="text-xs text-rose-400 flex items-center justify-center"><CaretDown width={14} height={14} /></span>
                            </button>

                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-44 bg-slate-50 dark:bg-zinc-900 border border-rose-100 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50 py-1">
                                    <Link 
                                        href="/dashboard" 
                                        onClick={() => setIsOpen(false)} 
                                        className="block px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-rose-50 dark:hover:bg-zinc-800 hover:text-rose-600 transition"
                                    >
                                        Dashboard
                                    </Link>
                                    <button 
                                        onClick={handleSignOut}
                                        className="block w-full text-left px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/35 transition"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href={'/login'} className='bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all'>
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {isMobileMenuOpen && (
                <div 
                    ref={mobileMenuRef} 
                    className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 shadow-lg py-4 px-6 z-40"
                >
                    <ul className="flex flex-col gap-4 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                        <li>
                            <NavLink href={'/'} onClick={() => setIsMobileMenuOpen(false)} className='block hover:text-rose-500 py-1'>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink href={'/all-pets'} onClick={() => setIsMobileMenuOpen(false)} className='block hover:text-rose-500 py-1'>
                                All Pets
                            </NavLink>
                        </li>
                        
                        {session && (
                            <>
                                <li>
                                    <NavLink href={'/my-requests'} onClick={() => setIsMobileMenuOpen(false)} className='block hover:text-rose-500 py-1'>
                                        My Requests
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink href={'/add-pet'} onClick={() => setIsMobileMenuOpen(false)} className='block hover:text-rose-500 py-1'>
                                        Add Pet
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;