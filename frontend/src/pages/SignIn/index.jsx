import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { emailStorageAtom, tokenStorageAtom } from '@/jotai/atoms';
import { apiInstanceExpress } from '@/services/express/apiInstance';
import { auth, provider } from '@/services/firebase/firebase';
import { getIdToken, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react'
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

const SignIn = ({ className, ...props }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [data, setData] = useState(null);

    const [emailStorage, setEmailStorage] = useAtom(emailStorageAtom);
    const [tokenStorage, setTokenStorage] = useAtom(tokenStorageAtom);

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
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
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
                                        <Input id="password" type="password" required />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Login
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        Login dengan Google
                                    </Button>
                                </div>
                                <div className="mt-4 text-center text-sm">
                                    Belum punya akun?{" "}
                                    <a href="#" className="underline underline-offset-4">
                                        Sign up
                                    </a>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default SignIn