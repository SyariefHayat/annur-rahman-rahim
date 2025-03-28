import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'
import Navbar from '../Landing/Navbar'
import { useParams } from 'react-router-dom'
import Footer from '@/components/Modules/Landing/Footer'
import { LIST_CAMPAIGN } from '@/constants/listCampaign'

const DetailDonasi = () => {
    const { id } = useParams();
    const index = parseInt(id, 10);
    const campaign = LIST_CAMPAIGN[index];

    return (
        <DefaultLayout>
            <Navbar position="relative" />
            <section className="overflow-hidden py-14 sm:py-24">
                <div className="mx-auto max-w-7xl">
                    <article className="mx-auto max-w-2xl grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <figure>
                            <img src={campaign.backgroundImage} alt={campaign.title} className="w-full h-screen max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 md:-ml-4 lg:-ml-0 object-cover object-center" />
                        </figure>
                        
                        <section className="lg:pt-4 lg:pr-8">
                            <header className="lg:max-w-lg">
                                <h2 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">{campaign.title}</h2>
                            </header>
                            <p className="mt-6 text-lg/8 text-gray-600">{campaign.description}</p>
                            <footer className="relative mt-8 flex items-center gap-x-4">
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
                        </section>
                    </article>
                </div>
            </section>
            <Footer />
        </DefaultLayout>
    );
};

export default DetailDonasi;