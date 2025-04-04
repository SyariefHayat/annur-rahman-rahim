import { z } from "zod"
import { Heart } from "lucide-react"
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useParams } from 'react-router-dom'
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"

import Navbar from '../Landing/Navbar'
import EachUtils from "@/utils/EachUtils"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Switch } from "@/components/ui/switch"
import { Toggle } from "@/components/ui/toggle"
import { LIST_PRAY } from "@/constants/listPray"
import { LIST_STATS } from "@/constants/listStat"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { LIST_DONATUR } from "@/constants/listDonatur"
import Footer from '@/components/Modules/Landing/Footer'
import { LIST_CAMPAIGN } from '@/constants/listCampaign'
import { ScrollArea } from "@/components/ui/scroll-area"
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const FormSchema = z.object({
    fullName: z.string()
        .min(1, { message: "Masukkan Nama Lengkap" })
        .trim()
        .refine((val) => /^[a-zA-Z\s']+$/.test(val), {
            message: "Nama hanya boleh berisi huruf"
        }),

    email: z.string()
        .min(1, { message: "Masukkan email anda" })
        .email({ message: "Format email tidak valid" }),

    amount: z.string()
        .min(1, { message: "Masukkan nominal" })
        .regex(/^\d+$/, { message: "Nominal harus berupa angka" })
        .transform((val) => parseInt(val, 10))
        .refine((val) => val >= 5000, { message: "Nominal minimal Rp 5000" }),

    message: z.string()
        .optional()
        .refine((val) => !val || val.length <= 280, {
            message: "Pesan maksimal 280 karakter",
        }),

    isAnonymous: z.boolean().default(false),
})

