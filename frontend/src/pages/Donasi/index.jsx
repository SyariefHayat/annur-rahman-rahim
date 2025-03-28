import React from 'react'

import Navbar from '../Landing/Navbar'
import EachUtils from '@/utils/EachUtils'
import Footer from '@/components/Modules/Landing/Footer'
import { LIST_CAMPAIGN } from '@/constants/listCampaign'
import DefaultLayout from '@/components/Layouts/DefaultLayout'

const Donasi = () => {
    return (
        <DefaultLayout>
            <Navbar />

            <section className="relative w-full h-screen flex items-center justify-center">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#4f46e5] to-[#3b82f6] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    />
                </div>

                <div className="mx-auto max-w-3xl mt-20 px-3 sm:px-0 text-center">
                    <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Jadilah Bagian dari Perubahan</h1>

                    <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">Bantu kami menciptakan dunia yang lebih baik dengan memberikan donasi Anda. Setiap kontribusi, sekecil apa pun, memiliki dampak besar bagi mereka yang membutuhkan.</p>
                </div>

                <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#4f46e5] to-[#3b82f6] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                />
                </div>
            </section>

            <section className="relative">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-300 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        <EachUtils
                            of={LIST_CAMPAIGN}
                            render={(item, index) => (
                                <div key={index} className="relative flex max-w-xl h-[650px] flex-col items-start justify-between overflow-hidden">
                                    <div className="w-full h-full rounded-xl overflow-hidden">
                                        <img src={`${item.backgroundImage}`} alt="" className="w-full h-full object-cover object-center" />
                                    </div>

                                    <div className="w-full h-full flex flex-col pt-8">
                                        <div className="w-full flex items-center gap-x-4 text-gray-600">
                                            <time dateTime={item.datetime} className="text-sm/6">
                                                {item.date}
                                            </time>
                                        </div>

                                        <div>
                                            <h3 className="mt-4 text-lg/6 font-semibold transition-colors duration-200 group-hover:text-gray-200 relative">
                                                <a href={item.href}>
                                                    <span className="absolute inset-0" />
                                                    {item.title}
                                                </a>
                                            </h3>
                                            <p className="mt-4 line-clamp-3 text-sm/6 text-gray-600"> 
                                                {item.description}
                                            </p>
                                        </div>

                                        <div className="relative mt-8 flex items-center gap-x-4">
                                            <img alt="" src={item.author.imageUrl} className="size-10 rounded-full bg-gray-50" />

                                            <div className="text-sm/6">
                                                <p className="font-semibold text-gray-900">
                                                    <a href={item.author.href}>
                                                    <span className="absolute inset-0" />
                                                    {item.author.name}
                                                    </a>
                                                </p>
                                                <p className="text-gray-600">{item.author.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </DefaultLayout>
    )
}

export default Donasi