import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'
import Navbar from '../Landing/Navbar'
import EachUtils from '@/utils/EachUtils'
import ProgressBar from '@/components/Modules/Element/ProgressBar'
import { differenceTime } from '@/utils/formatDate'
import useDataDonations from '@/hooks/useDataDonations'
import Footer from '@/components/Modules/Landing/Footer'

const Donasi = () => {
    const { dataDonations } = useDataDonations();

    return (
        <DefaultLayout>
            <Navbar />
            <div className="w-full h-full grid grid-cols-3 gap-5">
                {dataDonations && (
                    <EachUtils 
                        of={dataDonations}
                        render={(item, index) => (
                            <div key={index} className="w-full h-full border border-gray-400 rounded-md overflow-hidden">
                                <div className="w-full h-1/2 bg-gray-400">
                                    <img src={`http://localhost:8000${item.image}`} alt="" className="w-full h-full" />
                                </div>
                                <div className="w-full h-1/2 p-3 flex flex-col justify-between gap-3">
                                    <h3 className="text-2xl font-bold">{item.title}</h3>
                                    <p className="text-base line-clamp-4 text-gray-500">{item.desc}</p>
                                    <a 
                                        href={`donation/${item._id}`} 
                                        className="p-2 bg-sky-500 text-center text-white rounded-md"
                                    >
                                        Lihat Detail
                                    </a>
                                    <div>
                                        <p>Terkumpul: Rp {item.collectedAmount.toLocaleString("id-ID")}</p>
                                        <ProgressBar targetAmount={item.targetAmount} collectedAmount={item.collectedAmount}/>
                                        <div className="flex items-center justify-between">
                                            <p>{item.donors.length} Donatur</p>
                                            <p>{differenceTime(item.createdAt, item.deadline)} hari lagi</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                )}
            </div>
            <Footer  style={"mt-10"} />
        </DefaultLayout>
    )
}

export default Donasi