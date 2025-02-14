import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'
import Navbar from '../Landing/Navbar'
import useDataArticles from '@/hooks/useDataArticles'
import EachUtils from '@/utils/EachUtils'
import { FaAnglesRight } from 'react-icons/fa6'

const Article = () => {
    const { dataArticles } = useDataArticles();

    return (
        <DefaultLayout>
            <Navbar/>
            <div className="w-full h-full">
                {dataArticles && (
                    <EachUtils 
                        of={dataArticles}
                        render={(item, index) => (
                            <div key={index} className="w-full h-full p-5 mb-5 flex gap-5 border border-gray-300 rounded-md shadow-md">
                                <div className="w-[20%] h-52 bg-gray-300 rounded-md overflow-hidden">
                                    <img src={`http://localhost:8000${item.image}`} alt="" className="w-full h-full"/>
                                </div>
                                <div className="w-[75%] h-52 flex flex-col justify-between">
                                    <h3 className="text-2xl font-bold">{item.title}</h3>
                                    <p>20 Februari 2025</p>
                                    <p>{item.content}</p>
                                    <a href={`/article/${item._id}`} className="flex items-center gap-2">
                                        <p>Read More</p>
                                        <FaAnglesRight />
                                    </a>
                                </div>
                            </div>
                        )}
                    />
                )}
            </div>
        </DefaultLayout>
    )
}

export default Article