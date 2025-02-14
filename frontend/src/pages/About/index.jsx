import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'
import Navbar from '../Landing/Navbar'
import Footer from '@/components/Modules/Landing/Footer'

const About = () => {
    return (
        <DefaultLayout>
            <Navbar/>
            <section className="w-full h-80 bg-gradient-to-r from-sky-500 to-sky-800 mb-10 rounded-tl-[100px] rounded-br-[100px] flex flex-col items-center justify-center gap-3 text-white">
                <h2 className="text-6xl font-bold">Tentang Kami</h2>
            </section>
            <div className="w-full h-full">
                <h3 className="text-sky-500 text-4xl font-bold mb-3">Sejarah Kami</h3>
                <p className="text-xl">
                    Yayasan Yatalatop didirikan pada tahun 2018, berawal dari keinginan tulus  individu yang memiliki visi untuk memberikan dampak positif bagi masyarakat. Kami memulai dengan langkah kecil namun penuh makna, membantu. komunitas lokal dalam ber UMKM, pendidikan, kesehatan
                </p>
                <p className="my-5 text-xl">
                    Melangkah ke masa depan, kami berkomitmen untuk terus mengembangkan program-program yang inovatif dan relevan dengan kebutuhan masyarakat. Kami percaya bahwa melalui kerja keras dan kolaborasi, kami dapat mencapai lebih banyak lagi.
                </p>
                <p className="text-xl">
                    Haltoytop Halalan Toyibban Yatalatop
                </p>
            </div>
            <div className="w-full h-full flex gap-5 my-10">
                <div className="w-1/2 h-full">
                    <h3 className="text-sky-500 text-4xl font-bold mb-3">Visi Madrasah</h3>
                    <p className="text-xl">
                        Dalam merumuskan visi, pihak-pihak terkait (stakeholders) melakukan musyawarahsehingga visi tersebut benar-benar mewakili aspirasi semua pihak yangterkait.Harapannya, semua pihak yang terkait dalam kegiatan pembelajaran (guru, karyawan, peserta didik, dan wali murid) benar-benar menyadari visi tersebut untukselanjutnya memegang komitmen terhadap visi yang telah disepakati bersama.
                    </p>
                </div>
                <div className="w-1/2 h-full">
                    <h3 className="text-sky-500 text-4xl font-bold mb-3">Misi Yayasan</h3>
                    <p className="text-xl">
                        Untuk mencapai visi tersebut perlu dilakukan suatu misi berupa kegiatan jangka panjang dengan arah yang jelas dan sistematis.
                        Berikut misi Madrasah Ibtidiayah Yatalatop yang dirumuskan
                        berdasarkan visi madrasah :
                    </p>
                    <ol className="list-decimal ml-6 text-xl mt-5">
                        <li>⁠Memberdayakan proses pembelajaran yang optimal</li>
                        <li>⁠Melakukan penataan administrasi dan sarana prasarana</li>
                        <li>⁠pembelajaran</li>
                        <li>⁠Mengintensifkan pembinaan kegiatan ekstrakurikuler</li>
                        <li>⁠Menciptakan lingkungan belajar yang kondusif dan bernuansa religius</li>
                        <li>⁠Memotivasi siswa untuk berakhlak mulia.</li>
                        <li>⁠Meningkatkan pengamalan ajaran keagamaan.</li>
                    </ol>
                </div>
            </div>
            <Footer/>
        </DefaultLayout>
    )
}

export default About