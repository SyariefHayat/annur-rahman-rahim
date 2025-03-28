import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'
import Navbar from '../Landing/Navbar'
import Footer from '@/components/Modules/Landing/Footer'

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
            
            <Footer />
        </DefaultLayout>
    )
}

export default Donasi