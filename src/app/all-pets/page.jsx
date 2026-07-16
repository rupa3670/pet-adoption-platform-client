'use client'
import { authClient } from '@/lib/auth-client';
import { CalendarXmark, Gear, Magnifier, Xmark } from '@gravity-ui/icons';
import { Button } from '@heroui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const AllPetsPage = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const [pets, setPets] = useState([]);
    const [filteredPets, setFilteredPets] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        fetch("http://localhost:8000/pets")
            .then((res) => res.json())
            .then((data) => {
                setPets(data);
                setFilteredPets(data)
            })
            .catch((err) => console.error("Error fetch pets:", err));
        // toast.error("Failed to load pets")
    }, []);
 
    useEffect(()=>{
        let result = pets;

        if(activeCategory !=="All"){
            result = result.filter(pet =>
                pet.species?.toLowerCase() === activeCategory.toLocaleLowerCase()
            );
        }
    if(searchQuery.trim()!==""){
        result = result.filter(pet=>
            pet.petName?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
    }
    setFilteredPets(result);
    }, [searchQuery,activeCategory,pets])

    const handleCategoryFilter = (category) => {
        setActiveCategory(category);
    
    };

    const handleAdoptNow = (pet) => {
        if (!session) {
            toast.error("Please login to adopt a pet")
            setTimeout(() => {
                router.push(`/login?redirectTo=/all-pets`);
            }, 1000);
        }
        else {
            toast.success(`Adoption request submitted for ${petName}!`);
        }
    };
    const categories = ["All", "Dog", "Cat", "Rabbit", "Bird"]

    return (
        <section className='py-10 bg-base-100'>
            <ToastContainer position="top-center" reverseOrder={false} />
            <h2 className='text-5xl font-extrabold text-center text-[#2d2d2d] mb-2'>Featured Pets</h2>
            <p className='text-center text-gray-500 mb-12  text-lg'>Meet our cute friends looking for a home</p>
    <div className='max-w-md mx-auto px-6 mb-8'>
        <div className='relative flex items-center group'>
            <div className='absolute left-4 pointer-events-none text-gray-400 group-focus-within:text-rose-300 transition-colors durations-300 flex items-center justify-center'>
<Magnifier width={20} height={20} className='stroke-[2.5]'/>
            </div>
            <input type="text"
        placeholder='search pets by name'
        value={searchQuery}
        onChange={(e)=> setSearchQuery(e.target.value)}
        className='w-full pl-12 pr-12 py-3.5 rounded-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all text-gray-700 shadow-sm'
         />
    {searchQuery &&(
        <button
        onClick={()=>setSearchQuery("")}
        className='absolute right-4 text-gray-400 hover:text-rose-200 transition-colors duration-200 flex items-center justify-center'
        type="button"
aria-label="Clear search"
        >
<Xmark width={16} height={16}/>
        </button>
    )}
        </div>
    </div>
            <div className='flex justify-center gap-3 mb-12 max-w-7xl mx-auto px-6 flex-wrap'>
                {categories.map((category)=>(
                    <Button key={category}
                    onClick={()=>handleCategoryFilter(category)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold  transition-all ${
                        activeCategory ===category ?
                        'bg-rose-500 text-white shadow-md'
                        :'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    >
{category}
                    </Button>
                ))}

            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto'>
                {filteredPets.map((pet) => (
                    <div key={pet._id} className='rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-[#EFEAE3]'>
                        <div className='relative w-full h-64'>
 <Image  src={pet.imageUrl}
                alt={pet.petName}
                fill
             sizes="(max-width:768px) 100vw, (max-width:1200px)50vw, 33vw"
                                className='object-contain object-bottom p-4'
                            />
                        </div>
                        <div className='bg-white rounded-t-2xl px-5 py-4 -mt-4 relative'>
                            <h3 className='text-lg font-bold text-rose-600 mb-2'>{pet.petName}</h3>
                            <div className='flex items-center justify-between text-sm text-gray-600'>
                                <span className='flex items-center gap-1'> <Gear width={14} height={14} className='text-gray-400' /> {pet.breed}</span>
                                <span className='flex items-center gap-1'><CalendarXmark width={14} height={14} className='text-gray-400' /> Birth:{pet.age}</span>
                            </div>
                            <div className='grid grid-cols-2 gap-3 mt-2'>
 <Button onClick={()=>router.push(`/all-pets/${pet._id}`)} className='w-full py-2 rounded-lg bg-rose-50 text-rose-600 font-medium hover:bg-rose-500 hover:text-white transition-colors duration-300 mt-1'>
                                    View Details
                                </Button>
<Button onClick={()=>handleAdoptNow(pet)} className='w-full py-2 rounded-lg bg-rose-50 text-rose-600 font-medium hover:bg-rose-500 hover:text-white transition-colors duration-300'>
                                Adopt Now
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default AllPetsPage;