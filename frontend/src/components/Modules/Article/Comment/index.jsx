import React from 'react'
import { ThumbsDown, ThumbsUp } from 'lucide-react'

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

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Comment = ({ article, children, size }) => {
    return (
        <div className="flex gap-x-4 mt-5">
            <Avatar className={`${size ? size : "w-10 h-10"}`}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-3 sm:gap-5 text-sm">
                <p className="flex gap-3 font-semibold text-gray-900 truncate">
                    <a href={article.author.href} className="hover:underline">{article.author.name}</a>
                    <p>.</p>
                    <p className="text-sm text-gray-600">29 Maret</p>
                </p>

                <div className="w-full flex gap-3">
                    <p className="text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi, laborum.</p>
                </div>

                <div className="flex gap-3">
                    <Button>
                        <ThumbsUp /> 10
                    </Button>
                    <Button>
                        <ThumbsDown /> 0
                    </Button>
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button className="block sm:hidden">Balas</Button>
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

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="hidden sm:block">Balas</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Tambah Komentar</DialogTitle>
                                <DialogDescription>Silakan tuliskan komentar Anda di bawah ini.</DialogDescription>
                            </DialogHeader>
                            <Textarea className="w-full h-full" placeholder="Tambahkan Komentar..."/>
                            <div className="flex justify-end gap-2 mt-4">
                                <DialogClose asChild>
                                    <Button variant="outline">Batal</Button>
                                </DialogClose>
                                <Button type="submit">Kirim</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {children}
            </div>
        </div>
    )
}

export default Comment