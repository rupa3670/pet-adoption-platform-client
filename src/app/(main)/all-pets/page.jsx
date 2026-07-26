'use client'
import { authClient } from '@/lib/auth-client';
import { CalendarXmark, Gear, Magnifier } from '@gravity-ui/icons';
import { Button } from '@heroui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import PetLoader from '@/components/PetLoader'; 

const AllPetsPage = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const [pets, setPets] = useState([]);
    const [filteredPets, setFilteredPets] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [isLoading, setIsLoading] = useState(true); 

    const sortPets = (list) => {
    return [...list].sort((a, b) => a.petName.localeCompare(b.petName));
};
 
 
   useEffect(() => {
    setIsLoading(true);
    const params = new URLSearchParams();
    if (searchQuery.trim() !== "") params.append("search", searchQuery);
    if (activeCategory !== "All") params.append("species", activeCategory);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets?${params.toString()}`)
        .then((res) => res.json())
        .then((data) => {
            setPets(data);
            setFilteredPets(sortPets(data));
        })
        .catch(() => {
            toast.error("Failed to load pets");
        })
        .finally(() => {
            setIsLoading(false);
        });
}, [searchQuery, activeCategory]);

    const handleCategoryFilter = (category) => {
        setActiveCategory(category);
    };

    const handleAdoptNow = (pet) => {
    if (!session) {
        toast.error("Please login to adopt a pet");
        router.push(`/login?redirectTo=/pet/${pet._id}`);
    } else {
        router.push(`/pet/${pet._id}`);
    }
};
    
    const categories = ["All", "Dog", "Cat", "Rabbit", "Bird"];

    return (
        <section className='py-10 bg-base-100 min-h-screen mt-10'>
            <ToastContainer position="top-center" reverseOrder={false} />
            <h2 className='text-5xl font-extrabold text-center text-[#2d2d2d] dark:text-zinc-200 mb-2 transition-colors duration-300'>All Pets</h2>
            <p className='text-center text-gray-500 dark:text-zinc-100 mb-4 text-lg'>Browse all pets currently</p>
            <div className='max-w-md mx-auto px-6 mb-8'>
                <div className='relative flex items-center group'>
                    <div className='absolute left-4 pointer-events-none text-gray-400 dark:text-zinc-100 dark:bg-zinc-shadow-50 group-focus-within:text-rose-300 transition-colors duration-300 flex items-center justify-center'>
                        <Magnifier width={20} height={20} className='stroke-[2.5]'/>
                    </div>
                    <input type="text"
                        placeholder='search pets by name'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='w-full pl-12 pr-12 py-3.5 rounded-full border-gray-300 dark:bg-zinc-800 dark:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all text-gray-700 dark:text-zinc-100 shadow-sm'
                    />
                    {/* {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className='absolute right-4 text-gray-400 hover:text-rose-200 transition-colors duration-200 flex items-center justify-center'
                            type="button"
                            aria-label="Clear search"
                        >
                            <Xmark width={16} height={16}/>
                        </button>
                    )} */}
                </div>
            </div>
            
            <div className='flex justify-center gap-3 mb-12 max-w-7xl mx-auto px-6 flex-wrap'>
                {categories.map((category) => (
                    <Button key={category}
                        onClick={() => handleCategoryFilter(category)}
                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                            activeCategory === category ?
                            'bg-rose-500 text-white shadow-md' :
                            'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {category}
                    </Button>
                ))}
            </div>

            {isLoading ? (
                <PetLoader />
            ) : filteredPets.length === 0 ? (
                <div className="text-center text-gray-500 py-20 text-xl font-medium">
                    No cute friends found matching your criteria.
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto'>
                    {filteredPets.map((pet) => (
                        <div key={pet._id} className='group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-[#EFEAE3] dark:bg-zinc-700'>
                            <div className='relative w-full h-64 overflow-hidden'>
                                <Image src={pet.imageUrl}
                                    alt={pet.petName}
                                    fill
                                    sizes="(max-width:768px) 100vw, (max-width:1200px)50vw, 33vw"
                                    className='object-contain object-bottom p-4 transition-transform duration-300 group-hover:scale-110'
                                />
                            </div>
                            <div className='bg-white dark:bg-zinc-950 rounded-t-2xl px-5 py-4 -mt-4 relative transition-colors duration-300'>
                                <h3 className='text-lg font-bold text-rose-600 mb-2'>{pet.petName}</h3>
                                <div className='flex items-center justify-between text-sm text-gray-600 dark:text-zinc-100'>
                                    <span className='flex items-center gap-1'> <Gear width={14} height={14} className='text-gray-400' /> {pet.breed}</span>
                                    <span className='flex items-center gap-1'><CalendarXmark width={14} height={14} className='text-gray-400' /> Birth:{pet.age}</span>
                                </div>
                                <div className='grid grid-cols-2 gap-3 mt-4 items-center'>
                                    <Button onPress={() => router.push(`/pet/${pet._id}`)} className='w-full py-2 rounded-lg bg-rose-50 dark:bg-rose-500 text-rose-600 dark:text-white  font-medium hover:bg-rose-500 dark:hover:bg-rose-100 hover:text-white  dark:hover:text-rose-500 not-visited:transition-colors duration-300'>
                                        View Details
                                    </Button>
                                    <Button onPress={() => handleAdoptNow(pet)} className='w-full py-2 rounded-lg bg-rose-50 dark:bg-rose-500 text-rose-600 dark:text-white  font-medium hover:bg-rose-500 dark:hover:bg-rose-100 hover:text-white  dark:hover:text-rose-500 not-visited:transition-colors duration-300'>
                                        Adopt Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default AllPetsPage;