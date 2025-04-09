import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';

import { 
    EllipsisVertical, 
    MessageCircle, 
    Share2, 
    ThumbsUp 
} from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import EachUtils from '@/utils/EachUtils';
import { Button } from '@/components/ui/button';
import { userAtomStorage } from '@/jotai/atoms';
import { getRelativeTime } from '@/utils/formatDate';
import { apiInstanceExpress } from '@/services/express/apiInstance';


const Post = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setIsLoading] = useState(false);

    const [user] = useAtom(userAtomStorage);

    useEffect(() => {
        const getArticles = async () => {
            try {
                const response = await apiInstanceExpress.get("article", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    }
                })

                if (response.status === 200) return setArticles(response.data.data);
            } catch (error) {
                console.error(error);
            };
        };

        getArticles();
    }, []);

    return (
        <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <EachUtils
                of={articles}
                render={(item, index) => (
                    <article key={index} className="flex max-w-xl h-[300px] flex-col items-start justify-between overflow-hidden">
                        <figure className="w-full h-[70%] rounded-xl overflow-hidden">
                            <img 
                                src={`${import.meta.env.VITE_BASE_URL_EXPRESS}${item.image}`} 
                                alt={item.title} 
                                className="w-full h-full object-cover object-center"
                            />
                                {console.log(`${import.meta.env.VITE_BASE_URL_EXPRESS}${item.image}`)}
                        </figure>
                        <div className="w-full h-[30%] flex items-start pt-4">
                            <a href={item.href}>
                                <h3 className="text-lg/6 font-semibold">{item.title}</h3>
                            </a>

                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant="ghost" size="icon" className="size-6 rounded-sm cursor-pointer">
                                        <EllipsisVertical />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Pengaturan</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Lihat</DropdownMenuItem>
                                    <DropdownMenuItem>Hapus</DropdownMenuItem>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <footer className="w-full flex items-center justify-between text-sm/6 text-gray-600">
                            <div className="flex gap-3">
                                <Button variant="ghost">
                                    <ThumbsUp/>
                                    20
                                </Button>
                                <Button variant="ghost">
                                    <MessageCircle/>
                                    30
                                </Button>
                                <Button variant="ghost">
                                    <Share2/>
                                    10
                                </Button>
                            </div>
                            <p>{getRelativeTime(item.createdAt)}</p>
                        </footer>
                    </article>
                )}
            />
        </div>
    )
}

export default Post