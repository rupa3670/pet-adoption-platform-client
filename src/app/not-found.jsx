import Link from 'next/link';
import React from 'react';

const NotFound= () => {
    return (
         <div className='min-h-screen flex flex-col items-center justify-center text-center px-6 bg-rose-100 gap-4'>
            <h1 className='text-8xl font-extrabold text-rose-500'>404</h1>
            <h2 className='text-2xl font-bold text-[#2d2d2d]'>Oops! This page ran away like a playful pup</h2>
            <p className='text-gray-500 max-w-md'>
                We could not find the page you are looking for. It might have been moved, adopted, or never existed.
            </p>
            <Link
                href='/'
                className='mt-2 px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold shadow-md transition-colors'
            >
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound