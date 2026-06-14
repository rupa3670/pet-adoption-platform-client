"use client"; 

import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className='flex justify-between items-center bg-white/80 dark:bg-zinc-950/80 text-zinc-800 dark:text-zinc-100 p-4 border-b border-zinc-100 dark:border-zinc-900 sticky top-0 z-50 backdrop-blur-md shadow-sm px-6 md:px-12 transition-colors duration-300'>
            
            <div className='flex items-center'>
                <Link href={'/'} className='flex items-center gap-2.5 group'>
                    <div className='bg-rose-50/60 dark:bg-rose-950/20 p-2 rounded-xl transition-all duration-300 group-hover:scale-105'>
                        <Image
                            src={'/assets/logo.jpg'} 
                            height={32}
                            width={32}
                            alt='pet Logo'
                            className='object-contain'
                        />
                    </div>
                    <span className='font-bold text-xl tracking-tight text-rose-500 dark:text-rose-400 font-sans'>
                        Pet Adoption
                    </span>
                </Link>
            </div>

            <ul className='hidden md:flex items-center gap-8 font-medium text-zinc-500 dark:text-zinc-400 text-sm md:text-base'>
                <li>
                    <Link href={'/'} className='hover:text-rose-500 dark:hover:text-rose-400 transition-colors duration-200'>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href={'/all-pets'} className='hover:text-rose-500 dark:hover:text-rose-400 transition-colors duration-200'>
                        All Pets
                    </Link>
                </li>
                <li>
                    <Link href={'/my-requests'} className='hover:text-rose-500 dark:hover:text-rose-400 transition-colors duration-200'>
                       My Requests
                    </Link>
                </li>
                <li>
                    <Link href={'/add-pet'} className='hover:text-rose-500 dark:hover:text-rose-400 transition-colors duration-200'>
                        Add Pet
                    </Link>
                </li>
            </ul>

            <div className='flex items-center gap-4'>
                <Link href={'/login'}>
                    <button className='bg-rose-500 hover:bg-rose-600 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 text-white dark:text-rose-400 px-6 py-2 rounded-xl font-semibold transition-all duration-200 text-sm md:text-base active:scale-95 shadow-sm shadow-rose-500/10'>
                        Login
                    </button>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;