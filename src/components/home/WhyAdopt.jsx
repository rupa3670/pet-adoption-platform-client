import { HeartFill, Persons, Shield, Star } from '@gravity-ui/icons';
import { Card } from '@heroui/react';
import React from 'react';
import { BiLeaf } from 'react-icons/bi';

const WhyAdopt = () => {
    return (
        <section className='bg-[#fbf9f6] dark:bg-zinc-950 py-16 px-6 transition-colors durations-300'>
            <div className='max-w-4xl mx-auto text-center'>
                <h1 className='text-4xl font-extrabold text-[#2d2d2d] dark:text-zinc-100 mb-4 transition-colors duration-300'>Why Adopt Pets?</h1>
                <p className='text-gray-500 dark:text-zinc-400 mb-16 max-w-2xl mx-auto text-base leading-relaxed transition-colors duration-300'>Adopting a pet is not just about bringing a furry friend home; it is a compassionate choice that saves lives, supports ethical communities, and brings unparalleled joy.</p>
         <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <Card className='p-8 border-none bg-white dark:bg-zinc-900 shadow-sm rounded-2xl text-left flex flex-col items-start gap-4 hover:shadow-md transition-all duration-300'>
                <div className='p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-[#e0533c] dark:text-rose-400'>
                    <HeartFill width={24} height={24} className='text-red-500'/>
                <h3 className='text-xl font-bold text-[#2d2d2d] dark:text-zinc-100'>Save a Life</h3>
                <p className='text-sm text-gray-500 dark:text-zinc-400 leading-relaxed'>
                            Every year, millions of animals end up in shelters. By adopting, you give a second chance to a deserving pet and open up space for another animal in critical need.
                        </p>
                </div>
            </Card>
            <Card className='p-8 border-none bg-white dark:bg-zinc-900 shadow-sm rounded-2xl text-left flex flex-col items-start gap-4 hover:shadow-md transition-all duration-300'>
                <div className='p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-[#e0533c] dark:text-rose-400'>
                   <Star width={24} height={24} /> 
                <h3 className='text-xl font-bold text-[#2d2d2d]    dark:text-zinc-100'>Unconditional Love</h3>
                        
              <p className='text-sm text-gray-500 dark:text-zinc-400 leading-relaxed'>
                            Rescued animals seem to understand they have been given a new lease on life. The loyalty, affection, and gratitude they display form an unbreakable bond.
                        </p>
                </div>
            </Card>
            <Card className='p-8 border-none bg-white dark:bg-zinc-900 shadow-sm rounded-2xl text-left flex flex-col items-start gap-4 hover:shadow-md transition-all duration-300'>
                <div className='p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-[#e0533c] dark:text-rose-400'>
                    <Shield  width={24} height={24}/> 
                 <h3 className='text-xl font-bold text-[#2d2d2d] dark:text-zinc-100'>Healthier & Trained</h3>
                <p className='text-sm text-gray-500  dark:text-zinc-400 leading-relaxed'>
                            Most shelter pets are already house-trained, behaviorally assessed, and thoroughly screened or vaccinated by professional veterinarians before adoption.
                        </p>
                </div>
            </Card>
            {/* <Card className='p-8 border-none bg-white shadow-sm rounded-2xl text-left flex flex-col items-start gap-4 hover:shadow-md transition-shadow'>
                        <div className='p-3  rounded-xl text-[#e0533c] hover:bg-rose-50'>
                     <BiLeaf width={24} height={24} />      
                       
                    <h3 className='text-xl font-bold text-[#2d2d2d]'>Support Sustainability</h3>
                <p className='text-sm text-gray-500 leading-relaxed'>
                    Adoption promotes responsible pet ownership. Using eco-friendly products and supporting green shelter initiatives helps reduce your pet is overall environmental footprint.
                </p>   
                 </div>       
                    </Card> */}

                    {/* <Card className='p-8 border-none bg-white shadow-sm rounded-2xl text-left flex flex-col items-start gap-4 hover:shadow-md transition-shadow'>
                        <div className='p-3  h-0.5rounded-xl text-[#e0533c] hover:bg-rose-50'>
                     <Persons width={24} height={24} />       
                       
                     <p className='text-sm text-gray-500 leading-relaxed'>
                    Become part of a larger network of passionate rescuers. Share advice, find local pet-friendly spots, and connect with other pet owners in your neighborhood.
                </p> 
                 </div> 
                    </Card> */}
            </div>       
            </div>
            
        </section>
    );
};

export default WhyAdopt;