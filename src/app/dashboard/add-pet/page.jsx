'use client'
import PetForm from '@/components/PetForm';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddPetPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [imageLoading,setImageLoading] = useState(false);
    const [imageUrl, setImageUrl]= useState("");

    const handleImageUpload =(e)=>{
        const file = e.target.files[0];
        if(!file) return;

        setImageLoading(true);
        const formData = new FormData();
        formData.append("image",file);

        const imgbbApiKey = "8794aa0a362a46e1eb8b44cb32941491";
        fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,{
            method:"POST",
            body:formData,
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.success){
                setImageUrl(data.data.url);
                toast.success("Image uploaded successfully!");
            }
            else{
                toast.error("Image upload failed! please try again");

            }
            setImageLoading(false);
        })
        .catch((err)=>{
            console.error(err);
            toast.error("Something went wrong during upload!");
            setImageLoading(false);
        });
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(!imageUrl){
            toast.warn("Please upload a pet image first");
            return;
        }
        setLoading(true);

        const formData = Object.fromEntries(new FormData(e.currentTarget));

        const newPetData={
            ...formData,
            imageUrl:imageUrl,
            adoptionFee: parseFloat(formData.adoptionFee) || 0,
            ownerEmail: "user@example.com",
        };
        fetch("http://localhost:8000/pets",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(newPetData), 
             })
             .then((res)=>res.json())
             .then((data)=>{
                if(data.success){
                    toast.success('pet added successfully for adoption!');
                    router.push("?dashboard/my-listing");

                } 
                else{
                    toast.error("Failed to add pet! Please try again.");

                }
                setLoading(false);
             })
             .catch((err)=>{
                console.error(err);
                toast.error("Failed to connect to backend server")
                setLoading(false);
             });

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
                ownerEmail="user@example.com"
            />
        </div>
        
    );
};

export default AddPetPage;