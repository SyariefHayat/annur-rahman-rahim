import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDataArticles } from '@/services/database/getDataArticles'
import EachUtils from '@/utils/EachUtils'
import { getDataArticlesById } from '@/services/database/getDataArticlesById'
import useDataArticles from '@/hooks/useDataArticles'
import Footer from '@/components/Modules/Landing/Footer'
import Navbar from '../Landing/Navbar'
import { LIST_ARTICLE } from '@/constants/listArticle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowDown, ArrowUp, MessageCircle, Share2 } from 'lucide-react'

const DetailArticle = () => {
    const { id } = useParams();
    const index = parseInt(id, 10);
    const article = LIST_ARTICLE[index];

    return (
        <DefaultLayout>
            <Navbar position={"relative"} />
            <section>
                <img src={`/slide-${index + 1}.png`} alt="" className="w-full h-screen object-cover object-center" />
                <div className="mx-auto my-12 flex flex-col gap-6 w-full h-full lg:w-4xl items-start">
                    <div className="flex items-center gap-x-4">
                        <img 
                            alt={article.author.name} 
                            src={article.author.imageUrl} 
                            className="w-10 h-10 rounded-full bg-gray-200 object-cover"
                        />
                        <div className="text-sm">
                            <p className="font-semibold text-gray-900 truncate">
                                <a href={article.author.href} className="hover:underline">{article.author.name}</a>
                            </p>
                            <div className="w-full flex gap-3">
                                <p className="text-gray-600">{article.author.role}</p>
                                <p>.</p>
                                <p className="text-sm text-gray-600">29 Maret</p>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-5xl font-semibold tracking-tight text-gray-900">{article.title}</h1>

                    <Badge>{article.category.title}</Badge>
                    
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta culpa ipsum corrupti maxime eos iusto explicabo provident minima odit, sunt possimus. Commodi voluptate doloremque tempore repellat possimus esse laborum iusto.</p>

                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque reprehenderit sunt itaque atque repellat libero explicabo nam facere quibusdam consequatur doloribus, error eum sequi dolor tempora magnam ab! Impedit, rem illo! Rem consectetur ullam itaque voluptates quaerat exercitationem sapiente explicabo? Voluptatibus reprehenderit, expedita nulla dicta possimus saepe dolorum rerum tenetur quae obcaecati doloribus, non quis fugiat? Eaque incidunt autem cumque, neque numquam officia similique quis id accusantium voluptates ad, quos eos corrupti quaerat hic reprehenderit! Excepturi impedit quaerat, vero doloremque nisi dolorem ducimus, dicta odit perspiciatis cum illum ipsa debitis quam molestias harum esse vitae eaque aliquam cupiditate reiciendis incidunt?</p>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores dolores animi, inventore eaque ipsam sapiente quisquam, facere iure repudiandae repellendus, eveniet numquam temporibus atque sed corrupti ad similique corporis soluta. Soluta voluptatum consectetur inventore, velit fugiat ducimus praesentium exercitationem nam saepe, quam pariatur aperiam maiores eaque sequi vel id. Mollitia.</p>

                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur reiciendis ducimus fuga repellendus numquam incidunt quibusdam tempore veniam dicta quam, nobis libero ipsum ipsam repellat minus blanditiis voluptatibus voluptas aut.</p>

                    <div className="w-full flex gap-3">
                        <Button>
                            <ArrowUp/> Dukung Naik . 1 rb | <ArrowDown/>
                        </Button>

                        <Button>
                            <MessageCircle/> 55
                        </Button>

                        <Button>
                            <Share2 /> 39 
                        </Button>
                    </div>
                </div>
            </section>
            <Footer />
        </DefaultLayout>
    )
}

export default DetailArticle