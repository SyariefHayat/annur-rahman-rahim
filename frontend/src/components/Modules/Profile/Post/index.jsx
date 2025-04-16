import { toast } from 'sonner';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
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

    const handleDelete = async (id) => {
        const toastId = toast.loading("Menghapus artikel...");
    
        try {
            const response = await apiInstanceExpress.delete(`article/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
    
            if (response.status === 200) {
                setArticles(prev => prev.filter(item => item._id !== id));
                toast.success("Artikel berhasil dihapus!", { id: toastId });
            }
        } catch (error) {
            console.error("Gagal menghapus artikel", error);
            toast.error("Gagal menghapus artikel. Silakan coba lagi.", { id: toastId });
        }
    };
    

    return (
        <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <EachUtils
                of={articles}
                render={(item, index) => (
                    <article key={index} className="flex max-w-xl h-[300px] flex-col items-start justify-between overflow-hidden">
                        <figure className="w-full h-[70%] rounded-xl overflow-hidden">
                            <img 
                                src={`${import.meta.env.VITE_BASE_URL_EXPRESS}${item.cover}`} 
                                alt={item.title} 
                                className="w-full h-full object-cover object-center"
                            />
                        </figure>
                        <div className="w-full h-[30%] flex items-start justify-between pt-4">
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
                                    <DropdownMenuItem asChild>
                                        <Link to={`/article/${item._id}`}>Lihat</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDelete(item._id)}>Hapus</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <footer className="w-full flex items-center justify-between text-sm/6 text-gray-600">
                            <div className="flex gap-3">
                                <Button variant="ghost">
                                    <ThumbsUp/>
                                    {item.likes}
                                </Button>
                                <Button variant="ghost">
                                    <MessageCircle/>
                                    {item.comments.length}
                                </Button>
                                <Button variant="ghost">
                                    <Share2/>
                                    {item.shares}
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