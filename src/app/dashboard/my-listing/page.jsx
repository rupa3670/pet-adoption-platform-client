'use client'
import DeletePetModal from '@/components/modal/DeleteModal';
import EditPetModal from '@/components/modal/EditModal';
import RequestModal from '@/components/modal/RequestModal';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const MyListingPage = () => {
    const { data: session } = authClient.useSession();
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session?.user?.email) return;

        const fetchPets = async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/pets/owner/${session.user.email}`,
                { credentials: 'include' }
            );
            const data = await res.json()
            setPets(data);
            setLoading(false)
        };
        fetchPets();
    }, [session]);
    if (loading) return <p>Loading...</p>

    const total = pets.length;
    const available = pets.filter(p => p.status !== 'adopted').length;
    const adopted = pets.filter(p => p.status === 'adopted').length;

    const handleDelete = (petId) => {
        setPets((prev) => prev.filter((p) => p._id !== petId));
    };
    const handleUpdated = (updatedPet) => {
        setPets((prev) =>
            prev.map((p) => (p._id === updatedPet._id ? updatedPet : p)));
    };
    return (
        <div className="p-6">
            <h1 className="flex justify-center items-center text-3xl font-bold text-zinc-600 dark:text-zinc-100 mb-3 mt-6">My Listings</h1>

            <div className="flex gap-6 mb-8 justify-center items-center">
                <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-5 py-3">
                    <p className="text-xs text-zinc-400 uppercase font-bold tracking-wider">Total</p>
                    <p className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">{total}</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl px-5 py-3">
                    <p className="text-xs text-emerald-600 uppercase font-bold tracking-wider">Available</p>
                    <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{available}</p>
                </div>
                <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl px-5 py-3">
                    <p className="text-xs text-rose-500 uppercase font-bold tracking-wider">Adopted</p>
                    <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">{adopted}</p>
                </div>
            </div>

            {/* {pets.length === 0?(
                <div className='flex flex-col items-center justify-center text-center py-20 px-6 bg-[#fbf9f6] dark:bg-zinc-800/30 rounded-3xl border  border-dashed border-zinc-200 dark:border-zinc-700 max-w-xl mx-auto'>
     <div>
        <PawPrint
     </div>
                </div>
            )} */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pets.map(pet => (
                    <div
                        key={pet._id}
                        className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-[#EFEAE3]"
                    >
                        <div className="relative w-full h-64 overflow-hidden">
                            <Image
                                src={pet.imageUrl}
                                alt={pet.petName}
                                fill
                                sizes="(max-width:768px) 100vw, (max-width:1200px)50vw, 33vw"
                                className="object-contain object-bottom p-4 transition-transform duration-300 group-hover:scale-110"
                            />
                            {pet.status === 'adopted' && (
                                <span className="absolute top-2 right-2 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    Adopted
                                </span>
                            )}
                        </div>

                        <div className="bg-white rounded-t-2xl px-5 py-4 -mt-4 relative">
                            <h3 className="text-lg font-bold text-rose-600 mb-2">{pet.petName}</h3>
                            <p className="text-rose-500 font-semibold mb-3">
                                {pet.adoptionFee > 0 ? `৳${pet.adoptionFee}` : 'Free'}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                <RequestModal pet={pet} />
                                <EditPetModal pet={pet} onUpdated={handleUpdated} />
                                <Link
                                    href={`/pet/${pet._id}`}
                                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors"
                                >
                                    View
                                </Link>
                                <DeletePetModal pet={pet} onDeleted={handleDelete} />

                                {/* <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                                    Edit
                                </button>
                                <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors">
                                    View
                                </button>
                                <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors">
                                    Delete
                                </button> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyListingPage;