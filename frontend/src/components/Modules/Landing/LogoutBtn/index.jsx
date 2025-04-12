import React from 'react'
import { toast } from 'sonner';
import { useAtom } from 'jotai';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getIdToken, signOut } from 'firebase/auth';

import { userAtomStorage } from '@/jotai/atoms';
import { auth } from '@/services/firebase/firebase';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { apiInstanceExpress } from '@/services/express/apiInstance';

const LogoutBtn = ({ isMobile }) => {
    const [, setUser] = useAtom(userAtomStorage);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            const token = await getIdToken(auth.currentUser);
            const signOutToken = await apiInstanceExpress.delete("sign-in", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (signOutToken.status === 204) {
                toast.success("Log Out berhasil !");

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
        <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className={`${isMobile ? "" : "mr-2 h-4 w-4"}`} />
            Keluar
        </DropdownMenuItem>
    )
}

export default LogoutBtn