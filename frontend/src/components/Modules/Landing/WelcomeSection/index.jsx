import React from 'react'

const WelcomeSection = () => {
    return (
        <section className="w-full h-28 sm:h-80 my-5 sm:my-10 px-5">
            <div className="w-full h-full bg-gradient-to-r from-sky-500 to-sky-800 rounded-tl-[100px] rounded-br-[100px] flex flex-col items-center justify-center gap-2 sm:gap-3 text-white">
                <p className="text-base sm:text-xl">Selamat Datang di Website</p>
                <h1 className="text-2xl sm:text-6xl font-bold">Yayasan Yatalatop</h1>
                <div className="sm:w-[90%] hidden sm:block sm:text-center">
                    <h3 className="sm:text-2xl">
                        "Kami akan selalu menerapkan pilar yayasan saya supaya saya bisa melibatkan seluruh elemen yang ada dan bisa menebar manfaat untuk semua."
                    </h3>
                </div>
            </div>
        </section>
    )
}

export default WelcomeSection