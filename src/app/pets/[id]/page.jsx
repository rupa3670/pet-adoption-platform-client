'use client'
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState,use } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { ChatLoader } from "@heroui-pro/react";
import Image from 'next/image';
import { CalendarXmark, Gear } from '@gravity-ui/icons';
import { Button, FieldError, Form, Input, Label, TextArea, TextField } from 'react-aria-components';
import { Description, FieldGroup, Fieldset } from '@heroui/react';

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
        fetch(`http://localhost:8000/pets/${petId}`)
            .then((res) => res.json())
            .then((data) => setPet(data))
            .catch((err) => console.error("Error fetching pet details:", err));
    }, [petId])

    useEffect(() => {
        if (!isPending && !session) {
            toast.error("Please login to view details and adopt")
            router.push(`/login?redirectTo=/all-pets/${petId}`)
        }
    }, [session, isPending, router, petId])

    const handleAdoptSubmit = async (e) => {
        e.preventDefault();
        if (!pickupData) {
            toast.error("Please select a pickup data");
            return;
        }
        setSubmitting(true);
        const adoptionData = {
            petId: pet._id,
            petName: pet.petName,
            userName: session.user.name,
            userEmail: session.user.email,
            pickupData,
            message,
            status: "pending"
        };
        try {
            const res = await fetch("http://localhost:8000/adoptions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(adoptionData)
            });
            const data = await res.json();

            if (res.ok && data.success) {
                toast.success("Adoption request submitted successfully!");
                setPickupData("");
                setMessage("");
            }
            else {
                toast.error("Something went wrong. Try again");
            }
        }
        catch (error) {
            console.error("Submission error:", error);
        }
        finally {
            setSubmitting(false);
        }

    }


    if (isPending || !pet || !session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-100">
                <ChatLoader.Dots />
            </div>
        );
    }

    return (
        <section className=' py-10 bg-base-100'>
            <ToastContainer position='top-center' />
            <div className='lg:col-span-2 bg-[#EFEAE3] rounded-2xl p-6 shadow-sm'>
                <div className='relative w-full h-96 rounded-xl overflow-hidden bg-white mb-6'>
                    <Image
                        src={pet.imageUrl}
                        alt={pet.petName}
                        fill
                        className='object-contain p-4'
                    />
                </div>
                <div className="bg-white rounded-xl p-6">
                    <h2 className="text-3xl font-bold text-rose-600 mb-4">{pet.petName}</h2>
                    <div className="flex gap-6 text-gray-600 mb-4 text-base">
                        <span className="flex items-center gap-2"><Gear /> <strong>Breed:</strong> {pet.breed}</span>
                        <span className="flex items-center gap-2"><CalendarXmark /> <strong>Age:</strong> {pet.age}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                        {pet.description || "No description provided. This lovely pet is looking for a warm home and a caring family."}
                    </p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 h-fit sticky top-6">
                    <Form className="w-full flex flex-col" onSubmit={handleAdoptSubmit}>
                        <Fieldset>
                            <Fieldset.Legend className="text-2xl font-bold text-[#2d2d2d] text-center w-full block">
                                Adopt {pet.petName}
                            </Fieldset.Legend>
                            <Description className="text-center text-gray-500 mb-4 block">
                                Please review the information below to submit request.
                            </Description>

                            <FieldGroup className="space-y-4">
                                <TextField isReadOnly name="petName" value={pet.petName}>
                                    <Label>Pet Name</Label>
                                    <Input variant="bordered" />
                                </TextField>

                                <TextField isReadOnly name="userName" value={session.user.name}>
                                    <Label>Your Name</Label>
                                    <Input variant="bordered" />
                                </TextField>

                                <TextField isReadOnly name="userEmail" value={session.user.email}>
                                    <Label>Your Email</Label>
                                    <Input variant="bordered" />
                                </TextField>

                                <TextField
                                    isRequired
                                    name="pickupDate"
                                    type="date"
                                    value={pickupDate}
                                    onChange={(e) => setPickupDate(e.target.value)}
                                >
                                    <Label>Pickup Date</Label>
                                    <Input variant="bordered" color="danger" />
                                    <FieldError className="text-xs text-rose-500 mt-1" />
                                </TextField>

                                <TextField
                                    name="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    validate={(value) => {
                                        if (value && value.length < 10) {
                                            return "Message must be at least 10 characters";
                                        }
                                        return null;
                                    }}
                                >
                                    <Label>Message</Label>
                                    <TextArea
                                        placeholder="Why do you want to adopt this pet?..."
                                        variant="bordered"
                                        color="danger"
                                        className="resize-none min-h-[80px]"
                                    />
                                    <Description>Minimum 10 characters (Optional)</Description>
                                    <FieldError className="text-xs text-rose-500 mt-1" />
                                </TextField>
                            </FieldGroup>

                            <Fieldset.Actions className="mt-6">
                                <Button
                                    type="submit"
                                    isLoading={isSubmitting}
                                    color="danger"
                                    className="w-full py-6 rounded-lg font-semibold text-white shadow-md"
                                >
                                    Submit Adoption Request
                                </Button>
                            </Fieldset.Actions>
                        </Fieldset>
                    </Form>
                </div>

            </div>


        </section>
    );
};

export default DetailsPage;