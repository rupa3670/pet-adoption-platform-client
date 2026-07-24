'use client'
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, use } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Image from 'next/image';
import { CalendarXmark, Gear } from '@gravity-ui/icons';
// import { } from 'react-aria-components';
import { Description, FieldGroup, Fieldset,Button, FieldError, Form, Input, Label, TextArea, TextField  } from '@heroui/react';

const DetailsPage = ({ params }) => {
    const resolvedParams = use(params);
    const petId = resolvedParams.id;
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const [pet, setPet] = useState(null);
    const [pickupDate, setPickupDate] = useState(""); 
    const [message, setMessage] = useState(""); 
    const [isSubmitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/${petId}`)
            .then((res) =>{
        if(!res.ok) throw new Error;
        return res.json();
            } )
            
            .then((data) => setPet(data))
            .catch((err) => toast.error("Error fetching pet details:", err));
    }, [petId])

    useEffect(() => {
        if (!isPending && session === null) {
            toast.error("Please login to view details and adopt")
            router.push(`/login?redirectTo=/all-pets/${petId}`)
        }
    }, [session, isPending, router, petId])

    const getToken= async ()=>{
        const tokenRes = await fetch(`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/auth/token`,
            {credentials:'include'}
        );
    const tokenData = await tokenRes.json();
    return tokenData?.token;

    };

    const handleAdoptSubmit = async (e) => {
        e.preventDefault();
        if (!pickupDate) {
            toast.error("Please select a pickup date");
            return;
        }
        setSubmitting(true);
        const adoptionData = {
            petId: pet._id,
            petName: pet.petName,
            userName: session?.user?.name || "Unknown User",
            userEmail: session?.user?.email || "No Email",
            pickupDate,
            message,
           
        };
        try {
            const token = await getToken();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adoptions`, {
                method: "POST",
                headers: { "Content-Type": "application/json",
            Authorization:`Bearer ${token}`,
                 },
                body: JSON.stringify(adoptionData)
                // headers:{
                //     authorization:"logged in"
                // }
            });
            const data = await res.json();

            if (res.ok && data.success) {
                toast.success("Adoption request submitted successfully!");
                setPickupDate("");
                setMessage("");
            }
            else {
                toast.error(data.message || "Something went wrong. Try again");
            }
        }
        catch (error) {
            console.error("Submission error:", error);
            toast.error("Failed to submit request.");
        }
        finally {
            setSubmitting(false);
        }
    }

    if (isPending || !pet || !session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-100">
               Loading...
            </div>
        );
    }

    const isOwner = session?.user?.email === pet.ownerEmail;
    const isAdopted = pet.status ==='adopted';

    return (
        <section className='py-10 bg-base-100 min-h-screen px-4 max-w-7xl mx-auto'>
            <ToastContainer position='top-center' />
            
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start bg-[#EFEAE3] rounded-2xl p-6 shadow-md'>
                
                <div className='lg:col-span-2 space-y-6'>
                    <div className='relative w-full h-[450px] rounded-xl overflow-hidden bg-white shadow-inner'>
                        <Image
                            src={pet.imageUrl}
                            alt={pet.petName}
                            fill
                            className='object-contain p-4'
                            priority
                        />
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h2 className="text-3xl font-bold text-rose-600 mb-4">{pet.petName}</h2>
                        <div className="flex gap-6 text-gray-600 mb-4 text-base">
                            <span className="flex items-center gap-2"><Gear /> <strong>Breed:</strong> {pet.breed}</span>
                            <span className="flex items-center gap-2"><CalendarXmark /> <strong>Age:</strong> {pet.age}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            {pet.description || "No description provided. This lovely pet is looking for a warm home and a caring family."}
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 lg:sticky lg:top-6">
    {isAdopted?(
        <div className='text-center py-10'>
  <p className='text-lg font-semibold text-zinc-700'>This pet has already been adopted</p>
  <p className="text-sm text-gray-500 mt-2">Check out other looking for a home.</p>
        </div>
    ): isOwner?(
   <div className='text-center py-10'>
  <p className='text-lg font-semibold text-zinc-700'>This is your own listing</p>
  <p className="text-sm text-gray-500 mt-2">You can not submit an adoption request for you own pet.</p>
        </div>     
    ):(  <Form className="w-full flex flex-col" onSubmit={handleAdoptSubmit}>
                        <Fieldset className="w-full">
                            <Fieldset.Legend className="text-2xl font-bold text-[#2d2d2d] text-center w-full block mb-1">
                                Adopt {pet.petName}
                            </Fieldset.Legend>
                            <Description className="text-center text-sm text-gray-500 mb-6 block">
                                Please review the information below to submit request.
                            </Description>

                            <FieldGroup className="space-y-4">
                                <TextField isReadOnly name="petName" value={pet.petName} className="flex flex-col gap-1">
                                    <Label className="text-sm font-semibold text-gray-700">Pet Name</Label>
                                    <Input className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 outline-none" />
                                </TextField>

                                <TextField isReadOnly name="userName" value={session.user.name} className="flex flex-col gap-1">
                                    <Label className="text-sm font-semibold text-gray-700">Your Name</Label>
                                    <Input className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 outline-none" />
                                </TextField>

                                <TextField isReadOnly name="userEmail" value={session.user.email} className="flex flex-col gap-1">
                                    <Label className="text-sm font-semibold text-gray-700">Your Email</Label>
                                    <Input className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 outline-none" />
                                </TextField>

                                <TextField
                                    isRequired
                                    name="pickupDate"
                                    type="date"
                                    value={pickupDate}
                                    onChange={(value) => setPickupDate(value)}
                                    className="flex flex-col gap-1"
                                >
                                    <Label className="text-sm font-semibold text-gray-700">Pickup Date</Label>
                                    <Input className="w-full p-2.5 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all" />
                                    <FieldError className="text-xs text-rose-500 mt-1" />
                                </TextField>

                                <TextField
                                    name="message"
                                    value={message}
                                    onChange={(value) => setMessage(value)}
                                    validate={(value) => {
                                        if (value && value.length < 10) {
                                            return "Message must be at least 10 characters";
                                        }
                                        return null;
                                    }}
                                    className="flex flex-col gap-1"
                                >
                                    <Label className="text-sm font-semibold text-gray-700">Message</Label>
                                    <TextArea
                                        placeholder="Why do you want to adopt this pet?..."
                                        className="w-full p-2.5 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none resize-none min-h-[100px] transition-all"
                                    />
                                    <Description className="text-xs text-gray-400 mt-0.5">Minimum 10 characters (Optional)</Description>
                                    <FieldError className="text-xs text-rose-500 mt-1" />
                                </TextField>
                            </FieldGroup>

                            <Fieldset.Actions className="mt-6">
                                <Button
                                    type="submit"
                                    isDisabled={isSubmitting}
                                    className={`w-full py-3 rounded-lg font-bold text-white shadow-md transition-all text-center block text-base ${
                                        isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 cursor-pointer'
                                    }`}
                                >
                                    {isSubmitting ? "Submitting Request..." : "Submit Adoption Request"}
                                </Button>
                            </Fieldset.Actions>
                        </Fieldset>
                    </Form>)}
                  
                </div>

            </div>
        </section>
    );
};

export default DetailsPage;