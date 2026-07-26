'use client'
import PetForm from '@/components/PetForm';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddPetPage = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const getToken = async () => {
        const tokenRes = await fetch(
            `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/auth/token`,
            { credentials: 'include' }
        );
        const tokenData = await tokenRes.json();
        return tokenData?.token;
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImageLoading(true);
        const formData = new FormData();
        formData.append("image", file);

        const imgbbApiKey = "8794aa0a362a46e1eb8b44cb32941491";
        fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setImageUrl(data.data.url);
                    toast.success("Image uploaded successfully!");
                } else {
                    toast.error("Image upload failed! Please upload small size image");
                }
                setImageLoading(false);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Something went wrong during upload!");
                setImageLoading(false);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageUrl) {
            toast.warn("Please upload a pet image first");
            return;
        }
        setLoading(true);

        const formData = Object.fromEntries(new FormData(e.currentTarget));

        const newPetData = {
            ...formData,
            imageUrl: imageUrl,
            adoptionFee: parseFloat(formData.adoptionFee) || 0,
        };

        try {
            const token = await getToken();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newPetData),
            });
            const data = await res.json();

            if (data.success) {
                toast.success("Pet added successfully for adoption!");
                router.push("/dashboard/my-listing");
            } else {
                toast.error(data.message || "Failed to add pet! Please try again.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to connect to backend server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 my-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2"> Add a Pet for Adoption</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Please provide accurate information to find the best home for the pet.</p>
            </div>

            <PetForm
                handleSubmit={handleSubmit}
                handleImageUpload={handleImageUpload}
                imageLoading={imageLoading}
                imageUrl={imageUrl}
                loading={loading}
                ownerEmail={session?.user?.email || ""}
            />
        </div>
    );
};

export default AddPetPage;