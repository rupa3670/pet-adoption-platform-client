"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { CaretDown } from '@gravity-ui/icons';

const Navbar = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const [isOpen, setIsOpen] = useState(false);

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    setIsOpen(false);
                    router.push('/login');
                    router.refresh();
                },
            },
        });
    };

    return (
        <nav className='flex justify-between items-center bg-rose-50 dark:bg-zinc-950 p-4 border-b border-zinc-200 dark:border-zinc-800 px-6 md:px-12'>
            
            
            <div className='flex items-center'>
                <Link href={'/'} className='flex items-center gap-2'>
                    <Image src={'/assets/logo.jpg'} height={35} width={35} alt='Logo' className='rounded-full' />
                    <span className='font-bold text-xl text-rose-500'>Pet Adoption</span>
                </Link>
            </div>

            
            <ul className='hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600'>
                <li><Link href={'/'} className='hover:text-rose-500'>Home</Link></li>
                <li><Link href={'/all-pets'} className='hover:text-rose-500'>All Pets</Link></li>
                 <li><Link href={'/my-requests'} className='hover:text-rose-500'>My Requests</Link></li>
                  <li><Link href={'/add-pet'} className='hover:text-rose-500'>Add Pet</Link></li>
            </ul>

         
            <div className='relative'>
                {isPending ? (
                    <div className="h-9 w-24 bg-zinc-100 animate-pulse rounded-lg" />
                ) : session ? (
                    <div>
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100 hover:bg-rose-100 transition-all"
                        >
                           
                            <span className="text-sm font-bold text-rose-600">{session.user.name}</span>
                            <span className="text-xs text-rose-400"><CaretDown/></span>
                        </button>

                        
                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border border-zinc-100 rounded-xl shadow-xl overflow-hidden z-50">
                                <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-rose-50 hover:text-rose-600 transition">Dashboard</Link>
                                <button 
                                    onClick={handleSignOut}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link href={'/login'} className='bg-rose-500 text-white px-5 py-2 rounded-xl text-sm font-semibold'>
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;