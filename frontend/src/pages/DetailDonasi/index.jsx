import { z } from "zod"
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

import Navbar from '../Landing/Navbar'
import EachUtils from "@/utils/EachUtils"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { LIST_STATS } from "@/constants/listStat"
import Footer from '@/components/Modules/Landing/Footer'
import { LIST_CAMPAIGN } from '@/constants/listCampaign'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LIST_DONATUR } from "@/constants/listDonatur"
import { LIST_PRAY } from "@/constants/listPray"

const AmountSchema = z.object({
    amount: z.string()
        .min(1, { message: "Masukkan nominal" })
        .regex(/^\d+$/, { message: "Nominal harus berupa angka" })
        .transform((val) => Number(val))
        .refine((val) => val >= 5000, { message: "Nominal minimal Rp 5000" })
})

const DetailDonasi = () => {
    const { id } = useParams();
    const index = parseInt(id, 10);
    const campaign = LIST_CAMPAIGN[index];
    const [formatAmount, setFormatAmount] = useState("");

    const form = useForm({
        resolver: zodResolver(AmountSchema),
        defaultValues: {
            amount: "",
        },
    })

    const handleAmountChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, "");
        setFormatAmount(rawValue ? `Rp ${parseInt(rawValue).toLocaleString("id-ID")}` : "");
        
        form.setValue("amount", rawValue);
    };

    const onSubmit = async (data) => {
        alert("Jumlah uang: " + data.amount)
    } 

    return (
        <DefaultLayout>
            <Navbar position="relative" />
            <section className="overflow-hidden py-14 sm:py-24 px-6">
                <div className="mx-auto max-w-7xl">
                    <article className="mx-auto max-w-2xl grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <figure>
                            <img src={campaign.backgroundImage} alt={campaign.title} className="w-full h-full sm:h-screen max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 md:-ml-4 lg:-ml-0 object-cover object-center" />
                        </figure>
                        
                        <section className="lg:pt-4 lg:pr-8">
                            <footer className="relative my-8 flex items-center gap-x-4">
                                <img alt={campaign.author.name} src={campaign.author.imageUrl} className="size-10 rounded-full bg-gray-50" />
                                <div className="text-sm/6">
                                    <p className="font-semibold text-gray-900">
                                        <a href={campaign.author.href} className="hover:underline">
                                            {campaign.author.name}
                                        </a>
                                    </p>
                                    <p className="text-gray-600">{campaign.author.role}</p>
                                </div>
                            </footer>
                            <header className="lg:max-w-lg">
                                <h2 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">{campaign.title}</h2>
                            </header>
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
                                        <Button className="my-6">Donasi Sekarang</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Ingin Berdonasi ?</DialogTitle>
                                            <DialogDescription>
                                                Terima kasih atas niat baik Anda untuk berdonasi. Silakan lanjutkan proses donasi dengan mengisi informasi yang diperlukan.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="my-6 flex flex-col sm:flex-row gap-3 sm:gap-0 w-full items-start space-x-2">
                                                <FormField control={form.control} name="amount" render={() => (
                                                    <FormItem className="w-full">
                                                        <FormLabel>Nominal</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="text"
                                                                inputMode="numeric"
                                                                value={formatAmount}
                                                                onChange={handleAmountChange}
                                                                placeholder="Rp"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                                />
                                            </form>
                                        </Form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </section>
                    </article>

                    <Tabs defaultValue="campaign-story" className="w-full mt-14">
                        <TabsList className="gap-4">
                            <TabsTrigger value="campaign-story">Cerita</TabsTrigger>
                            <TabsTrigger value="campaign-donation">Donasi <span className="text-blue-500">1000</span></TabsTrigger>
                            <TabsTrigger value="campaign-pray">Doa Orang Baik</TabsTrigger>
                        </TabsList>

                        <TabsContent value="campaign-story" className="p-6 bg-muted shadow-md rounded-lg mt-4">
                            <h2 className="text-xl font-semibold mb-2">Cerita Penggalangan Dana</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed itaque et nam est qui explicabo adipisci tempora nulla ullam a iste pariatur laboriosam, esse quidem. Facere, quia eligendi? Dolores, voluptatum! Incidunt eveniet consequuntur sint itaque vel necessitatibus officia doloremque aliquam maxime in tempora optio similique fugit odit reprehenderit esse quae quo quas iste praesentium qui, pariatur ut totam? Minima, beatae. Dolorem labore fugiat minus sint, quidem minima beatae voluptas, hic cum, neque officia corrupti. Dolores maxime corrupti, tenetur quas reiciendis rerum expedita! Ut unde amet molestias deserunt? Natus laboriosam a dicta alias quasi assumenda at et molestias possimus, ipsum explicabo?</p>
                        </TabsContent>

                        <TabsContent value="campaign-donation" className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-5">
                            <EachUtils
                                of={LIST_DONATUR}
                                render={(item, index) => (
                                    <div key={index} className="flex items-center gap-x-4 shadow-md rounded-lg p-5 py-5 bg-muted">
                                        <Avatar className="w-14 h-14">
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>

                                        <div className="text-sm/6">
                                            <p className="font-semibold text-gray-900">
                                                {item.name}
                                            </p>
                                            <p>
                                                Berdonasi sebesar <span className="font-semibold text-gray-900">{item.amount}</span>
                                            </p>
                                            <p className="text-xs/6 text-gray-600">{item.time}</p>
                                        </div>
                                    </div>
                                )}
                            />
                        </TabsContent>

                        <TabsContent value="campaign-pray" className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-5">
                            <EachUtils
                                of={LIST_PRAY}
                                render={(item, index) => (
                                    <div className="shadow-md rounded-lg p-5 py-5 bg-muted">
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

                                        <p className="mt-5">{item.pray}</p>
                                    </div>
                                )}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
            <Footer />
        </DefaultLayout>
    );
};

export default DetailDonasi;