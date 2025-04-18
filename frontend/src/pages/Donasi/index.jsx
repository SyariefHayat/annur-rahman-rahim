import React from 'react'

import Navbar from '../Landing/Navbar'
import EachUtils from '@/utils/EachUtils'
import { Badge } from '@/components/ui/badge'
import { getInitial } from '@/utils/getInitial'
import { Progress } from '@/components/ui/progress'
import Footer from '@/components/Modules/Landing/Footer'
import { LIST_CAMPAIGN } from '@/constants/listCampaign'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import ClipPathUp from '@/components/Modules/Element/ClipPath/ClipPathUp'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ClipPathDown from '@/components/Modules/Element/ClipPath/ClipPathDown'

const Donasi = () => {
    return (
        <DefaultLayout>
            <Navbar />

            <header className="relative w-full h-screen flex items-center justify-center">
                <ClipPathUp />

                <div className="mx-auto max-w-3xl mt-20 px-6 sm:px-8 text-center">
                    <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Jadilah Bagian dari Perubahan</h1>

                    <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">Bantu kami menciptakan dunia yang lebih baik dengan memberikan donasi Anda. Setiap kontribusi, sekecil apa pun, memiliki dampak besar bagi mereka yang membutuhkan.</p>
                </div>

                <ClipPathDown />
            </header>

            <main className="relative">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-300 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        <EachUtils
                            of={LIST_CAMPAIGN}
                            render={(item, index) => (
                                <article key={index} className="relative flex max-w-xl h-[650px] flex-col items-start justify-between overflow-hidden">
                                    <figure className="w-full h-full rounded-xl overflow-hidden">
                                        <img src={`${item.backgroundImage}`} alt={item.title} className="w-full h-full object-cover object-center" />
                                    </figure>

                                    <div className="w-full h-full flex flex-col pt-8">
                                        <header className="flex items-center gap-x-4 text-xs text-gray-600">
                                            <time dateTime={item.datetime}>{item.date}</time>
                                            <Badge className="rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600">
                                                {item.category.title}
                                            </Badge>
                                        </header>

                                        <div>
                                            <a href={item.href}>
                                                <h3 className="mt-4 text-lg/6 font-semibold">{item.title}</h3>
                                            </a>
                                            <p className="mt-4 line-clamp-3 text-sm/6 text-gray-600"> 
                                                {item.description}
                                            </p>
                                        </div>

                                        <div className="my-8 space-y-3">
                                            <Progress 
                                                value={Math.min((item.collected / item.target) * 100, 100)}
                                                className="h-2 [&>div]:bg-blue-600 bg-gray-200 rounded-full"
                                                aria-label={`Progress campaign ${item.title}`}
                                            />
                                            <div className="flex items-center justify-between text-sm text-gray-600">
                                                <p>Terkumpul: <span className="font-semibold">{item.collected.toLocaleString("id-Id")}</span></p>
                                                <p>Dari: <span className="font-semibold">{item.target.toLocaleString("id-Id")}</span></p>
                                            </div>
                                        </div>

                                        <footer className="relative flex items-center gap-x-4">
                                            <Avatar className="size-10 bg-gray-50">
                                                <AvatarImage src={item.author.imageUrl} />
                                                <AvatarFallback>{getInitial(item.author?.name)}</AvatarFallback>
                                            </Avatar>

                                            <div className="text-sm/6">
                                                <p className="relative font-semibold text-gray-900">
                                                    <a href={item.author.href} className="hover:underline">
                                                        {item.author.name}
                                                    </a>
                                                </p>
                                                <p className="text-gray-600">{item.author.role}</p>
                                            </div>
                                        </footer>
                                    </div>
                                </article>
                            )}
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </DefaultLayout>
    )
}

export default Donasi