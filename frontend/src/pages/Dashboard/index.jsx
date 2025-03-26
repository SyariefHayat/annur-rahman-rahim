import useUserRole from '@/hooks/useUserRole';
import { emailStorageAtom, tokenStorageAtom, userAtom } from '@/jotai/atoms'
import { apiInstanceExpress } from '@/services/express/apiInstance';
import { auth } from '@/services/firebase/firebase';
import { signOut } from 'firebase/auth';
import { useAtom } from 'jotai'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [emailStorage, setEmailStorage] = useAtom(emailStorageAtom);
    const [tokenStorage, setTokenStorage] = useAtom(tokenStorageAtom);
    const [user] = useAtom(userAtom);

    // const { role, loading } = useUserRole();

    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            const data = { email: emailStorage, token: tokenStorage }
            const signOutToken = await apiInstanceExpress.delete("sign-in", {
                data,
            });

            if (signOutToken.status === 204) {
                signOut(auth).then(() => {
                    setEmailStorage(null);
                    setTokenStorage(null);

                    navigate("/")
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
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
    )
}

export default Dashboard