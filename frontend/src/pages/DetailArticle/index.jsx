import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { MessageCircle, ThumbsUp } from 'lucide-react'

import Navbar from '../Landing/Navbar'
import { isCommentAtom } from '@/jotai/atoms'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Toggle } from "@/components/ui/toggle"
import { LIST_ARTICLE } from '@/constants/listArticle'
import Footer from '@/components/Modules/Landing/Footer'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import DialogShare from '@/components/Modules/Landing/DialogShare'
import DrawerComment from '@/components/Modules/Landing/DrawerComment'

const DetailArticle = () => {
    const { id } = useParams();
    const index = parseInt(id, 10);
    const article = LIST_ARTICLE[index];

    const [like, setLike] = useState(999);
    const [isLiked, setIsLiked] = useState(false);

    const [isComment, setIsComment] = useAtom(isCommentAtom);

    const handleToggleLike = () => {
        if (isLiked) {
            setLike((prev) => prev - 1);
        } else {
            setLike((prev) => prev + 1);
        }

        setIsLiked(!isLiked);
    };

    const formatNumber = (num) => {
        if (num >= 1_000_000) {
            return (num / 1_000_000).toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " jt";
        } else if (num >= 1_000) {
            return (num / 1_000).toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " rb";
        }

        return num.toLocaleString("id-ID");
    };

    return (
        <DefaultLayout>
            <Navbar position={"relative"} />
            <section aria-label="Article Detail">
                <img src={`/slide-${index + 1}.png`} alt="" className="w-full h-full sm:h-screen object-cover object-center" />
                <article className="mx-auto my-12 flex flex-col gap-6 w-full h-full lg:w-4xl items-start px-6">
                    <div className="flex items-center gap-x-4">
                        <img 
                            alt={article.author.name} 
                            src={article.author.imageUrl} 
                            className="w-10 h-10 rounded-full bg-gray-200 object-cover"
                        />
                        <div className="text-sm/6">
                            <p className="font-semibold text-gray-900 truncate">
                                <a href={article.author.href} className="hover:underline">{article.author.name}</a>
                            </p>
                            <div className="w-full flex items-center justify-center gap-3">
                                <p className="text-gray-600">{article.author.role}</p>
                                <p>.</p>
                                <p className="text-sm text-gray-600">29 Maret</p>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-4xl font-semibold tracking-tight text-gray-900">{article.title}</h2>

                    <Badge className="rounded-full px-3 py-1.5 font-medium">{article.category.title}</Badge>
                    
                    <p className="text-gray-600 leading-relaxed">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta culpa ipsum corrupti maxime eos iusto explicabo provident minima odit, sunt possimus. Commodi voluptate doloremque tempore repellat possimus esse laborum iusto.</p>

                    <p className="text-gray-600 leading-relaxed">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque reprehenderit sunt itaque atque repellat libero explicabo nam facere quibusdam consequatur doloribus, error eum sequi dolor tempora magnam ab! Impedit, rem illo! Rem consectetur ullam itaque voluptates quaerat exercitationem sapiente explicabo? Voluptatibus reprehenderit, expedita nulla dicta possimus saepe dolorum rerum tenetur quae obcaecati doloribus, non quis fugiat? Eaque incidunt autem cumque, neque numquam officia similique quis id accusantium voluptates ad, quos eos corrupti quaerat hic reprehenderit! Excepturi impedit quaerat, vero doloremque nisi dolorem ducimus, dicta odit perspiciatis cum illum ipsa debitis quam molestias harum esse vitae eaque aliquam cupiditate reiciendis incidunt?</p>

                    <p className="text-gray-700 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores dolores animi, inventore eaque ipsam sapiente quisquam, facere iure repudiandae repellendus, eveniet numquam temporibus atque sed corrupti ad similique corporis soluta. Soluta voluptatum consectetur inventore, velit fugiat ducimus praesentium exercitationem nam saepe, quam pariatur aperiam maiores eaque sequi vel id. Mollitia.</p>

                    <p className="text-gray-700 leading-relaxed">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur reiciendis ducimus fuga repellendus numquam incidunt quibusdam tempore veniam dicta quam, nobis libero ipsum ipsam repellat minus blanditiis voluptatibus voluptas aut.</p>

                    <div className="w-full flex gap-3 flex-wrap items-center">
                        <Toggle variant="outline" aria-label="Like" pressed={isLiked} onPressedChange={handleToggleLike} className="flex items-center gap-1 cursor-pointer">
                            <ThumbsUp />
                            <span className="w-10 text-center">{formatNumber(like)}</span>
                        </Toggle>

                        <Button variant="outline" onClick={() => setIsComment(!isComment)} className={`${isComment ? "bg-accent" : ""} cursor-pointer`}>
                            <MessageCircle /> 55
                        </Button>

                        <DialogShare />
                    </div>

                    <DrawerComment article={article} />
                </article>
            </section>
            <Footer />
        </DefaultLayout>
    )
}

export default DetailArticle