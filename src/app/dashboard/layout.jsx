'use client'
import { authClient } from '@/lib/auth-client';
import { ArrowRightFromSquare, House, ListCheck, ListUl, Plus } from '@gravity-ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const navItems = [
        { name:'Overview', href:'/dashboard',icon:House
        },
         { name:'Add Pet', href:'/dashboard/add-pet',icon:Plus
        },
         { name:'My Listings', href:'/dashboard/my-listing',icon:ListUl
        },
         { name:'My Requests', href:'/dashboard/my-requests',icon:ListCheck
        },
    ]
const DashboardLayout = ({session,children}) => {
    const pathname = usePathname();
    const router = useRouter();
    const handleSignOut = async ()=>{
        await authClient.signOut({
            fetchOptions:{
                onSuccess:()=>router.push('/login'),
            },
        });
    };
    return (
        <div className='flex min-h-screen bg-white'>
        <aside className='w-64 shrink-0 hidden md:flex  flex-col bg-[#fbf9f6] border-r border-gray-100 min-h-screen py-8 px-5 '>
            <div className='flex items-center gap-3 px-2 mb-8'>
                <div className='relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-rose-100 shrink-0'>
                    {session?.user?.image?(
                        <Image src={session.user.image} alt={session.user.name} fill
                        className='object-cover'
                        />

                    ):(
    <span className='w-full h-full flex items-center justify-center bg-rose-50 text-rose-500 text-sm font-bold'>
 {session?.user?.name?.[0]?.toUpperCase() || 'U'}
 </span>
                    )}

                </div>
<div className='min-w-0'>
  <p className='text-sm font-bold text-[#2d2d2d] leading-tight truncate'>{session?.user?.name}</p>
  <p className='text-[11px] text-gray-400 truncate'>{session?.user?.email}</p>
</div>
 </div>
 <span className='px-2 mb-3 text-[11px] font-bold tracking-widest text-gray-500 uppercase'>Dashboard</span>
  <nav className='flex flex-col gap-0.5'>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`relative flex items-center gap-3 pl-4 pr-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                isActive
                                    ? 'bg-rose-50 text-rose-600'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-[#2d2d2d]'
                            }`}
                        >
                            {isActive && (
                                <span className='absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-rose-500' />
                            )}
                            <Icon width={17} height={17} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className='mt-auto pt-4 border-t border-gray-100'>
                <button
                    onClick={handleSignOut}
                    className='w-full flex items-center gap-3 pl-4 pr-3 py-2.5 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-rose-600 transition-colors'
                >
                    <ArrowRightFromSquare width={17} height={17} />
                    Log out
                </button>
            </div>

        </aside>
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;