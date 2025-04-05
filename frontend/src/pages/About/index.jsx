import React from 'react'

import Navbar from '../Landing/Navbar'
import EachUtils from '@/utils/EachUtils'
import { LIST_MISI } from '@/constants/listMisi'
import Footer from '@/components/Modules/Landing/Footer'
import FlexLayout from '@/components/Layouts/FlexLayout'
import OurTeam from '@/components/Modules/Landing/OurTeam'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import ClipPathUp from '@/components/Modules/Element/ClipPathUp'
import ClipPathDown from '@/components/Modules/Element/ClipPathDown'

const About = () => {
    return (
        <DefaultLayout>
            <Navbar/>
            <section className="relative w-full h-screen flex items-center justify-center">
                <ClipPathUp />
                <div className="mx-auto max-w-3xl mt-20 px-3 sm:px-0 text-center">
                    <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Selamat Datang di Website Yatallatop</h1>
                    <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">Kami adalah yayasan amal yang berkomitmen untuk menciptakan perubahan positif dengan semangat modern, bersih, dan profesional.</p>
                </div>
                <ClipPathDown />
            </section>

            <FlexLayout image="/campaign2.png">
                <h2 className="text-base/7 font-semibold text-blue-600">Perjalanan Menuju Perubahan</h2>
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
            </FlexLayout>

            <FlexLayout isClip={true} isReverse={true} image="/slide-2.png">
                <h2 className="text-base/7 font-semibold text-blue-600">Perjalanan Menuju Perubahan</h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Visi Kami</p>
                <p className="mt-6 text-lg/8 text-gray-600">
                    Dalam merumuskan visi, pihak-pihak terkait (stakeholders) melakukan musyawarah sehingga visi tersebut benar-benar mewakili aspirasi semua pihak yang terkait. Harapannya, semua pihak yang terkait dalam kegiatan pembelajaran (guru, karyawan, peserta didik, dan wali murid) benar-benar menyadari visi tersebut untuk selanjutnya memegang komitmen terhadap visi yang telah disepakati bersama.
                </p>
                <p className="mt-6 text-lg/8 text-gray-600">
                    Untuk mencapai visi tersebut perlu dilakukan suatu misi berupa kegiatan jangka panjang dengan arah yang jelas dan sistematis.
                </p>
            </FlexLayout>

            <FlexLayout image="/slide-3.png">
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
            </FlexLayout>

            <OurTeam />

            <Footer/>
        </DefaultLayout>
    )
}

export default About