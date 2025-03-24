import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { apiInstanceExpress } from '@/services/express/apiInstance';
import { auth, provider } from '@/services/firebase/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from 'lucide-react';
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

const SignUp = ({ className, ...props }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) return;

        try {
            const register = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            )

            if (register) {
                await signOut(auth);

                const addUser = await apiInstanceExpress.post("sign-up", {
                    name,
                    email,
                    password,
                });

                if (addUser.status === 201) {
                    setIsLoading(true);

                    setTimeout(() => {
                        navigate("/sign-in")
                    }, 2000)
                }
            }
        } catch (error) {
            let errorMessage = "Pendaftaran gagal. Silakan coba lagi.";
    
            if (error.code === "auth/email-already-in-use") {
                errorMessage = "Email ini sudah terdaftar. Silakan gunakan email lain.";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "Format email tidak valid. Silakan masukkan email yang benar.";
            } else if (error.code === "auth/weak-password") {
                errorMessage = "Kata sandi terlalu lemah. Gunakan minimal 6 karakter.";
            }
        
            toast.error(errorMessage, {
                duration: 3000,
            });
        }
    };

    const handleGoogleSignUp = async (e) => {
        e.preventDefault();

        try {
            const signUp = await signInWithPopup(auth, provider);
            
            if (signUp) {
                await signOut(auth);

                const addToken = await apiInstanceExpress.post("sign-up", {
                    name: signUp.user.name,
                    email: signUp.user.email,
                    password: "asdfghjkl",
                });

                if (addToken.status === 201) {
                    setTimeout(() => {
                        navigate("/sign-in")
                    }, 2000)
                }
            }
        } catch (error) {
            console.error("Sign-up Error", error);
            toast.error(`Sign up Error: ${error}`, {
                duration: 3000,
            });
        }
    };


    return (
        <div className="realtive flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <Toaster />
            
            <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#4f46e5] to-[#3b82f6] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </div>

            <div className="w-full max-w-sm mt-14">
                <div className={cn("flex flex-col gap-6", className)} {...props}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Daftar</CardTitle>
                            <CardDescription>Buat akun baru dengan mengisi formulir di bawah ini</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nama Lengkap</Label>
                                    <Input id="name" type="text" placeholder="Masukkan nama Anda" onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="contoh@email.com" onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Kata Sandi</Label>
                                    <Input id="password" type="password" placeholder="Masukkan kata sandi" onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="confirm-password">Konfirmasi Kata Sandi</Label>
                                    <Input id="confirm-password" type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Ulangi kata sandi" required />
                                </div>
                                {isLoading ? (
                                    <Button className="w-full" disabled>
                                        <Loader2 className="animate-spin" />
                                        Sedang membuat akun anda
                                    </Button>
                                ) : (
                                    <Button className="w-full cursor-pointer" onClick={handleSignUp}>
                                        Daftar
                                    </Button>
                                )}
                                <Button variant="outline" onClick={handleGoogleSignUp} className="w-full">
                                    Daftar dengan Google
                                </Button>
                                <p className="mt-4 text-center text-sm">
                                    Sudah punya akun?{" "}
                                    <a href="#" className="text-blue-500 underline">Masuk</a>
                                </p>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#4f46e5] to-[#3b82f6] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                />
            </div>
        </div>
    )
}

export default SignUp