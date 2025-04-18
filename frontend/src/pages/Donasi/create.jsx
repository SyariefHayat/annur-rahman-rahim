import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/formatDate';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';

const PostDonationSchema = z.object({
    image: z.any()
        .refine(
            (file) => file instanceof File || (file && file.length > 0),
            { message: "Image harus diisi"}
        ),

    category: z.string()
        .min(1, { message: "Kategori harus diisi" }),

    title: z.string()
        .min(1, { message: "Judul harus diisi" })
        .trim()
        .refine((val) => /^[a-zA-Z\s']+$/.test(val), {
            message: "Nama hanya boleh berisi huruf"
        }),
    
    description: z.string()
        .trim()
        .min(1, { message: "Deskripsi harus diisi" })
        .max(280, { message: "Pesan maksimal 280 karakter" }),
    
    targetAmount: z.string()
        .min(1, { message: "Masukkan nominal target" })
        .regex(/^\d+$/, { message: "Nominal harus berupa angka" })
        .transform((val) => parseInt(val, 10))
        .refine((val) => val >= 100_000, { message: "Target donasi minimal Rp 100.000" }),

    deadline: z
        .preprocess((arg) => {
            if (typeof arg === 'string' || arg instanceof Date) {
                return new Date(arg);
            }
            return arg;
        }, z.date({ required_error: "Tanggal harus diisi" }))
        .refine((date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date >= today;
        }, { message: "Tanggal tidak boleh di masa lalu" }),
})

const CreateDonation = () => {
    const fileInputRef = useRef(null);
    const [image, setImage] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const MAX_SIZE = 5 * 1024 * 1024;

        if (file && file.size > MAX_SIZE) {
            alert('Ukuran file maksimal 5MB');
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
        form.setValue("image", file);
    };

    const form = useForm({
        resolver: zodResolver(PostDonationSchema),
        defaultValues: {
            image: "",
            category: "",
            title: "",
            description: "",
            targetAmount: "",
            deadline: "",
        }
    })

    const formatAmount = (value) => {
        if (!value) return "";
        return `Rp ${Number(value).toLocaleString("id-ID")}`;
    }

    const onSubmit = async (data) => {
        console.log(data);
        alert("berhasil");
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="min-h-screen mx-auto px-5 py-12 w-full h-full lg:max-w-2xl items-start bg-white text-neutral-900">
                <FormField control={form.control} name="image" render={() => (
                    <FormItem>
                        <div onClick={() => fileInputRef.current?.click()} className="w-full h-80 bg-gray-300 rounded-md cursor-pointer">
                            <img src={image} alt="Preview" className={`w-full h-full object-cover object-center rounded-md ${!image && "hidden" }`} />
                        </div>
                        <FormControl>
                            <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem className="my-5">
                        <FormLabel>Kategori :</FormLabel>
                        <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Apa kategori campaign anda" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="kesehatan">Kesehatan</SelectItem>
                                    <SelectItem value="pendidikan">Pendidikan</SelectItem>
                                    <SelectItem value="bencana alam">Bencana Alam</SelectItem>
                                    <SelectItem value="kemanusiaan & sosial">Kemanusiaan & Sosial</SelectItem>
                                    <SelectItem value="Pembangunan Fasilitas">Pembangunan Fasilitas</SelectItem>
                                    <SelectItem value="acara khusus">Acara Khusus</SelectItem>
                                    <SelectItem value="darurat">Darurat</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Judul :</FormLabel>
                        <FormControl>
                            <Input placeholder="Masukkan judul campaign" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem className="my-5">
                        <FormLabel>Deskripsi :</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Tuliskan deskripsi campaign Anda di sini..." className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="targetAmount" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Target Donasi :</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                inputMode="numeric"
                                value={formatAmount(field.value)}
                                onChange={(e) => {
                                    const raw = e.target.value.replace(/[^\d]/g, "");
                                    field.onChange(raw);
                                }}
                                placeholder="Rp"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="deadline" render={({ field }) => (
                    <FormItem className="my-5 w-1/3">
                        <FormLabel>Campaign Berakhir</FormLabel>
                        <Popover>
                            <PopoverTrigger>
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? formatDate(field.value) : <span>Pilih tanggal</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )} />

                <Button type="submit">Kirim</Button>
            </form>
        </Form>
    )
}

export default CreateDonation