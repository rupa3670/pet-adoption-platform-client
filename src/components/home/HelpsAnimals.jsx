import Image from 'next/image';
import React from 'react';

const HelpsAnimals = () => {
    return (
        <section className='bg-[#fbf9f6] py-16 px-6 overflow-hidden relative w-full rounded-3xl'>
            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center'>
                
                
                <div className='col-span-12 md:col-span-3 flex justify-center md:justify-start'>
                   
                    <div className='relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 shrink-0'>
                        <Image
                            src='/assets/dog2.png'
                            alt='baby dog'
                            fill
                            className='object-contain object-bottom'
                            priority
                        />
                    </div>
                </div>

               
                <div className='col-span-12 md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left space-y-3 px-2'>
                    <h2 className='text-3xl md:text-4xl font-extrabold text-[#2d2d2d] tracking-tight leading-tight text-center mb-3'>
                        Help Animals Affected by Human Actions
                    </h2>
                    <p className='text-sm text-gray-600 leading-relaxed font-medium max-w-xl text-center'>
                        Every day, countless street animals face hunger, accidents, and cruelty. Your small contribution can provide life-saving medical care, warm shelter, and daily meals to these innocent souls. Lets give them the love and protection they truly deserve.
                    </p>
                </div>

                
                <div className='col-span-12 md:col-span-3 flex justify-center md:justify-end'>
                    <div className='relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-80 lg:h-80  shrink-0'>
                        <Image 
                            src="/assets/babyGirl.png" 
                            alt="baby girl" 
                            fill 
                            className='object-contain object-bottom'
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HelpsAnimals;