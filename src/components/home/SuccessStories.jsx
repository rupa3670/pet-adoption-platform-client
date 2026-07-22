import { Card } from '@heroui/react';
import Image from 'next/image';
import React from 'react';

const SuccessStories = () => {
    return (
        <section className='bg-[#fbf9f6] py-10 px-6 mt-20'>
            <div className='max-w-4xl mx-auto'>
<h1 className='text-4xl font-extrabold text-center text-[#2d2d2d] mb-1'>Success Stories</h1>
<p className='text-center text-gray-500 mb-10 text-lg'>Real updates from happy pet families.</p>
            </div>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
<Card className='border-none bg-[#f3eee7] p-3 rounded-xl flex flex-row gap-4 items-center shadow-sm h-28 hover:shadow-md transition-shadow'>
    <div className='relative w-20 h-20 shrink-0 rounded-lg overflow-hidden'>
        <Image
        src="/assets/cat.jpg"
        alt='Milo'
        fill
        className='object-cover'
        />
        </div>
<div className='text-left flex-grow min-w-0'>
    <h3 className='text-sm font-bold text-[#e47969]'>Milo & Family</h3>
<p className='text-xs text-gray-600 line-clamp-2 mt-0.5 leading-relaxed'>
 Milo became the heartbeat of our home. He plays fetch with our kids every single evening.
</p>
 <span className='text-[10px] font-semibold text-gray-400 block mt-1 uppercase'>Mirpur, Dhaka</span>

</div>
    

</Card>
<Card className='border-none bg-[#f3eee7] p-3 rounded-xl flex flex-row gap-4 items-center shadow-sm h-28 hover:shadow-md transition-shadow'>
    <div className='relative w-20 h-20 shrink-0 rounded-lg overflow-hidden'>
        <Image
        src="/assets/rabbit.jpg"
        alt='Casper'
        fill
        className='object-cover'
        />
        </div>
<div className='text-left flex-grow min-w-0'>
    <h3 className='text-sm font-bold text-[#e47969]'>Casper and peace</h3>
<p className='text-xs text-gray-600 line-clamp-2 mt-0.5 leading-relaxed'>
 Today, he is a gorgeous, calm companion who spends his mornings purring by the window.
</p>
 <span className='text-[10px] font-semibold text-gray-400 block mt-1 uppercase'>Chittagong</span>

</div>
    

</Card>

<Card className='border-none bg-[#f3eee7] p-3 rounded-xl flex flex-row gap-4 items-center shadow-sm h-28 hover:shadow-md transition-shadow'>
    <div className='relative w-20 h-20 shrink-0 rounded-lg overflow-hidden'>
        <Image
        src="/assets/dog.jpg"
        alt='Rocky'
        fill
        className='object-cover'
        />
        </div>
<div className='text-left flex-grow min-w-0'>
    <h3 className='text-sm font-bold text-[#e47969]'>Rocky & Family</h3>
<p className='text-xs text-gray-600 line-clamp-2 mt-0.5 leading-relaxed'>
Rocky was found abandoned in the rain. After being adopted, he has grown into a strong, loving guard dog who loves evening walks with us.
</p>
 <span className='text-[10px] font-semibold text-gray-400 block mt-1 uppercase'>Uttara, Dhaka</span>

</div>
    

</Card>
    </div>
        </section>
    );
};

export default SuccessStories;