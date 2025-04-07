import React from 'react';
import { useAtom } from 'jotai';

import { userAtomStorage } from '@/jotai/atoms'
import DefaultLayout from '@/components/Layouts/DefaultLayout';


const Dashboard = () => {
    const [user] = useAtom(userAtomStorage);
    //     try {
    //         const signOutToken = await apiInstanceExpress.delete("sign-in", {
    //             headers: {
    //                 Authorization: `Bearer ${user.token}`,
    //             }
    //         });

    //         if (signOutToken.status === 204) {
    //             signOut(auth).then(() => {
    //                 setUser(null);
    //                 navigate("/");
    //             });
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         toast.error("Logout gagal, coba lagi !", {
    //             duration: 3000,
    //         });
    //     }
    // };

    return (
        <DefaultLayout>
            <div className="w-full h-screen flex items-center justify-center">
                {user.role === "user" && <p>Welcome User</p>}
                {user.role === "admin" && <p>Welcome Admin</p>}
                {user.role === "author" && <p>Welcome Author</p>}
            </div>
        </DefaultLayout>
    )
}

export default Dashboard