import { toast } from "sonner";
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { auth } from '@/services/firebase/firebase';
import GoogleButton from "@/components/Modules/SignIn/GoogleBtn";
import ClipPathUp from "@/components/Modules/Element/ClipPathUp";
import { apiInstanceExpress } from '@/services/express/apiInstance';
import ClipPathDown from "@/components/Modules/Element/ClipPathDown";

const SignUp = ({ className, ...props }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (password !== confirmPassword) {
            toast.error("Password dan Konfirmasi Password tidak cocok!", {
                duration: 3000,
            });
            return setIsLoading(false);
        }

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
                    toast.success("Pendaftaran berhasil! Mengarahkan ke halaman login...", {
                        duration: 3000,
                    });
                    
                    setTimeout(() => {
                        navigate("/sign-in")
                    }, 2000);
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
            
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="realtive flex w-full h-full items-center justify-center p-6">
            <Toaster />
            
            <ClipPathUp />

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
                                    <Input 
                                        id="name" 
                                        type="text" 
                                        placeholder="Masukkan nama Anda" 
                                        onChange={(e) => setName(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                        id="email" 
                                        type="email" 
                                        placeholder="contoh@email.com" 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Kata Sandi</Label>
                                    <Input 
                                        id="password" 
                                        type="password" 
                                        placeholder="Masukkan kata sandi" 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="confirm-password">Konfirmasi Kata Sandi</Label>
                                    <Input 
                                        id="confirm-password" 
                                        type="password" 
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Ulangi kata sandi" 
                                        required 
                                    />
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
                                <GoogleButton text={"Daftar dengan Google"}/>
                                <p className="mt-4 text-center text-sm">
                                    Sudah punya akun?{" "}
                                    <a href="/sign-in" className="text-blue-500 underline">Masuk</a>
                                </p>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <ClipPathDown />
        </div>
    )
}

export default SignUp