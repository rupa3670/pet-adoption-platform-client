'use client'

import { authClient } from '@/lib/auth-client';
import { Button, Card, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import React from 'react';
import { useRouter } from 'next/navigation'; 
import { toast } from 'react-toastify';

const SignUp = () => {
    const router = useRouter(); 
   
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());
        
        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            image: user["photoUrl"] 
        });

        if (error) {
            console.error("Sign up failed:", error.message);
            toast.error(error.message); 
            return;
        }

        if (data) {
            console.log("Sign up successful!", data);
            toast.success("Account created successfully!");
            router.push('/'); 
        }
    };

    return (
        <div className='max-w-7xl mx-auto py-12 flex flex-col items-center justify-center min-h-[80vh]'>
            <div className='text-center mb-6'>
                <h1 className='text-2xl font-bold text-zinc-800 dark:text-zinc-100'>Create Account</h1>
            </div>
            <Card className='border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm rounded-2xl bg-white dark:bg-zinc-900'>
                 <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit} >
                    <TextField isRequired name="name" type="text">
                        <Label className="text-zinc-600 dark:text-zinc-400">Name</Label>
                        <Input placeholder="Enter your name" className="font-medium" />
                        <FieldError className="text-rose-500 text-xs mt-1" />
                    </TextField>

                    <TextField name="photoUrl" type="url">
                        <Label className="text-zinc-600 dark:text-zinc-400">Image URL</Label>
                        <Input placeholder="Enter your image url" className="font-medium" />
                        <FieldError className="text-rose-500 text-xs mt-1" />
                    </TextField>            
                    
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                          }
                          return null;
                        }}
                    >
                        <Label className="text-zinc-600 dark:text-zinc-400">Email</Label>
                        <Input placeholder="Enter your email" className="font-medium" />
                        <FieldError className="text-rose-500 text-xs mt-1" />
                    </TextField>

                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                          if (value.length < 8) return "Password must be at least 8 characters";
                          if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                          if (!/[0-9]/.test(value)) return "Password must contain at least one number";
                          return null;
                        }}
                    >
                        <Label className="text-zinc-600 dark:text-zinc-400">Password</Label>
                        <Input placeholder="Enter your password" type="password" className="font-medium" />
                        <Description className="text-zinc-400 text-xs mt-1">Must be at least 8 characters with 1 uppercase and 1 number</Description>
                        <FieldError className="text-rose-500 text-xs mt-1" />
                    </TextField>

                    <div className="flex justify-center gap-2 pt-2">
                        <Button type="submit" className='w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl py-2.5 shadow-sm transition-all active:scale-95'>
                          Create Account
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default SignUp;