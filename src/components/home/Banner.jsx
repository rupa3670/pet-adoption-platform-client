import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BannerSection = () => {
    return (
        <section className='relative bg-[#fcf9f4] dark:bg-gray-900'>
            <div className='container mx-auto px-6 py-24 lg:py-32 grid lg:grid-cols-2 gap-12'>
                <div className='text-center lg:text-left'> 
                    <h1 className='text-4xl md:text-4xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6'>Find Your Perfect <span className='text-rose-400'> Furry Friend </span>Today</h1>
                    <p className='text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto lg:mx-0'>Thousands of lovable pets in shelters are waiting for a second chance.Give them a forever home and experience unconditional love. Start your adoption journey today.</p>

                    <div className='pt-4'>
                      <Link href='/all-pets' className='inline-block bg-rose-400 hover-rose-500 text-white font-semibold text-lg px-8 py-3 rounded-full shadow-md hover:shadow-lg '>Adopt Now</Link>
                    </div>
                </div>
            <div className='flex justify-center items-center'>
                <div className='relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-xl border-8 border-rose-50 dark:border-gray-800'>
                    <Image
                    src="/assets/hero.jpg"
                    alt="cute cat"
                    fill
                    className='object-cover'
                    priority
                    />

                    
                </div>
            </div>
            </div>
        </section>
    );
};

export default BannerSection;