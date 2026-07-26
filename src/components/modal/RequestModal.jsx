'use client'
import { Button, Modal } from '@heroui/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const RequestModal = ({pet,onStatusChange}) => {
    const [requests, setRequest] = useState([]);
    const [loading, setLoading] =useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    
    const getToken = async ()=>{
        const tokenRes = await fetch(
            `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/auth/token`,{
                credentials:'include'
            }
        );
    const tokenData = await tokenRes.json();
    return tokenData?.token;
    }
    
    const fetchRequest = async()=>{
        setLoading(true);
        getToken().then((token)=>{
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/adoptions/pet/${pet._id}`,{
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            })
            .then((res)=>res.json())
            .then((data)=>{
                setRequest(Array.isArray(data)? data :[]);
            })
            .catch(()=> toast.error('Failed to load requests'))
            .finally(()=>setLoading(false));
        })
    };
    useEffect(()=>{
        if(pet?._id) fetchRequest();
    },[pet?._id])

    const handleStatusChange = async (id, status)=>{
        setUpdatingId(id);
        const token = await getToken();
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adoptions/${id}`,{
            method:'PATCH',
            headers:{'Content-Type':'application/json',
             Authorization:`Bearer ${token}`,
            },
           
            body:JSON.stringify({status, petId:pet._id}),
        })
        .then((res)=>{
            if(!res.ok){
                toast.error('Failed to update request status');
                 return;
            }
          toast.success(`Request ${status}`);
        fetchRequest();
        onStatusChange?.();
        })
    .catch(()=>toast.error('Failed to update request status'))
   .finally(()=> setUpdatingId(null));
    }

    return (
        <Modal>
      <Button variant="secondary"
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-50 text-zinc-700 hover:bg-zinc-200"

      >Requests</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[480px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Requests for {pet.petName}</Modal.Heading>
            </Modal.Header>
             <Modal.Body className="max-h-[60vh] overflow-y-auto">
                            {loading && <p>Loading...</p>}
                            {!loading && requests.length === 0 && (
                                <p className="text-zinc-400 text-sm">No requests yet.</p>
                            )}

                            <div className="space-y-4">
                                {requests.map((req) => (
                                    <div
                                        key={req._id}
                                        className="border border-zinc-200 dark:border-zinc-700 rounded-xl p-4"
                                    >
                                        <p className="font-semibold text-zinc-700 dark:text-zinc-100">
                                            {req.userName}
                                        </p>
                                        <p className="text-sm text-zinc-500">{req.userEmail}</p>
                                        <p className="text-sm text-zinc-500 mt-1">
                                            Pickup: {req.pickupDate}
                                        </p>

                                        <div className="flex items-center justify-between mt-3">
                                            <span
                                                className={`text-xs font-bold px-2 py-1 rounded-full capitalize
                                                    ${req.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : ''}
                                                    ${req.status === 'rejected' ? 'bg-rose-100 text-rose-700' : ''}
                                                    ${req.status === 'pending' ? 'bg-amber-100 text-amber-700' : ''}
                                                `}
                                            >
                                                {req.status}
                                            </span>

                                            {req.status === 'pending' && (
                                                <div className="flex gap-2">

                                                    <Button
                                                        size="sm"

isDisabled={updatingId=== req._id}                                                        onClick={() => handleStatusChange(req._id, 'approved')}
                                                        className="bg-emerald-500 text-white hover:bg-emerald-600"
                                                    >
                                                        {updatingId === req._id?'...' :'Approve'}
                                                    </Button>
                                                    <Button
                                                        size="sm"
 isDisabled={updatingId === req._id}                                                       onClick={() => handleStatusChange(req._id, 'rejected')}
                                                        className="bg-rose-500 text-white hover:bg-rose-600"
                                                    >
                                                        {updatingId === req._id?'...' :'Reject'}
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Modal.Body>
            {/* <Modal.Footer>
              <Button className="bg-mist-500" slot="close">
                Close
              </Button>
            </Modal.Footer> */}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
    );
};

export default RequestModal;