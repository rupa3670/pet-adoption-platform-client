import { Heart, ShieldCheck, ShieldExclamation, Star } from '@gravity-ui/icons';
import { Card } from '@heroui/react';
import React from 'react';

const PetCare = () => {
    return (
       <section className='bg-white dark:bg-zinc-950 border-[#fbf9f6] dark:border-zinc-900 py-8 px-6 transition-colors duration-300 '>
    <div className='max-w-4xl mx-auto'>
<h1 className='text-4xl font-extrabold text-center text-[#2d2d2d] dark:text-zinc-100 mb-1 transition-colors duration-300'>Pet Care Tips</h1>
<p className='text-center text-gray-500 dark:text-zinc-400 mb-10 text-lg'>Quick wellness guidelines from veterinary experts</p>
<div className='grid grid-cols-1 md:grid-cols3 gap-6'>
    <Card className='bg-[#fbf9f6] dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-4 text-left flex flex-col justify-between h-36 shadow-sm hover:shadow-md transition-all duration-300' >
    <div className='space-y-1.5'>
    <div className='flex items-center gap-2 font-bold text-lg  text-gray-800 dark:text-zinc-200'>
     <Heart width={14} height={14} className='text-rose-500 dark:text-rose-400'/>
     Balanced Diet
    </div>
    <p className='text-gray-500 dark:text-zinc-400  leading-relaxed line-clamp-3'>Always serve age-appropriate food. Limit human treats as elements like chocolate and onions are highly toxic</p>

    </div>

    </Card>
    <Card className='bg-[#fbf9f6] dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-4 text-left flex flex-col justify-between h-36 shadow-sm hover:shadow-md transition-all duration-300' >
    <div className='space-y-1.5'>
    <div className='flex items-center gap-2 font-bold text-lg  text-gray-800 dark:text-zinc-200'>
     <Star width={14} height={14} className='text-rose-500 dark:text-rose-400'/>
     Daily Exercise
    </div>
    <p className='text-gray-500 dark:text-zinc-400 leading-relaxed line-clamp-3'>Ensure Fresh drinking water is always available. Spend at least 15-30 minutes daily on physical playtime</p>

    </div>

    </Card>
    <Card className='bg-[#fbf9f6] dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-4 text-left flex flex-col justify-between h-36 shadow-sm hover:shadow-md transition-all duration-300' >
    <div className='space-y-1.5'>
    <div className='flex items-center gap-2 font-bold text-lg  text-gray-800 dark:text-zinc-200'>
     <ShieldCheck width={14} height={14} className='text-rose-500 dark:text-rose-400'/>
     Routine Healthcare
    </div>
    <p className='text-gray-500 dark:text-zinc-400 leading-relaxed line-clamp-3'>De-worming every 3 months and annual core vaccinations are mandatory to prevent deadly infections. </p>

    </div>

    </Card>
</div>
    </div>
       </section>
    );
};

export default PetCare;