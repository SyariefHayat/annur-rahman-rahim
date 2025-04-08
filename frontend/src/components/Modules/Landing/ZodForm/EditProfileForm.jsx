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
import { Textarea } from '@/components/ui/textarea';

const EditSchema = z.object({
    name: z.string()
        .min(1, { message: "Masukkan Nama baru anda" })
        .trim()
        .refine((val) => /^[a-zA-Z\s']+$/.test(val), {
            message: "Nama hanya boleh berisi huruf"
        }),

    email: z.string()
        .min(1, { message: "Masukkan email baru anda" })
        .email({ message: "Format email tidak valid" }),

    bio: z.string()
        .min(1, { message: "Pesan wajib diisi" })
        .max(150, { message: "Pesan maksimal 150 karakter" }),
})

const EditProfileForm = ({ user }) => {
    const form = useForm({
        resolver: zodResolver(EditSchema),
        defaultValues: {
            name: "",
            email: "",
            bio: "",
        }
    })

    const onSubmit = async (data) => {
        alert(`Nama: ${data.name}
Email: ${data.email}
Bio: ${data.bio}
            `)
        }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-xl mx-auto">
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
                            <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <Button>Simpan</Button>
            </form>
        </Form>
    )
}

export default EditProfileForm