const DetailDonasi = () => {
    const { id } = useParams();
    const index = parseInt(id, 10);
    const campaign = LIST_CAMPAIGN[index];

    const [prayers, setPrayers] = useState([10, 17, 4]);
    const [isPrays, setIsPrays] = useState([false, false, false]);

    const handleTogglePray = (index) => {
        setPrayers((prev) => {
            const updated = [...prev];
            updated[index] = isPrays[index] ? updated[index] - 1 : updated[index] + 1;
            return updated;
        });

        setIsPrays((prev) => {
            const updated = [...prev];
            updated[index] = !prev[index];
            return updated;
        })
    }

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fullName: "",
            email: "",
            amount: "",
            message: "",
            isAnonymous: false,
        },
    })

    const formatAmount = (value) => {
        if (!value) return "";
        return `Rp ${Number(value).toLocaleString("id-ID")}`;
    }

    const onSubmit = async (data) => {
        alert(`Nama Lengkap: ${data.fullName}
Email: ${data.email}
Nominal: ${data.amount}
Message: ${data.message}
isAnonim: ${data.isAnonymous}
            `)
    } 

    return (
        <DefaultLayout>
            <Navbar position="relative" />
            <section className="overflow-hidden px-6">
                <div className="mx-auto max-w-7xl">
                    <article className="mx-auto max-w-2xl grid grid-cols-1 gap-x-8 gap-y-4 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <figure>
                            <img src={campaign.backgroundImage} alt={campaign.title} className="w-full max-h-screen sm:h-screen max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 md:-ml-4 lg:-ml-0 object-cover object-center" />
                        </figure>
                        
                        <section className="lg:pt-4 lg:pr-8">
                            <div className="relative my-8 flex items-center gap-x-4">
                                <img alt={campaign.author.name} src={campaign.author.imageUrl} className="size-10 rounded-full bg-gray-50" />
                                <div className="text-sm/6">
                                    <p className="font-semibold text-gray-900">
                                        <a href={campaign.author.href} className="hover:underline">
                                            {campaign.author.name}
                                        </a>
                                    </p>
                                    <p className="text-gray-600">{campaign.author.role}</p>
                                </div>
                            </div>
                            <div className="lg:max-w-lg">
                                <h2 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">{campaign.title}</h2>
                            </div>
                            <p className="my-6 text-lg/8 text-gray-600">{campaign.description}</p>
                            
                            <div>
                                <dl className="grid gap-8 grid-cols-2 lg:grid-cols-3">
                                    <EachUtils
                                        of={LIST_STATS}
                                        render={(item, index) => (
                                            <div key={index} className="flex flex-col-reverse gap-1">
                                                <dt className="text-base text-gray-600">{item.name}</dt>
                                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                                                    {item.value}
                                                </dd>
                                            </div>
                                        )}
                                    />
                                </dl>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="my-6 cursor-pointer">Donasi Sekarang</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Ingin Berdonasi ?</DialogTitle>
                                            <DialogDescription>
                                                Terima kasih atas niat baik Anda untuk berdonasi. Silakan lanjutkan proses donasi dengan mengisi informasi yang diperlukan.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-5 w-full">
                                                <FormField control={form.control} name="fullName" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Nama Lengkap</FormLabel>
                                                            <FormControl>
                                                                <Input type="text" placeholder="John Doe" {...field}
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField control={form.control} name="email" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Email</FormLabel>
                                                            <FormControl>
                                                                <Input type="email" placeholder="example@gmail.com" {...field}/>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField control={form.control} name="amount" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Nominal</FormLabel>
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
                                                    )}
                                                />

                                                <FormField control={form.control} name="message" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Sertakan doa dan dukungan (opsional)</FormLabel>
                                                            <Textarea placeholder="Tulis doa untuk penggalang dana atau dirimu agar bisa diamini oleh orang baik lainnya" {...field} />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField control={form.control} name="isAnonymous" render={({ field }) => (
                                                        <FormItem className="flex items-center space-x-2">
                                                            <FormLabel>Sembunyikan nama saya</FormLabel>
                                                            <FormControl>
                                                                <Switch checked={field.value} onCheckedChange={field.onChange}/>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />

                                                <Button>Pilih Metode Pembayaran</Button>
                                            </form>
                                        </Form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </section>
                    </article>

                    <Tabs defaultValue="campaign-story" className="w-full mt-0 sm:mt-14">
                        <TabsList className="gap-4 w-full sm:w-fit">
                            <TabsTrigger value="campaign-story">Cerita</TabsTrigger>
                            <TabsTrigger value="campaign-donation">Donasi <span className="text-blue-500">1000</span></TabsTrigger>
                            <TabsTrigger value="campaign-pray">Doa Orang Baik</TabsTrigger>
                        </TabsList>

                        <TabsContent value="campaign-story" className="mt-4">
                            <Card>
                                <CardContent>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Cerita Penggalangan Dana</h2>
                                    <p className="text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed itaque et nam est qui explicabo adipisci tempora nulla ullam a iste pariatur laboriosam, esse quidem. Facere, quia eligendi? Dolores, voluptatum! Incidunt eveniet consequuntur sint itaque vel necessitatibus officia doloremque aliquam maxime in tempora optio similique fugit odit reprehenderit esse quae quo quas iste praesentium qui, pariatur ut totam? Minima, beatae. Dolorem labore fugiat minus sint, quidem minima beatae voluptas, hic cum, neque officia corrupti. Dolores maxime corrupti, tenetur quas reiciendis rerum expedita! Ut unde amet molestias deserunt? Natus laboriosam a dicta alias quasi assumenda at et molestias possimus, ipsum explicabo?</p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="campaign-donation" className="mt-4">
                            <ScrollArea className={`${LIST_DONATUR.length > 8 ? "h-[420px]" : "h-auto"} w-full pr-2`}>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <EachUtils
                                        of={LIST_DONATUR}
                                        render={(item, index) => (
                                            <Card key={index}>
                                                <CardContent className="flex items-center gap-x-4">
                                                    <Avatar className="w-14 h-14">
                                                        <AvatarImage src="https://github.com/shadcn.png" />
                                                        <AvatarFallback>CN</AvatarFallback>
                                                    </Avatar>

                                                    <div className="text-sm/6">
                                                        <p className="font-semibold text-gray-900">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-gray-600">
                                                            Berdonasi sebesar <span className="font-semibold text-gray-900">{item.amount}</span>
                                                        </p>
                                                        <p className="text-xs/6 text-gray-600">{item.time}</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            
                                        )}
                                    />
                                </div>
                            </ScrollArea>
                        </TabsContent>

                        <TabsContent value="campaign-pray" className="mt-4">
                            <ScrollArea className={`${LIST_PRAY.length > 5 ? "h-[600px] sm:h-[540px]" : "h-auto"} w-full pr-2`}>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <EachUtils
                                        of={LIST_PRAY}
                                        render={(item, index) => (
                                            <Card key={index} className="gap-2 pb-0">
                                                <CardHeader>
                                                    <div className="flex items-center gap-x-4">
                                                        <Avatar className="w-10 h-10">
                                                            <AvatarImage src="https://github.com/shadcn.png" />
                                                            <AvatarFallback>CN</AvatarFallback>
                                                        </Avatar>

                                                        <div className="text-sm/6">
                                                            <p className="font-semibold text-gray-900">
                                                                {item.name}
                                                            </p>
                                                            <p className="text-gray-600">{item.time}</p>
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="flex flex-col">
                                                        <p className="text-gray-600">{item.pray}</p>

                                                        <p className=" text-sm/6 mt-5 text-gray-600"><span className="text-gray-900 font-semibold">{prayers[index]} Orang</span> mengaminkan doa ini</p>
                                                    </div>
                                                </CardContent>
                                                <Separator className="mt-2"/>
                                                <CardFooter className="mb-3 mt-1">
                                                    <Toggle aria-label="Pray" pressed={isPrays[index]} onPressedChange={() => handleTogglePray(index)} className="mx-auto cursor-pointer">
                                                        <Heart className={`${isPrays[index] ? "text-red-400" : ""}`}/> Amin
                                                    </Toggle>
                                                </CardFooter>
                                            </Card>
                                        )}
                                    />
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
            <Footer />
        </DefaultLayout>
    );
};

export default DetailDonasi;