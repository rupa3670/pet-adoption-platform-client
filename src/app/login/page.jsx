'use client'

import { authClient } from '@/lib/auth-client';
import { Button, Card, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import React from 'react';
import { useRouter } from 'next/navigation'; 
import { toast } from 'react-toastify';
import Link from 'next/link';

const Login = () => {
    const router = useRouter(); 
   
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());
        
        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
        });

        if (error) {
            console.error("Login failed:", error.message);
            toast.error(error.message); 
            return;
        }

        if (data) {
            console.log("Login successful!", data);
            toast.success("Welcome back!");
            router.push('/'); 
            router.refresh(); 
        }
    };

    return (
        <div className='max-w-7xl mx-auto py-12 flex flex-col items-center justify-center min-h-[80vh]'>
            <div className='text-center mb-6'>
                <h1 className='text-2xl font-bold text-zinc-800 dark:text-zinc-100'>Welcome Back</h1>
                <p className='text-zinc-500 text-sm mt-1'>Log in to manage your pet adoptions</p>
            </div>
            
            <Card className='border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm rounded-2xl bg-white dark:bg-zinc-900'>
                 <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                    
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
                        name="password"
                        type="password"
                    >
                        <Label className="text-zinc-600 dark:text-zinc-400">Password</Label>
                        <Input placeholder="Enter your password" type="password" className="font-medium" />
                        <FieldError className="text-rose-500 text-xs mt-1" />
                    </TextField>

                    <div className="flex justify-center gap-2 pt-2">
                        <Button type="submit" className='w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl py-2.5 shadow-sm transition-all active:scale-95'>
                          LogIn
                        </Button>
                    </div>

                    <p className='text-center text-sm text-zinc-500 mt-2'>
                        Do not have an account?{' '}
                        <Link href='/signup' className='text-rose-500 hover:underline font-medium'>
                            Sign Up
                        </Link>
                    </p>
                </Form>
            </Card>
        </div>
    );
};

export default Login;