import { useAtom } from 'jotai'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { MessageCircle, ThumbsUp } from 'lucide-react'

import Navbar from '../Landing/Navbar'
import EachUtils from '@/utils/EachUtils'
import { Badge } from '@/components/ui/badge'
import { userAtomStorage } from '@/jotai/atoms'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/utils/formatDate'
import { Toggle } from "@/components/ui/toggle"
import { getInitial } from '@/utils/getInitial'
import Footer from '@/components/Modules/Landing/Footer'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import ShareDialog from '@/components/Modules/Article/ShareDialog'
import { apiInstanceExpress } from '@/services/express/apiInstance'
import CommentDrawer from '@/components/Modules/Article/CommentDrawer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const SlugArticle = () => {
    const { id } = useParams();

    const [article, SetArticle] = useState("");
    const [isLiked, setIsLiked] = useState(false);

    const [user] = useAtom(userAtomStorage);

    useEffect(() => {
        const getArticleData = async () => {
            try {
                const response = await apiInstanceExpress.get(`article/${id}`)

                if (response.status === 200) return SetArticle(response.data.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }

        getArticleData();
    })

    const handleToggleLike = async () => {
        try {
            const response = await apiInstanceExpress.post(
                `article/like/${article._id}`,
                { userId: user.id },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
    
            const { liked, likesCount } = response.data.data;

            setIsLiked(liked);
            setLikesCount(likesCount);
        } catch (err) {
            console.error("Failed to toggle like:", err);
        }
    };

    // const formatNumber = (num) => {
    //     if (num >= 1_000_000) {
    //         return (num / 1_000_000).toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " jt";
    //     } else if (num >= 1_000) {
    //         return (num / 1_000).toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " rb";
    //     }

    //     return num.toLocaleString("id-ID");
    // };

    return (
        <DefaultLayout>
            <Navbar position={"relative"} />
            <section aria-label="Article Detail">
                <img src={`${import.meta.env.VITE_BASE_URL_EXPRESS}${article.cover}`} alt="" className="w-full h-full sm:h-screen object-cover object-center" />
                <article className="mx-auto my-12 flex flex-col gap-6 w-full h-full lg:w-4xl items-start px-6">
                    <div className="flex items-center gap-x-4">
                        <Avatar className="size-10 bg-gray-50">
                            <AvatarImage src={article.createdBy} />
                            <AvatarFallback>{getInitial(article.createdBy?.name)}</AvatarFallback>
                        </Avatar>

                        <div className="text-sm/6">
                            <p className="font-semibold text-gray-900 truncate">
                                <a href="#" className="hover:underline">{article.createdBy?.name}</a>
                            </p>
                            <div className="w-full flex items-center justify-center gap-3">
                                <p className="text-gray-600">{article.createdBy?.role}</p>
                                <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                                <p className="text-sm text-gray-600">{formatDate(article.createdAt)}</p>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-4xl font-semibold tracking-tight text-gray-900">{article.title}</h1>

                    <div className="flex gap-3">
                        {article?.tags?.map((tag, index) => (
                            <Badge key={index} className="rounded-full px-3 py-1.5 font-medium">{tag}</Badge>
                        ))}
                    </div>

                    {article.content && (
                        <EachUtils 
                            of={article?.content}
                            render={(item, index) => {
                                if (item.type === "heading-1") {
                                    return (
                                        <h2 key={index} className="md:text-4xl text-3xl font-bold">{item.value}</h2>
                                    )
                                }

                                if (item.type === "heading-2") {
                                    return (
                                        <h3 key={index} className="md:text-3xl text-2xl font-semibold">{item.value}</h3>
                                    )
                                }

                                if (item.type === "heading-3") {
                                    return (
                                        <h4 key={index} className="md:text-2xl text-xl font-medium">{item.value}</h4>
                                    )
                                }

                                if (item.type === "text") {
                                    return (
                                        <p key={index} className="text-gray-600 leading-relaxed">{item.value}</p>
                                    )
                                }

                                if (item.type === "image") {
                                    return (
                                        <img key={index} src={`${import.meta.env.VITE_BASE_URL_EXPRESS}${item.value}`} alt="preview" className="w-full h-80 object-cover object-center rounded-md" />
                                    )
                                }
                            }}
                        />
                    )}

                    <div className="w-full flex gap-3 flex-wrap items-center">
                        <Toggle variant="outline" aria-label="Like" pressed={isLiked} onPressedChange={handleToggleLike} className="flex items-center gap-1 cursor-pointer">
                            <ThumbsUp />
                            <span className="w-10 text-center">{article.likes?.length}</span>
                        </Toggle>

                        <Button variant="outline">
                            <MessageCircle /> {article.comments?.length}
                        </Button>
                        {/* <Button variant="outline" onClick={() => setIsComment(!isComment)} className={`${isComment ? "bg-accent" : ""} cursor-pointer`}>
                            <MessageCircle /> 55
                        </Button> */}

                        <ShareDialog article={article} />
                    </div>

                    <CommentDrawer article={article} />
                </article>
            </section>
            <Footer />
        </DefaultLayout>
    )
}

export default SlugArticle