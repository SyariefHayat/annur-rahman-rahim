import EachUtils from '@/utils/EachUtils'
import React from 'react'
import useDataDonations from '@/hooks/useDataDonations'

const CampaignSection = () => {
    const { dataDonations } = useDataDonations();

    const latestDonations = dataDonations.slice(-3).reverse();

    return (
        <section className="w-full h-full flex flex-col px-5">
            <div className="w-full h-full flex items-center justify-center gap-5">
                <div className="w-[30%] hidden h-1 rounded-md bg-gray-400"></div>
                <div className="w-[80%] text-left sm:text-center">
                    <p className="hidden text-xl mb-2 italic">Penggalangan dana yang sedang berlangsung</p>
                    <h3 className="text-2xl sm:text-4xl font-medium">Satu kebaikan, sejuta senyuman.</h3>
                </div>
                <div className="w-[30%] h-1 rounded-md bg-gray-400"></div>
            </div>
            {latestDonations && (
                <div className="w-full h-full sm:h-screen grid grid-cols-1 sm:grid-cols-3 items-center gap-5 py-5 sm:py-16">
                    <EachUtils 
                        of={latestDonations}
                        render={(item, index) => (
                            <div key={index} className="w-full h-96 rounded-md border border-gray-300 shadow-md overflow-hidden">
                                <div className="w-full h-1/2 bg-gray-300">
                                    <img src={`http://localhost:8000${item.image}`} alt="" className="w-full h-full" />
                                </div>
                                <div className="w-full h-1/2 p-3 flex flex-col justify-between">
                                    <h3 className="text-2xl font-bold line-clamp-2">{item.title}</h3>
                                    <p className="text-base line-clamp-3 sm:line-clamp-4 text-gray-500">{item.desc}</p>
                                    <a 
                                        href={`donation/${item._id}`} 
                                        className="p-2 bg-sky-500 text-center text-white rounded-md"
                                    >
                                        Lihat Detail
                                    </a>
                                </div>
                            </div>
                        )}
                    />
                </div>
            )}
        </section>
    )
}

export default CampaignSection