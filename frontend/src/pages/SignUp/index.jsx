import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { apiInstanceExpress } from '@/services/express/apiInstance';
import { auth, provider } from '@/services/firebase/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
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
        <DefaultLayout>
            <div className="flex items-center justify-center mt-20">
                <div className="w-96 border rounded bg-white px-7 py-10">
                    <form>
                        <h4 className="text-2xl mb-7">SignUp</h4>
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Masukkan password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
                        />
                        <button 
                            type="submit"
                            onClick={handleSignUp}
                            className="w-full text-sm bg-primary text-white p-2 rounded my-1 bg-blue-600">
                            Create Account
                        </button>
                        <p className="text-sm text-center mt-4">
                            Alredy have an account?{" "}
                            <a href="/sign-in" className="text-blue-600">
                                Login
                            </a>
                        </p>
                    </form>
                    <div className="w-full h-0.5 rounded bg-gray-400"></div>
                    <button
                        type="submit"
                        onClick={handleGoogleSignUp}
                        className="w-full text-sm bg-primary text-white p-2 rounded my-1 bg-blue-600 cursor-pointer"
                    >
                        Login with google
                    </button>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default SignUp