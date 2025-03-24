import { toast } from "sonner";
import { useAtom } from 'jotai';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIdToken, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { auth, provider } from '@/services/firebase/firebase';
import { emailStorageAtom, tokenStorageAtom } from '@/jotai/atoms';
import { apiInstanceExpress } from '@/services/express/apiInstance';

const SignIn = ({ className, ...props }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [, setEmailStorage] = useAtom(emailStorageAtom);
    const [, setTokenStorage] = useAtom(tokenStorageAtom);

    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const signIn = await signInWithEmailAndPassword(auth, email, password);

            if (signIn) {
                const firebaseToken = await getIdToken(signIn.user);
                const addToken = await apiInstanceExpress.post("sign-in", {
                    email,
                    password,
                    token: firebaseToken,
                });

                if (addToken.status === 200) {
                    setIsLoading(true);

                    setEmailStorage(signIn.user.email);
                    setTokenStorage(firebaseToken)
                    
                    setTimeout(() => {
                        navigate("/dashboard")
                    }, 2000);
                }
            }
        } catch (error) {
            let errorMessage = "Gagal masuk. Silakan coba lagi.";

            if (error.code === "auth/user-not-found") {
                errorMessage = "Akun tidak ditemukan. Silakan periksa kembali email Anda.";
            } else if (error.code === "auth/wrong-password") {
                errorMessage = "Kata sandi salah. Silakan coba lagi.";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "Format email tidak valid. Silakan masukkan email yang benar.";
            } else if (error.code === "auth/too-many-requests") {
                errorMessage = "Terlalu banyak percobaan masuk. Silakan coba lagi nanti.";
            }
    
            toast.error(errorMessage, {
                duration: 3000,
            });
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();

        try {
            const signIn = await signInWithPopup(auth, provider);
            
            if (signIn) {
                const firebaseToken = await getIdToken(signIn.user);
                const addToken = await apiInstanceExpress.post("sign-in", {
                    email: signIn.user.email,
                    password: "asdfghjkl",
                    token: firebaseToken,
                });

                if (addToken.status === 200) {
                    setEmailStorage(signIn.user.email);
                    setTokenStorage(firebaseToken)

                    setTimeout(() => {
                        navigate("/dashboard")
                    }, 2000)
                }
            }
        } catch (error) {
            console.error("Sign-in Error", error);
        }
    };

    return (
        <div className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10 overflow-hidden">
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

            <div className="w-full max-w-sm">
                <div className={cn("flex flex-col gap-6", className)} {...props}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Login</CardTitle>
                            <CardDescription>
                                Masukkan email Anda untuk masuk ke akun
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                            <a
                                                href="#"
                                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                            >
                                                Lupa kata sandi?
                                            </a>
                                        </div>
                                        <Input 
                                            id="password" 
                                            type="password" 
                                            onChange={(e) => setPassword(e.target.value)} 
                                            required 
                                        />
                                    </div>
                                    {isLoading ? (
                                        <Button className="w-full" disabled>
                                            <Loader2 className="animate-spin" />
                                            Sedang memeriksa akun anda
                                        </Button>
                                    ) : (
                                        <Button className="w-full cursor-pointer" onClick={handleSignIn}>
                                            Login
                                        </Button>
                                    )}
                                    <Button variant="outline" className="w-full">
                                        Login dengan Google
                                    </Button>
                                </div>
                                <div className="mt-4 text-center text-sm">
                                    Belum punya akun?{" "}
                                    <a href="/sign-up" className="underline underline-offset-4">
                                        Sign up
                                    </a>
                                </div>
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

export default SignIn