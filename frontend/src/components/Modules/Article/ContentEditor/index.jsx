import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import React from 'react'
import RenderContent from '../RenderContent'

const ContentEditor = ({ item ,handleDeleteContent }) => {
    return (
        <div className="flex items-center gap-2 mt-3 text-gray-400 -ml-10">
            <Button
                variant="ghost"
                size="icon"
                className="text-xl cursor-pointer hover:text-red-400"
                onClick={() => handleDeleteContent(item.id)}
            >
                <Trash />
            </Button>

            <div className="w-full">
                <RenderContent type={item.type} id={item.id} />
            </div>
        </div>
    )
}

export default ContentEditor