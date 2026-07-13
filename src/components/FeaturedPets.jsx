'use client'
import { Gear } from '@gravity-ui/icons';
import { Button, Calendar } from '@heroui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FiSettings, FiCalendar } from 'react-icons/fi';

const FeaturedPets = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/pets")
            .then((res) => res.json())
            .then((data) => setPets(data.slice(0, 6)))
            .catch((err) => console.error("Error fetch pets:", err));
    }, []);

    return (
      <div className='py-10 bg-base-100'>
        <h2 className='text-5xl font-extrabold text-center text-[#2d2d2d] mb-2'>Featured Pets</h2>
                <p className='text-center text-gray-500 mb-12  text-lg'>Meet our cute friends looking for a home</p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto'>
            {pets.map((pet)=>(
                <div key={pet._id} className='rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-[#EFEAE3]'> 
                <div className='relative w-full h-64'>
                    <Image
                src={pet.imageUrl}
                alt={pet.petName}
                fill
                sizes="(max-width:768px) 100vw, (max-width:1200px)50vw, 33vw"
                className='object-contain object-bottom p-4'
                />
                </div>
                <div className='bg-white rounded-t-2xl px-5 py-4 -mt-4 relative'>
                    <h3 className='text-lg font-bold text-rose-600 mb-2'>{pet.petName}</h3>
                    <div className='flex items-center justify-between text-sm text-gray-600'>
    <span className='flex items-center gap-1'> <Gear width={14} height={14} className='text-gray-400'/> {pet.breed}</span>
    <span className='flex items-center gap-1'><Calendar width={14} height={14} className='text-gray-400' /> Birth:{pet.age}</span>
                    </div>
     <Button className='w-full py-2 rounded-lg bg-rose-50 text-rose-600 font-medium hover:bg-rose-500 hover:text-white transition-colors duration-300'>
                                View Details
                            </Button>                
                </div>
                </div>
            ))}

        </div>
      </div>
    );
};

export default FeaturedPets;