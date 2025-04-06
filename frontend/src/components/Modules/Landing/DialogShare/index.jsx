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

const DialogShare = () => {
    const [shareCount, setShareCount] = useState(39);
    const [copied, setCopied] = useState(false);
    const articleUrl = window.location.href;
    
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(articleUrl);

            if (!copied) setShareCount(prev => prev + 1);
            setCopied(true);
        } catch (err) {
            console.error("Gagal menyalin link:", err);
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

export default DialogShare