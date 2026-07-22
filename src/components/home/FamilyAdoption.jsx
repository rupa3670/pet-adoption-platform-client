import Image from 'next/image';
import React from 'react';

const FamilyAdoption = () => {
  
    return (
<section className='bg-[#e9eff1] py-12 px-6 rounded-3xl w-full'>
    <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
        <div className='relative w-full h-[280px] sm:h-[450px] rounded-2xl overflow-hidden shadow-sm'>
            <Image
            src='/assets/pet&family.jpg'
            alt='pet with family'
            fill className='object-cover rotate-90'
            priority
            />

        </div>
    <div className='space-y-6'>
        <div className='space-y-1 text-left'>
<p className='text-xs uppercase tracking-wider font-bold text-gray-600'>FAQ Questions</p>
<h2 className='text-2xl md:text-3xl font-extrabold tracking-tight leading-tight'>History & Family Adoption</h2>
        </div>
<div className='bg-white p-5 rounded-2xl border border-gray-100/50 shadow-sm'>
    <h3 className='text-base sm:text-lg font-bold mb-2'>Working for dog adoption</h3>
    <p className='text-xs
    sm:text-sm text-gray-500 leading-relaxed'>We connect loving families with rescue dogs, ensuring a seamless, joyful, and healthy transition into their new forever homes.</p>
</div>
<div className='bg-white p-5 rounded-2xl border border-gray-100/50 shadow-sm'>
    <h3 className='text-base sm:text-lg font-bold mb-2'>Competitions & Awards</h3>
    <p className='text-xs
    sm:text-sm text-gray-500 leading-relaxed'>Our adopted pets often participate in friendly community events, celebrating their amazing journey and happy new lives.</p>
</div>
<div className='bg-white p-5 rounded-2xl border border-gray-100/50 shadow-sm'>
    <h3 className='text-base sm:text-lg font-bold mb-2'>The puppies are 3 months old</h3>
    <p className='text-xs
    sm:text-sm text-gray-500 leading-relaxed'>At 3 months, our puppies receive their initial vaccinations, de-worming, and early socialization to get ready for adoption.</p>
</div>
    </div>

    </div>
</section>
    );
};

export default FamilyAdoption;