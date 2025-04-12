import { z } from "zod";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Textarea } from '@/components/ui/textarea';
import { apiInstanceExpress } from "@/services/express/apiInstance";

const EditSchema = z.object({
    name: z.string()
        .min(1, { message: "Masukkan Nama baru anda" })
        .trim()
        .refine((val) => /^[a-zA-Z\s']+$/.test(val), {
            message: "Nama hanya boleh berisi huruf"
        }),

    email: z.string()
        .min(1, { message: "Masukkan email baru anda" })
        .trim()
        .email({ message: "Format email tidak valid" }),

    bio: z.string()
        .min(1, { message: "Pesan wajib diisi" })
        .trim()
        .max(150, { message: "Pesan maksimal 150 karakter" }),
})

const EditProfile = () => {
    const [isLoading, setIsloading] = useState(false)
    const [user, setUser] = useAtom(userAtomStorage);

    const form = useForm({
        resolver: zodResolver(EditSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            bio: user.bio,
        }
    })

    const updateUser = async (data) => {
        setIsloading(true);

        try {
            const userId = user.id;
            if (!userId) throw new Error("User ID tidak ditemukan");
        
            const updatedData = {
                name: data.name,
                email: data.email,
                bio: data.bio,
            };

            const isDataSame = (
                updatedData.name === user.name &&
                updatedData.email === user.email &&
                updatedData.bio === user.bio
            );

            if (isDataSame) {
                toast.success("Tidak ada perubahan data");
                return;
            }
        
            const response = await apiInstanceExpress.put(`update-user/${user.id}`, 
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    }
                }
            );

            const updated = response.data.data;
        
            if (response.status === 200) {
                setUser({
                    name: updated.name,
                    email: updated.email,
                    bio: updated.bio,
                    role: updated.role,
                    token: updated.token,
                    id: updated._id
                })

                setTimeout(() => {
                    setIsloading(false);
                    toast.success("Profile berhasil di perbarui!")
                }, 2000)
            }
            } catch (error) {
                setIsloading(false);
                console.error(error);
                toast.error("Terjadi kesalahan saat memperbarui profil", {
                    duration: 3000,
                });
            }
        };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(updateUser)} className="flex flex-col gap-6 max-w-xl mx-auto">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nama</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder={user.name} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" placeholder={user.email} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="bio" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                            <Textarea placeholder={user.bio} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                {isLoading ? (
                    <Button className="w-full" disabled>
                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                        Menyimpan...
                    </Button>
                ) : (
                    <Button>Simpan</Button>
                )}
            </form>
        </Form>
    )
}

export default EditProfile