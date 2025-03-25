import React from 'react';
import { toast } from 'sonner';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { getIdToken, signInWithPopup } from 'firebase/auth';

import { Button } from '@/components/ui/button';
import { auth, provider } from '@/services/firebase/firebase';
import { emailStorageAtom, tokenStorageAtom } from '@/jotai/atoms';
import { apiInstanceExpress } from '@/services/express/apiInstance';

const GoogleButton = ({ text }) => {
    const [, setEmailStorage] = useAtom(emailStorageAtom);
    const [, setTokenStorage] = useAtom(tokenStorageAtom);

    const navigate = useNavigate();

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
    
        try {
            const signIn = await signInWithPopup(auth, provider);
    
            if (signIn) {
                const email = signIn.user.email;
                const name = signIn.user.displayName;
                const firebaseToken = await getIdToken(signIn.user);
    
                let userExists = false;
    
                try {
                    // Cek apakah email sudah terdaftar di database
                    const checkEmail = await apiInstanceExpress.get(`check-user/${email}`);

                    if (checkEmail.status === 200) {
                        userExists = true;
                    }
                } catch (error) {
                    if (error.response?.status === 404) {
                        userExists = false;
                    } else {
                        console.error("Error checking user:", error);
                        toast.error("Terjadi kesalahan saat memeriksa email anda.");
                        return;
                    }
                }
    
                // Jika user belum ada di database, buat akun baru
                if (!userExists) {
                    try {
                        await apiInstanceExpress.post("sign-up", {
                            name,
                            email,
                        });
                    } catch (error) {
                        console.error("Error signing up:", error);
                        toast.error("Gagal mendaftarkan akun.");
                        return;
                    }
                }
    
                // Login user ke backend
                try {
                    const addToken = await apiInstanceExpress.post("sign-in", {
                        email,
                        token: firebaseToken,
                    });
    
                    if (addToken.status === 200) {
                        setEmailStorage(email);
                        setTokenStorage(firebaseToken);

                        toast.success("Login berhasil !");
    
                        setTimeout(() => {
                            navigate("/dashboard");
                        }, 2000);
                    }
                } catch (error) {
                    console.error("Error signing in:", error);
                    toast.error("Login gagal. Silakan coba lagi.");
                }
            }
        } catch (error) {
            console.error("Sign-in Error:", error);
            toast.error("Gagal login dengan Google.");
        }
    };

    return (
        <Button variant="outline" onClick={handleGoogleSignIn} className="w-full cursor-pointer">
            {text}
        </Button>
    );
};

export default GoogleButton;
