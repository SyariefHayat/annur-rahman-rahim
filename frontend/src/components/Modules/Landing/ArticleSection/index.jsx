import SectionLayout from '@/components/Layouts/SectionLayout'
import useDataArticles from '@/hooks/useDataArticles'
import { apiInstanceExpress } from '@/services/express/apiInstance'
import EachUtils from '@/utils/EachUtils'
import React, { useEffect, useState } from 'react'
import { FaAnglesRight } from 'react-icons/fa6'

const ArticleSection = () => {
    const { dataArticles } = useDataArticles();

    return (
        <section className="w-full h-full flex flex-col px-5">
            <div className="w-full flex items-center justify-center gap-5">
                <div className="w-full hidden h-1 rounded-md bg-gray-400"></div>
                <div className="w-full text-center">
                    <h3 className="text-2xl sm:text-4xl font-medium">Berita Terbaru</h3>
                </div>
                <div className="w-full hidden h-1 rounded-md bg-gray-400"></div>
            </div>
            <div className="w-full h-full sm:h-screen grid grid-cols-1 sm:grid-cols-3 items-center gap-5 sm:py-16 py-5">
                {dataArticles && (
                    <EachUtils 
                        of={dataArticles}
                        render={(item, index) => (
                            <div key={index} className="w-full h-96 rounded-md border border-gray-300 shadow-md overflow-hidden">
                                <div className="w-full h-1/2 bg-gray-300">
                                    <img src={`http://localhost:8000${item.image}`} alt="" className="w-full h-full" />
                                </div>
                                <div className="w-full h-1/2 p-3 flex flex-col justify-between">
                                    <h3 className="text-2xl font-bold line-clamp-1 sm:line-clamp-2">{item.title}</h3>
                                    <p className="text-base line-clamp-3 sm:line-clamp-4 text-gray-500">{item.content}</p>
                                    <a href={`/article/${item._id}`} className="flex items-center justify-center gap-2">
                                        <p>Read More</p>
                                        <FaAnglesRight />
                                    </a>
                                </div>
                            </div>
                        )}
                    />
                )}
            </div>
        </section>
    )
}

export default ArticleSection