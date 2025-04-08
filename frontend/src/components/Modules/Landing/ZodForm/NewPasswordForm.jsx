import { z } from "zod"
import React from 'react'
import { toast } from "sonner";
import { useAtom } from "jotai";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"

import { 
    EmailAuthProvider, 
    reauthenticateWithCredential, 
    updatePassword 
} from "firebase/auth";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { userAtomStorage } from "@/jotai/atoms";
import { auth } from "@/services/firebase/firebase";
import { apiInstanceExpress } from "@/services/express/apiInstance";

const NewPasswordSchema = z.object({
    oldPassword: z.string()
        .min(1, { message: "Masukkan kata sandi lama" }),

    newPassword: z.string()
        .min(8, { message: "Password minimal 8 karakter" })
        .regex(/[A-Z]/, { message: "Password harus mengandung huruf besar" })
        .regex(/[a-z]/, { message: "Password harus mengandung huruf kecil" })
        .regex(/[0-9]/, { message: "Password harus mengandung angka" })
        .regex(/[^A-Za-z0-9]/, { message: "Password harus mengandung simbol" }),
})

const NewPasswordForm = () => {
    const [user, setUser] = useAtom(userAtomStorage);

    const form = useForm({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
        }
    })

    const changePassword = async (data) => {
        try {
            const firebaseUser = auth.currentUser;
        
            if (!firebaseUser) throw new Error("Tidak ada user yang login");
        
            // Reauthenticate (wajib sebelum ubah password)
            const credential = EmailAuthProvider.credential(firebaseUser.email, data.oldPassword);
            await reauthenticateWithCredential(firebaseUser, credential);
        
            // Update password
            await updatePassword(firebaseUser, data.newPassword);

            const response = await apiInstanceExpress.post(`update-user-password/${user.id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    }
                }
            );

            if (response.status === 200) toast.success("Password berhasil diperbarui");
        } catch (error) {
            if (error.code === "auth/wrong-password") {
                toast.error("Kata sandi lama salah!");
            } else if (error.code === "auth/too-many-requests") {
                toast.error("Terlalu banyak percobaan. Coba lagi nanti.");
            } else {
                toast.error("Gagal mengubah kata sandi. Coba lagi.");
            }
            
            console.error("Gagal mengubah password:", error.message);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(changePassword)} className="flex flex-col gap-6 max-w-xl mx-auto">
                <FormField control={form.control} name="oldPassword" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Kata Sandi Lama</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="newPassword" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Kata Sandi Baru</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <Button>Simpan</Button>
            </form>
        </Form>
    )
}

export default NewPasswordForm