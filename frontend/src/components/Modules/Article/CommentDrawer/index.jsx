import React from 'react'
import { useAtom } from 'jotai'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import Comment from '../../Landing/Comment'
import { Input } from '@/components/ui/input'
import { isCommentAtom } from '@/jotai/atoms'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const CommentDrawer = ({ article }) => {
    const [isComment] = useAtom(isCommentAtom);
    
    return (
        <>
            {isComment && (
                <div className="w-full h-full">
                    <div className="w-full flex items-center gap-5">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Input className="hidden sm:block" placeholder="Tambahkan Komentar..."/>
                        <Drawer>
                            <DrawerTrigger asChild>
                                <button className="block sm:hidden w-full text-left text-gray-500 border rounded-md px-3 py-2">
                                    Tambahkan Komentar...
                                </button>
                            </DrawerTrigger>
                            <DrawerContent className="h-[90vh]">
                                <DrawerHeader>
                                    <DrawerTitle>Tambah Komentar</DrawerTitle>
                                    <DrawerDescription>Silakan tuliskan komentar Anda di bawah ini.</DrawerDescription>
                                </DrawerHeader>
                                <div className="flex-1 px-4 space-y-4 overflow-auto">
                                    <Textarea className="w-full h-full border-none outline-none" placeholder="Tambahkan Komentar..." />
                                </div>
                                <DrawerFooter>
                                    <Button>Kirim</Button>
                                    <DrawerClose asChild>
                                        <Button variant="outline">Batal</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                        <Button className="hidden sm:block">
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
                            <Comment article={article}>
                                <Comment article={article} size={"w-9 h-9"} />
                            </Comment>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CommentDrawer