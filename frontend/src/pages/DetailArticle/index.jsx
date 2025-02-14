import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React, { useEffect, useState } from 'react'
import Navbar from '../Landing/Navbar'
import { useParams } from 'react-router-dom'
import { getDataArticles } from '@/services/database/getDataArticles'
import EachUtils from '@/utils/EachUtils'
import { getDataArticlesById } from '@/services/database/getDataArticlesById'
import useDataArticles from '@/hooks/useDataArticles'
import Footer from '@/components/Modules/Landing/Footer'

const DetailArticle = () => {
    const { id } = useParams();

    const [dataArticles, setDataArticles] = useState([]);
    const [article, setArticle] = useState(null);

    useEffect(() => {
        getDataArticles().then((result) => {
            setDataArticles(result?.data);
        });

        getDataArticlesById(id).then((result) => {
            setArticle(result?.data);
        });

    }, [id]);

    return (
        <DefaultLayout>
            <Navbar />
            {article && (
                <div className="w-full h-full flex justify-between">
                    <div className="w-[75%] h-full flex flex-col gap-5 border border-gray-300 rounded-md shadow-md p-5">
                        <h1 className="text-4xl font-bold">{article.title}</h1>
                        <div className="w-full h-[450px]">
                            <img src={`http://localhost:8000${article.image}`} alt="" className="w-full h-full" />
                        </div>
                        <p>{article.content}</p>
                    </div>
                    <div className="w-[20%] h-full p-5 border-l-2 border-gray-300">
                        <p className="text-xl font-bold mb-2">Post Terbaru</p>
                        {console.log(dataArticles)}
                        {dataArticles && (
                            <EachUtils 
                                of={dataArticles}
                                render={(item, index) => (
                                    <a href={`/article/${item._id}`} key={index} className="block border-b-2 mb-2 py-2 border-gray-300">
                                        <p className="line-clamp-2 text-xl font-medium">{item.title}</p>
                                    </a>
                                )}
                            />
                        )}
                    </div>
                </div>
            )}
            <Footer style={"mt-10"} />
        </DefaultLayout>
    )
}

export default DetailArticle