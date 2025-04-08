import { z } from "zod"
import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"

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
    const form = useForm({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
        }
    })

    const changePassword = async (data) => {
        try {
            const user = auth.currentUser;
        
            if (!user) throw new Error("Tidak ada user yang login");
        
            // Reauthenticate (wajib sebelum ubah password)
            const credential = EmailAuthProvider.credential(user.email, data.oldPassword);
            await reauthenticateWithCredential(user, credential);
        
            // Update password
            await updatePassword(user, data.newPassword);
        
            console.log("Password berhasil diperbarui");
        } catch (error) {
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