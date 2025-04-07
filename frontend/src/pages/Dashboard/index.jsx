import React from 'react';
import { toast } from 'sonner';
import { useAtom } from 'jotai';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { userAtomStorage } from '@/jotai/atoms'
import { auth } from '@/services/firebase/firebase';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { apiInstanceExpress } from '@/services/express/apiInstance';


const Dashboard = () => {
    const [user, setUser] = useAtom(userAtomStorage);

    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            const signOutToken = await apiInstanceExpress.delete("sign-in", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            });

            if (signOutToken.status === 204) {
                signOut(auth).then(() => {
                    setUser(null);
                    navigate("/");
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("Logout gagal, coba lagi !", {
                duration: 3000,
            });
        }
    };

    return (
        <DefaultLayout>
            <div className="w-full h-screen flex items-center justify-center">
                <button 
                    type="submit"
                    onClick={handleSignOut}
                    className="text-sm text-white px-5 py-3 rounded my-1 bg-blue-600 cursor-pointer"
                >
                    Sign out
                </button>
                {user.role === "user" && <p>Welcome User</p>}
                {user.role === "admin" && <p>Welcome Admin</p>}
                {user.role === "author" && <p>Welcome Author</p>}
            </div>
        </DefaultLayout>
    )
}

export default Dashboard