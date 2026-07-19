'use client'

import { authClient } from '@/lib/auth-client';
import { Button, Card, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { toast } from 'react-toastify';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

const SignUp = () => {
    const router = useRouter(); 
    const[password, setPassword]= useState('');
   
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());
        
        if(user.password !==user.confirmPassword){
            toast.error("Password and confirm password do not match")
            return;
        }
        
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
            toast.success("Account created successfully! Please log in.");
            router.push('/login'); 
        }
    };

    const handleGoogleLogIn = async()=>{
            const{error} = await authClient.signIn.social({
                provider:"google",
                callbackURL:"/",
            });
            if(error){
                toast.error(error.message);
            }
        }
    

    return (
        <div className='max-w-7xl mx-auto py-12 flex flex-col items-center justify-center min-h-[80vh]'>
            <div className='text-center mb-6'>
                <h1 className='text-2xl font-bold text-zinc-800 dark:text-zinc-100'>Create Account</h1>
                <p className='text-zinc-500 text-sm mt-1'>Join us to start adopting your favorite pets</p>
            </div>
            
            <Card className='border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm rounded-2xl bg-white dark:bg-zinc-900'>
                 <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                    
                    
                    <TextField isRequired name="name" type="text" className="flex flex-col gap-1.5">
                        <Label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Name</Label>
                        <Input 
                            placeholder="Enter your name" 
                            className="w-full px-3 py-2 text-sm font-medium bg-zinc-50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500" 
                        />
                        <FieldError className="text-rose-500 text-xs mt-0.5 font-medium" />
                    </TextField>

                    
                    <TextField name="photoUrl" type="url" className="flex flex-col gap-1.5">
                        <Label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Image URL</Label>
                        <Input 
                            placeholder="Enter your image url" 
                            className="w-full px-3 py-2 text-sm font-medium bg-zinc-50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500" 
                        />
                        <FieldError className="text-rose-500 text-xs mt-0.5 font-medium" />
                    </TextField>            
                    
                    
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        className="flex flex-col gap-1.5"
                        validate={(value) => {
                          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                          }
                          return null;
                        }}
                    >
                        <Label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Email</Label>
                        <Input 
                            placeholder="Enter your email" 
                            className="w-full px-3 py-2 text-sm font-medium bg-zinc-50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500" 
                        />
                        <FieldError className="text-rose-500 text-xs mt-0.5 font-medium" />
                    </TextField>
                    
                    <TextField
                        isRequired
                        minLength={6}
                        name="password"
                        type="password"
                        className="flex flex-col gap-1.5"
                        validate={(value) => {
                          if (value.length < 6) return "Password must be at least 6 characters";
                          if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                          if (!/[0-9]/.test(value)) return "Password must contain at least one number";
                          return null;
                        }}
                    >
                        <Label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Password</Label>
                        <Input 
                            placeholder="Enter your password" 
                            type="password" 
                            className="w-full px-3 py-2 text-sm font-medium bg-zinc-50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500" 
                        />
                        <Description className="text-zinc-400 dark:text-zinc-500 text-[11px] mt-0.5 leading-relaxed">
                            Must be at least 8 characters with 1 uppercase and 1 number
                        </Description>
                        <FieldError className="text-rose-500 text-xs mt-0.5 font-medium" />
                    </TextField>
                  <TextField
                        isRequired
                        name="confirmPassword"
                        type="password"
                        className="flex flex-col gap-1.5"
                        value={password}
                        onChange={setPassword}
                        validate={(value) => {
                          if(value!==password) return "passwords do not match";
                          return null;
                        }}
                    >
                        <Label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Password</Label>
                        <Input 
                            placeholder="Re-enter your password" 
                            type="password" 
                            className="w-full px-3 py-2 text-sm font-medium bg-zinc-50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500" 
                        />
                
                        <FieldError className="text-rose-500 text-xs mt-0.5 font-medium" />
                    </TextField>
                   
                    <div className="flex justify-center gap-2 pt-2">
                        <Button type="submit" className='w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl py-2.5 shadow-sm transition-all active:scale-95'>
                          Create Account
                        </Button>
                    </div>

                 <div className='flex items-center gap-2'>
                 <hr  className='flex-grow h-px border-zinc-200 dark:bg-zinc-700'/>
                 <span className='text-xs text-zinc-400 '>OR</span>
                 <hr  className='flex-grow h-px border-zinc-200 dark:bg-zinc-700'/>
                 </div>
                 <Button onPress={handleGoogleLogIn} className={'w-full flex items-center justify-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-100 font-semibold rounded-xl py-2.5 shadow-sm transition-all active:scale-95 hover:bg-zinc-50 dark:hover:bg-zinc-700'}><FcGoogle/> Login with Google</Button>   
                    <p className='text-center text-sm text-zinc-500 mt-1'>
                        Already have an account?{' '}
                        <Link href='/login' className='text-rose-500 hover:underline font-medium'>
                            Log In
                        </Link>
                    </p>
                </Form>
            </Card>
        </div>
    );
};

export default SignUp;