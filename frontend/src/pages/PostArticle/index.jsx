import { useState } from "react";
import { Image, Smile } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function EditorPage() {
    const [title, setTitle] = useState("");
    const [emoji, setEmoji] = useState("");

    return (
        <div className="min-h-screen mx-auto py-40 w-full h-full lg:max-w-4xl items-start bg-white text-neutral-900">
            <div className="w-full group flex flex-col gap-2">
                {emoji && (
                    <div onClick={() => setEmoji("")} className="w-20 h-20 flex items-center justify-center text-center text-7xl cursor-pointer">
                        {emoji}
                    </div>
                )}

                <div className="group-hover:opacity-100 opacity-0 flex gap-2 text-sm text-gray-500 transition-opacity">
                    <Button variant="ghost" onClick={() => setEmoji("📒")} className="p-2 text-xs cursor-pointer">
                        <Smile /> Tambah icon
                    </Button>
                    <Button variant="ghost" className="p-2 text-xs cursor-pointer">
                        <Image /> Tambah cover
                    </Button>
                </div>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="New page"
                    className="w-full text-5xl pl-2 font-bold text-neutral-900 bg-transparent focus:outline-none placeholder:text-gray-300"
                />
            </div>
            {/* Baris input di bawah title */}
            {/* <div className="flex items-center gap-2 mt-6 text-gray-400">
                    <Button
                        variant="ghost"
                        className="p-1 h-auto text-lg font-bold hover:text-gray-600"
                    >
                        +
                    </Button>
                <span className="text-lg font-bold cursor-move">⋮⋮</span>
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write, press ‘space’ for AI, ‘/’ for commands..."
                    className="flex-1 bg-transparent focus:outline-none text-sm text-neutral-700 placeholder:text-gray-400"
                />
                </div> */}
        </div>
    );
}