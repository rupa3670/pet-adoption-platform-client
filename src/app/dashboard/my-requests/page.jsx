'use client'
import { authClient } from '@/lib/auth-client';
import { Heart } from '@gravity-ui/icons';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { ToastContainer } from 'react-toastify';

const statusStyles={
    pending:'bg-amber-100 text-amber-700',
    approved:'bg-emerald-100 text-emerald-700',
    rejected:'bg-rose-100 text-rose-700'

};

const MyRequestPage = () => {
    const {data:session}= authClient.useSession();
    const [request, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState(null);

    useEffect(()=>{
        if (!session?.user?.email) return;

         setLoading(true);
         fetch(`${process.env.NEXT_PUBLIC_API_URL}/adoptions/user/${session.user.email}`,{
            credentials:'include',
         })
         .then((res)=>res.json())
         .then((data)=>setRequests(data))
         .catch(()=> toast.error('Failed to load your requests'))
         .finally(()=> setLoading(false));
    },[session?.user?.email]);

    const handleCancel = (id)=>{
        setCancellingId(id);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/adoptions/${id}`,{
            method:'DELETE',
            credentials:'include',
        })
        .then((res)=>{
            if(!res.ok){
                toast.error('Could not cancel the request');
                return;
            }
    setRequests((prev)=>prev.filter((r)=> r._id!== id));
    toast.success('Request cancelled');
        })
    .catch(()=> toast.error('Could not cancel the request'))
    .finally(()=> setCancellingId(null));
    }
    if(loading){
        return(
            <div className='min-h-[60vh] flex items-center justify-center'>
                <p className='text-zinc-400'>Loading...</p>
            </div>
        )
    }

    return (
       <div className="p-6">
            <ToastContainer position="top-center" />
            <h1 className="flex justify-center items-center text-3xl font-bold text-zinc-600 dark:text-zinc-100 mb-8 mt-6">
                My Requests
            </h1>

            {request.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-20 px-6 bg-[#fbf9f6] dark:bg-zinc-800/30 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-700 max-w-xl mx-auto">
                    <div className="w-20 h-20 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center mb-5">
                        <Heart className="text-rose-400 size-9" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-700 dark:text-zinc-100 mb-2">
                        No adoption requests yet
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 max-w-sm">
                         Browse available pets and find your new friend.
                    </p>
                    <Link
                        href="/all-pets"
                        className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow-sm transition-all"
                    >
                        Browse Pets
                    </Link>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto space-y-4">
                    {requests.map((req) => (
                        <div
                            key={req._id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 shadow-sm"
                        >
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-rose-600 text-lg mb-1">{req.petName}</h3>
                                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-zinc-500">
                                    <span>
                                        Requested:{' '}
                                        {req.createdAt
                                            ? new Date(req.createdAt).toLocaleDateString()
                                            : 'N/A'}
                                    </span>
                                    <span>Pickup: {req.pickupDate}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                                <span
                                    className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${statusStyles[req.status] || 'bg-zinc-100 text-zinc-600'}`}
                                >
                                    {req.status}
                                </span>

                                <Link
                                    href={`/pet/${req.petId}`}
                                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors"
                                >
                                    View
                                </Link>

                                <button
                                    onClick={() => handleCancel(req._id)}
                                    disabled={cancellingId === req._id}
                                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors disabled:opacity-50"
                                >
                                    {cancellingId === req._id ? 'Cancelling...' : 'Cancel'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyRequestPage;