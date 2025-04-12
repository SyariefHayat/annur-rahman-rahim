import React from 'react'
import { useAtom } from 'jotai'
import { Plus } from 'lucide-react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from '@/components/ui/button'
import { userAtomStorage } from '@/jotai/atoms'

const AddArticleBtn = () => {
    const [user] = useAtom(userAtomStorage);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button className="cursor-pointer">
                    <Plus /> Tambah Konten
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <a href={`/article/create/${user.id}`}>
                        Article Baru
                    </a>
                </DropdownMenuItem>
                <DropdownMenuItem>Campaign Donasi</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AddArticleBtn