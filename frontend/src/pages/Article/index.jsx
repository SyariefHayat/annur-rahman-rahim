import React, { useEffect, useState } from 'react'

import Navbar from '../Landing/Navbar'
import EachUtils from '@/utils/EachUtils'
import { Badge } from '@/components/ui/badge'
import { getInitial } from '@/utils/getInitial'
import { getRelativeTime } from '@/utils/formatDate'
import { Separator } from '@/components/ui/separator'
import Footer from '@/components/Modules/Landing/Footer'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { apiInstanceExpress } from '@/services/express/apiInstance'
import ClipPathUp from '@/components/Modules/Element/ClipPath/ClipPathUp'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ClipPathDown from '@/components/Modules/Element/ClipPath/ClipPathDown'

const Article = () => {
    const [articleData, setArticleData] = useState("");

    useEffect(() => {
        const getArticleData = async () => {
            try {
                const response = await apiInstanceExpress.get("article");

                if (response.status === 200) return setArticleData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }

        getArticleData();
    }, [])

    return (
        <DefaultLayout>
            <Navbar/>
            <header className="relative w-full h-screen flex items-center justify-center">
                <ClipPathUp />

                <div className="mx-auto max-w-3xl mt-20 px-6 sm:px-8 text-center">
                    <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Blog Annur Rahman Rahim</h1>

                    <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">Temukan cerita inspiratif, pembaruan aktivitas yayasan, artikel edukatif, dan banyak lagi di sini.</p>
                </div>

                <ClipPathDown />
            </header>

            <main className="relative py-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-300 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {articleData && (
                            <EachUtils
                            of={articleData}
                            render={(item, index) => (
                                <article key={index} className="relative flex max-w-xl h-[650px] flex-col items-start justify-between overflow-hidden">
                                    <figure className="w-full h-full rounded-xl overflow-hidden">
                                        <img 
                                            src={`${import.meta.env.VITE_BASE_URL_EXPRESS}${item.cover}`}
                                            alt={item.title} 
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </figure>

                                    <div className="w-full h-full flex flex-col pt-8">
                                        <header className="flex items-center gap-x-4 text-xs text-gray-600">
                                            {item?.tags?.map((tag, index) => (
                                                <Badge key={index} className="rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </header>

                                        <div>
                                            <a href={`/article/${item._id}`}>
                                                <h3 className="mt-4 text-lg/6 font-semibold">{item.title}</h3>
                                            </a>
                                            <p className="mt-4 line-clamp-3 text-sm/6 text-gray-600"> 
                                                {item.content[0].value}
                                            </p>
                                        </div>

                                        <Separator className="my-4" />

                                        <footer className="flex items-end justify-between">
                                            <div className="flex items-center gap-x-4">
                                                <Avatar className="size-10">
                                                    <AvatarImage src={item.createdBy} />
                                                    <AvatarFallback className="bg-gray-100">{getInitial(item.createdBy?.name)}</AvatarFallback>
                                                </Avatar>

                                                <div className="text-sm/6">
                                                    <p className="font-semibold text-gray-900">
                                                        <a href="#" className="hover:underline">
                                                            {item.createdBy?.name}
                                                        </a>
                                                    </p>
                                                    <p className="text-gray-600">{item.createdBy?.email}</p>
                                                </div>
                                            </div>

                                            <time dateTime={item.createdAt} className="text-xs text-gray-600">{getRelativeTime(item.createdAt)}</time>
                                        </footer>
                                    </div>
                                </article>
                            )}
                        />
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </DefaultLayout>
    )
}

export default Article