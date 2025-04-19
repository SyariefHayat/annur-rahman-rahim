import React, { useState } from 'react'
import { Check, Copy, Share2 } from 'lucide-react'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { userAtomStorage } from '@/jotai/atoms'
import { useAtom } from 'jotai'
import { apiInstanceExpress } from '@/services/express/apiInstance'

const ShareDialog = ({ article }) => {
    const [shareCount, setShareCount] = useState(article?.shares?.length || 0);
    const [copied, setCopied] = useState(false);
    const articleUrl = window.location.href;
    
    const [user] = useAtom(userAtomStorage);
    
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(articleUrl);
    
            if (!copied) {
                const response = await apiInstanceExpress.post(
                    `article/share/${article._id}`,
                    { userId: user.id },
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        }
                    }
                );
    
                setShareCount(response.data.data.sharesCount); // Update jumlah share dari backend
            }
    
            setCopied(true); // Jangan taruh di dalam kondisi !copied
        } catch (err) {
            console.error("Gagal menyalin link atau share artikel:", err);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Share2 /> {shareCount}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Bagikan Tautan</DialogTitle>
                    <DialogDescription>
                        Siapa pun yang memiliki tautan ini dapat melihat konten ini.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">Link</Label>
                        <Input
                            id="link"
                            value={articleUrl}
                            readOnly
                        />
                    </div>
                    <Button type="submit" size="sm" className="px-3" onClick={handleCopy}>
                        {copied ? <Check /> : <Copy />}
                    </Button>
                </div>

                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button>Tutup</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ShareDialog