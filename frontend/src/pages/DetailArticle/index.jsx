import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { MessageCircle, Share2, ThumbsDown, ThumbsUp } from 'lucide-react'

import Navbar from '../Landing/Navbar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Toggle } from "@/components/ui/toggle"
import { LIST_ARTICLE } from '@/constants/listArticle'
import Footer from '@/components/Modules/Landing/Footer'
import DefaultLayout from '@/components/Layouts/DefaultLayout'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const DetailArticle = () => {
    const { id } = useParams();
    const index = parseInt(id, 10);
    const article = LIST_ARTICLE[index];

    const [totalLike, setTotalLike] = useState(999);
    const [isLiked, setIsLiked] = useState(false);

    const handleToggleLike = () => {
        if (isLiked) {
            setTotalLike((prev) => prev - 1);
        } else {
            setTotalLike((prev) => prev + 1);
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

                    <Badge className="rounded-full px-3 py-1.5 font-medium">{article.category.title}</Badge>
                    
                    <p className="text-gray-700 leading-relaxed">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta culpa ipsum corrupti maxime eos iusto explicabo provident minima odit, sunt possimus. Commodi voluptate doloremque tempore repellat possimus esse laborum iusto.</p>

                    <p className="text-gray-700 leading-relaxed">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque reprehenderit sunt itaque atque repellat libero explicabo nam facere quibusdam consequatur doloribus, error eum sequi dolor tempora magnam ab! Impedit, rem illo! Rem consectetur ullam itaque voluptates quaerat exercitationem sapiente explicabo? Voluptatibus reprehenderit, expedita nulla dicta possimus saepe dolorum rerum tenetur quae obcaecati doloribus, non quis fugiat? Eaque incidunt autem cumque, neque numquam officia similique quis id accusantium voluptates ad, quos eos corrupti quaerat hic reprehenderit! Excepturi impedit quaerat, vero doloremque nisi dolorem ducimus, dicta odit perspiciatis cum illum ipsa debitis quam molestias harum esse vitae eaque aliquam cupiditate reiciendis incidunt?</p>

                    <p className="text-gray-700 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores dolores animi, inventore eaque ipsam sapiente quisquam, facere iure repudiandae repellendus, eveniet numquam temporibus atque sed corrupti ad similique corporis soluta. Soluta voluptatum consectetur inventore, velit fugiat ducimus praesentium exercitationem nam saepe, quam pariatur aperiam maiores eaque sequi vel id. Mollitia.</p>

                    <p className="text-gray-700 leading-relaxed">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur reiciendis ducimus fuga repellendus numquam incidunt quibusdam tempore veniam dicta quam, nobis libero ipsum ipsam repellat minus blanditiis voluptatibus voluptas aut.</p>

                    <div className="w-full flex gap-3 flex-wrap items-center">
                        <Toggle variant="outline" aria-label="Like" pressed={isLiked} onPressedChange={handleToggleLike} className="flex items-center gap-1">
                            <ThumbsUp />
                            <span className="w-10 text-center">{formatNumber(totalLike)}</span>
                        </Toggle>

                        <Button>
                            <MessageCircle /> 55
                        </Button>

                        <Button>
                            <Share2 /> 39 
                        </Button>
                    </div>


                    <div className="w-full h-full">
                        <div className="w-full flex items-center gap-5">
                            <Avatar className="w-10 h-10">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            <Input placeholder="Tambahkan Komentar..."/>

                            <Button>
                                Tambahkan Komentar
                            </Button>
                        </div>

                        <div className="w-full my-3">
                            <div className="w-full flex items-center justify-between">
                                <p>Komentar</p>

                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Disarankan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="latest">Terbaru</SelectItem>
                                        <SelectItem value="longest">Terlama</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="w-full">
                                <div className="flex gap-x-4">
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>

                                    <div className="flex flex-col gap-5 text-sm">
                                        <p className="flex gap-3 font-semibold text-gray-900 truncate">
                                            <a href={article.author.href} className="hover:underline">{article.author.name}</a>
                                            <p>.</p>
                                            <p className="text-sm text-gray-600">29 Maret</p>
                                        </p>

                                        <div className="w-full flex gap-3">
                                            <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, nemo quasi. Quidem ducimus placeat magni mollitia cumque perferendis maiores architecto sint voluptatibus reprehenderit corporis sed officiis aliquam natus, quia quam tempora modi, quae ab! Itaque cum quisquam obcaecati illo non ex illum eaque molestiae, soluta optio praesentium modi architecto amet?</p>
                                        </div>

                                        <div className="flex gap-3">
                                            <Button>
                                                <ThumbsUp /> 10
                                            </Button>

                                            <Button>
                                                <ThumbsDown /> 0
                                            </Button>

                                            <Button>
                                                Balas
                                            </Button>
                                        </div>

                                        <div className="w-full">
                                            <div className="flex gap-x-4">
                                                <Avatar className="w-8 h-8">
                                                    <AvatarImage src="https://github.com/shadcn.png" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>

                                                <div className="flex flex-col gap-5 text-sm">
                                                <p className="flex gap-3 font-semibold text-gray-900 truncate">
                                            <a href={article.author.href} className="hover:underline">{article.author.name}</a>
                                            <p>.</p>
                                            <p className="text-sm text-gray-600">29 Maret</p>
                                        </p>

                                        <div className="w-full flex gap-3">
                                            <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, nemo quasi. Quidem ducimus placeat magni mollitia cumque perferendis maiores architecto sint voluptatibus reprehenderit corporis sed officiis aliquam natus, quia quam tempora modi, quae ab! Itaque cum quisquam obcaecati illo non ex illum eaque molestiae, soluta optio praesentium modi architecto amet?</p>
                                        </div>

                                        <div className="flex gap-3">
                                            <Button>
                                                <ThumbsUp /> 10
                                            </Button>

                                            <Button>
                                                <ThumbsDown /> 0
                                            </Button>

                                            <Button>
                                                Balas
                                            </Button>
                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </DefaultLayout>
    )
}

export default DetailArticle