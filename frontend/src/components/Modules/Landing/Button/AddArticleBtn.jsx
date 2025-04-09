import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAtom } from 'jotai'
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
                    <a href={`/add-article/${user.id}`}>
                        Article Baru
                    </a>
                </DropdownMenuItem>
                <DropdownMenuItem>Campaign Donasi</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AddArticleBtn