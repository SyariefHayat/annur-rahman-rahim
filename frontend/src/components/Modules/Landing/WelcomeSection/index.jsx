import React from 'react'

const WelcomeSection = () => {
    return (
        <section className="w-full h-80 bg-gradient-to-r from-sky-500 to-sky-800 my-10 rounded-tl-[100px] rounded-br-[100px] flex flex-col items-center justify-center gap-3 text-white">
            <p className="text-xl">Selamat Datang di Website</p>
            <h1 className="text-6xl font-bold">Yayasan Yatalatop</h1>
            <div className="w-[90%] text-center">
                <h3 className="text-2xl">
                    "Kami akan selalu menerapkan pilar yayasan saya supaya saya bisa melibatkan seluruh elemen yang ada dan bisa menebar manfaat untuk semua."
                </h3>
            </div>
        </section>
    )
}

export default WelcomeSection