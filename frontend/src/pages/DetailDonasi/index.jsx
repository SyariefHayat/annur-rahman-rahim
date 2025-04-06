import React from 'react'
import { useParams } from 'react-router-dom'

import Navbar from '../Landing/Navbar'
import EachUtils from "@/utils/EachUtils"
import { LIST_STATS } from "@/constants/listStat"
import { Progress } from "@/components/ui/progress"
import Footer from '@/components/Modules/Landing/Footer'
import { LIST_CAMPAIGN } from '@/constants/listCampaign'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import TabsDonation from '@/components/Modules/Landing/TabsDonation'
import DialogDonation from "@/components/Modules/Landing/DialogDonation"

const DetailDonasi = () => {
    const { id } = useParams();
    const index = parseInt(id, 10);
    const campaign = LIST_CAMPAIGN[index];

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
                            <header className="relative my-8 flex items-center gap-x-4">
                                <img alt={campaign.author.name} src={campaign.author.imageUrl} className="size-10 rounded-full bg-gray-50" />
                                <div className="text-sm/6">
                                    <p className="font-semibold text-gray-900">
                                        <a href={campaign.author.href} className="hover:underline">
                                            {campaign.author.name}
                                        </a>
                                    </p>
                                    <p className="text-gray-600">{campaign.author.role}</p>
                                </div>
                            </header>

                            <div className="lg:max-w-lg">
                                <h2 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">{campaign.title}</h2>
                            </div>

                            <p className="my-6 text-lg/8 text-gray-600">{campaign.description}</p>
                            
                            <Progress 
                                value={Math.min((campaign.collected / campaign.target) * 100, 100)}
                                className="h-2 my-8 [&>div]:bg-blue-600 bg-gray-200 rounded-full"
                                aria-label={`Progress campaign ${campaign.title}`}
                            />

                            <footer>
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

                                <DialogDonation />
                            </footer>
                        </section>
                    </article>

                    <TabsDonation />
                </div>
            </section>
            <Footer />
        </DefaultLayout>
    );
};

export default DetailDonasi;