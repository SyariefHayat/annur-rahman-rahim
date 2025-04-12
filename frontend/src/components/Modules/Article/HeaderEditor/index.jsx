import { Image, Smile } from 'lucide-react';
import React, { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const HeaderEditor = () => {
    const fileInputRef = useRef(null);

    const [emoji, setEmoji] = useState(false);
    const [cover, setCover] = useState(false);
    const [coverUrl, setCoverUrl] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const MAX_SIZE = 5 * 1024 * 1024;

        if (file && file.size > MAX_SIZE) {
            alert('Ukuran file maksimal 5MB');
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        return setCoverUrl(imageUrl);
    };

    return (
        <div className="w-full group flex flex-col gap-2">
            <div onClick={() => setEmoji(!emoji)} className={`${emoji ? "block" : "hidden"} w-20 h-20 flex items-center justify-center text-center text-7xl cursor-pointer`}>
                📒
            </div>

            <div onClick={() => fileInputRef.current?.click()} className={`${cover ? "block" : "hidden"} w-full h-80 bg-gray-300 rounded-md cursor-pointer`}>
                {coverUrl && (
                    <img
                        src={coverUrl}
                        alt="Preview"
                        className="w-full h-full object-cover object-center rounded-md"
                    />
                )}
            </div>

            <div className="group-hover:opacity-100 opacity-0 flex gap-2 text-sm text-gray-500 transition-opacity">
                <Button variant="ghost" onClick={() => setEmoji(!emoji)} className="p-2 text-xs cursor-pointer">
                    <Smile /> Tambah icon
                </Button>
                <Button variant="ghost" onClick={() => {
                    setCoverUrl("");
                    setCover(!cover);
                }} className="p-2 text-xs cursor-pointer">
                    <Image /> Tambah cover
                </Button>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />

            <Textarea
                rows={1}
                placeholder="Halaman Baru"
                className="w-full min-h-0 px-0 py-2 resize-none overflow-hidden border-none outline-none shadow-none bg-transparent md:text-5xl font-bold text-neutral-900 placeholder:text-gray-300 break-words focus-visible:ring-0"
            />
        </div>
    )
}

export default HeaderEditor