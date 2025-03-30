import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import React from 'react'

const Comment = ({ article, children, size }) => {
    return (
        <div className="flex gap-x-4">
            <Avatar className={`${size ? size : "w-10 h-10"}`}>
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

                {children}
            </div>
        </div>
    )
}

export default Comment