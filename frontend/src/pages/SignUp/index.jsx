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

const SignUp = ({ className, ...props }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const register = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            )

            if (register) {
                await signOut(auth);

                const addUser = await apiInstanceExpress.post("sign-up", {
                    email,
                    password,
                });

                if (addUser.status === 201) {
                    setTimeout(() => {
                        navigate("/sign-in")
                    }, 2000)
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleGoogleSignUp = async (e) => {
        e.preventDefault();

        try {
            const signUp = await signInWithPopup(auth, provider);
            
            if (signUp) {
                await signOut(auth);

                const addToken = await apiInstanceExpress.post("sign-up", {
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
        }
    };


    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className={cn("flex flex-col gap-6", className)} {...props}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Daftar</CardTitle>
                            <CardDescription>Buat akun baru dengan mengisi formulir di bawah ini</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* <form onSubmit={handleSubmit} className="flex flex-col gap-6"> */}
                            <form className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nama Lengkap</Label>
                                <Input id="name" type="text" placeholder="Masukkan nama Anda" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="contoh@email.com" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Kata Sandi</Label>
                                <Input id="password" type="password" placeholder="Masukkan kata sandi" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirm-password">Konfirmasi Kata Sandi</Label>
                                <Input id="confirm-password" type="password" placeholder="Ulangi kata sandi" required />
                            </div>
                            <Button type="submit" className="w-full">
                                Daftar
                            </Button>
                            <Button variant="outline" className="w-full">
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
        </div>
    )
}

export default SignUp