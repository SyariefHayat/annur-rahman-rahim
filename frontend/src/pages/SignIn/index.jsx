import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { emailStorageAtom, tokenStorageAtom } from '@/jotai/atoms';
import { apiInstanceExpress } from '@/services/express/apiInstance';
import { auth, provider } from '@/services/firebase/firebase';
import { getIdToken, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
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
        <DefaultLayout>
            <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
                <h2 className="text-xl font-medium text-black py-2">Yatalatop</h2>
            </div>
            <div className="flex items-center justify-center mt-20">
                <div className="w-96 border rounded bg-white px-7 py-10">
                    <form>
                        <h4 className="text-2xl mb-7">Login</h4>
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Masukkan Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
                        />
                        <button 
                            type="submit"
                            onClick={handleSignIn}
                            className="w-full text-sm bg-primary text-white p-2 rounded my-1 bg-blue-600 cursor-pointer"
                        >
                            Login
                        </button>
                        <div className="w-full h-0.5 rounded bg-gray-400"></div>
                        <button
                            type="submit"
                            onClick={handleGoogleSignIn}
                            className="w-full text-sm bg-primary text-white p-2 rounded my-1 bg-blue-600 cursor-pointer"
                        >
                            Login with google
                        </button>
                        <p className="text-sm text-center mt-4">
                            Not Registered yet?{" "}
                            <a href="/sign-up" className="text-blue-600">
                                Create an Account
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default SignIn