import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'
import Navbar from '../Landing/Navbar'
import GoogleMapComponent from '@/components/Modules/Element/GoogleMapComponents'
import Footer from '@/components/Modules/Landing/Footer'
import EachUtils from '@/utils/EachUtils'
import { LIST_CONTACT } from '@/constants/listContact'

const Contact = () => {
    return (
        <DefaultLayout>
            <Navbar/>
            <section className="w-full h-80 bg-gradient-to-r from-sky-500 to-sky-800 mb-10 rounded-tl-[100px] rounded-br-[100px] flex flex-col items-center justify-center gap-3 text-white">
                <h2 className="text-6xl font-bold">Kontak Kami</h2>
            </section>
            <div className="w-full h-screen flex gap-5">
                <div className="w-full h-full p-5 flex flex-col gap-5">
                    <p className="text-4xl text-blue-500 font-bold">Infomasi selengkapnya:</p>
                    <EachUtils 
                        of={LIST_CONTACT}
                        render={(item, index) => (
                            <div key={index} className="w-full p-3 flex items-center gap-3 bg-gray-300 rounded-md">
                                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white">
                                    <item.icon size={30} className="text-sky-500" />
                                </div>
                                <div>
                                    <p className="text-2xl font-medium text-white mb-2">{item.title}</p>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        )}
                    />
                </div>
                <div className="w-full h-full p-5">
                    <p className="text-4xl text-blue-500 font-bold">Kirim pesan kamu</p>
                    <form action="" className="w-full h-full py-5">
                        <input type="text" className="w-full p-5 bg-gray-300 rounded-md" placeholder="Name" />
                        <input type="text" className="w-full p-5 bg-gray-300 my-5 rounded-md" placeholder="Phone Number" />
                        <input type="email" className="w-full p-5 bg-gray-300 rounded-md" placeholder="Email" />
                        <textarea name="" id="" cols={63} rows={5} placeholder="Message" className="bg-gray-300 rounded-md p-5 mt-5"></textarea>
                    </form>
                </div>
            </div>
            <GoogleMapComponent/>
            <Footer style={"mt-10"} />
        </DefaultLayout>
    )
}

export default Contact