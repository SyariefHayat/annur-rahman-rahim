import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

import Navbar from '../Landing/Navbar'
import EachUtils from '@/utils/EachUtils'
import { LIST_TEAM } from '@/constants/listTeam'
import Footer from '@/components/Modules/Landing/Footer'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { LIST_MISI } from '@/constants/listMisi'

const About = () => {
    return (
        <DefaultLayout>
            <Navbar/>
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
                        <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Selamat Datang di Website Yatallatop</h1>

                        <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">Kami adalah yayasan amal yang berkomitmen untuk menciptakan perubahan positif dengan semangat modern, bersih, dan profesional.</p>
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

                <section className="py-14 sm:py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto grid max-w-2xl lg:h-screen grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                            <div className="lg:pt-4 lg:pr-8">
                                <div className="lg:max-w-lg">
                                    <h2 className="text-base/7 font-semibold text-indigo-600">Perjalanan Menuju Perubahan</h2>
                                    <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Sejarah Kami</p>
                                    <p className="mt-6 text-lg/8 text-gray-600">
                                        Yayasan Yatalatop didirikan pada tahun 2018, berawal dari keinginan tulus individu yang memiliki visi untuk memberikan dampak positif bagi masyarakat. Kami memulai dengan langkah kecil namun penuh makna, membantu. komunitas lokal dalam ber UMKM, pendidikan, kesehatan
                                    </p>
                                    <p className="mt-6 text-lg/8 text-gray-600">
                                        Melangkah ke masa depan, kami berkomitmen untuk terus mengembangkan program-program yang inovatif dan relevan dengan kebutuhan masyarakat. Kami percaya bahwa melalui kerja keras dan kolaborasi, kami dapat mencapai lebih banyak lagi.
                                    </p>
                                    <p className="mt-6 text-lg/8 text-gray-600">
                                        Haltoytop Halalan Toyibban Yatalatop
                                    </p>
                                </div>
                            </div>

                            <img src="campaign2.png" alt="" className="hidden lg:block w-[48rem] h-full max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-full md:-ml-4 lg:-ml-0 object-cover object-center" />
                        </div>
                    </div>
                </section>

                <section className="relative py-14 sm:py-24">
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

                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto grid max-w-2xl lg:h-screen grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                            <img src="slide-2.png" alt="" className="hidden lg:block w-[48rem] h-full max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-full md:-ml-4 lg:-ml-0 object-cover object-center" />

                            <div className="lg:pt-4 lg:pr-8">
                                <div className="lg:max-w-lg">
                                    <h2 className="text-base/7 font-semibold text-indigo-600">Perjalanan Menuju Perubahan</h2>
                                    <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Visi Kami</p>
                                    <p className="mt-6 text-lg/8 text-gray-600">
                                        Dalam merumuskan visi, pihak-pihak terkait (stakeholders) melakukan musyawarah sehingga visi tersebut benar-benar mewakili aspirasi semua pihak yang terkait. Harapannya, semua pihak yang terkait dalam kegiatan pembelajaran (guru, karyawan, peserta didik, dan wali murid) benar-benar menyadari visi tersebut untuk selanjutnya memegang komitmen terhadap visi yang telah disepakati bersama.
                                    </p>
                                    <p className="mt-6 text-lg/8 text-gray-600">
                                        Untuk mencapai visi tersebut perlu dilakukan suatu misi berupa kegiatan jangka panjang dengan arah yang jelas dan sistematis.
                                    </p>
                                </div>
                            </div>
                        </div>
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

                <section className="py-14 sm:py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto grid max-w-2xl lg:h-screen grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                            <div className="lg:pt-4 lg:pr-8">
                                <div className="lg:max-w-lg">
                                    <h2 className="text-base/7 font-semibold text-indigo-600">Perjalanan Menuju Perubahan</h2>
                                    <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Misi Kami</p>
                                    <ol className="list-decimal pl-4 text-gray-600 text-lg/8">
                                        <EachUtils
                                            of={LIST_MISI}
                                            render={(item, index) => (
                                                <li key={index} className="mt-6">
                                                    {item.content}
                                                </li>
                                            )}
                                        />
                                    </ol>
                                </div>
                            </div>

                            <img src="slide-3.png" alt="" className="hidden lg:block w-[48rem] h-full max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-full md:-ml-4 lg:-ml-0 object-cover object-center" />
                        </div>
                    </div>
                </section>

                <section className="relative py-14 sm:py-24">
                    <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#4f46e5] to-[#3b82f6] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        />
                    </div>

                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Tim Kami</h2>
                            <p className="mt-2 text-lg/8 text-gray-600">Kenali orang-orang hebat di balik Yatallatop. Mereka adalah individu yang berdedikasi untuk menciptakan perubahan positif.</p>
                        </div>

                        <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-300 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                            <EachUtils
                                of={LIST_TEAM}
                                render={(item, index) => (
                                    <div 
                                        key={index} 
                                        className="group flex max-w-xl h-[450px] flex-col items-center justify-center gap-5 rounded-xl ring-1 shadow-lg ring-gray-400/10 relative overflow-hidden bg-gray-100 transition-transform hover:scale-105"
                                    >
                                        <div className="w-40 h-40 border-4 border-white rounded-full overflow-hidden">
                                            <img 
                                                src="https://github.com/shadcn.png" 
                                                alt="Profile" 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                                            <p className="text-sm text-gray-600">{item.job}</p>
                                        </div>
                                        <div className="flex gap-4 text-gray-500">
                                            <FaFacebook className="text-xl hover:text-blue-600 transition-colors" />
                                            <FaInstagram className="text-xl hover:text-pink-500 transition-colors" />
                                            <FaTwitter className="text-xl hover:text-blue-400 transition-colors" />
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
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
            <Footer/>
        </DefaultLayout>
    )
}

export default About