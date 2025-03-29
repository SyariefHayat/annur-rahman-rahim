import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React, { useState } from 'react'
import Navbar from '../Landing/Navbar'
import { useParams } from 'react-router-dom'
import Footer from '@/components/Modules/Landing/Footer'
import { LIST_CAMPAIGN } from '@/constants/listCampaign'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const DetailDonasi = () => {
    const { id } = useParams();
    const index = parseInt(id, 10);
    const campaign = LIST_CAMPAIGN[index];
    const [formatAmount, setFormatAmount] = useState("");

    const stats = [
        { id: 1, name: 'Target Pendanaan', value: '1.000.000' },
        { id: 2, name: 'Dana Terkumpul', value: '100.000' },
        { id: 3, name: 'Presentase', value: '10%' },
    ]

    const handleAmountChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, ""); // Hanya angka
        setFormatAmount(rawValue ? `Rp ${parseInt(rawValue).toLocaleString("id-ID")}` : "Rp ");
        
        form.setValue("amount", rawValue);
    };

    return (
        <DefaultLayout>
            <Navbar position="relative" />
            <section className="overflow-hidden py-14 sm:py-24">
                <div className="mx-auto max-w-7xl">
                    <article className="mx-auto max-w-2xl grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <figure>
                            <img src={campaign.backgroundImage} alt={campaign.title} className="w-full h-full max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 md:-ml-4 lg:-ml-0 object-cover object-center" />
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
                            <p className="mt-6 text-lg/8 text-gray-600">{campaign.description}</p>
                            
                            {/* <Progress value={33} /> */}
                            <div className="bg-white my-8">
                                <div className="mx-auto max-w-7xl">
                                    <dl className="flex flex-wrap justify-between gap-8 text-center">
                                    {stats.map((stat) => (
                                        <div key={stat.id} className="flex flex-col items-center max-w-xs gap-y-4 border p-6 rounded-lg shadow-md">
                                        <dt className="text-base text-gray-600">{stat.name}</dt>
                                        <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                                            {stat.value}
                                        </dd>
                                        </div>
                                    ))}
                                    </dl>
                                </div>
                                <div className="my-8">
                                    <Input
                                        type="text"
                                        value={formatAmount}
                                        onChange={handleAmountChange}
                                        placeholder="Masukkan nominal"
                                        className="py-5"
                                    />
                                    <Button className="w-full mt-5 cursor-pointer">
                                        Pilih Metode Pembayaran
                                    </Button>
                                </div>
                            </div>
                        </section>
                    </article>
                </div>
            </section>
            <Footer />
        </DefaultLayout>
    );
};

export default DetailDonasi;