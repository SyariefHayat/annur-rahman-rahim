import { useRef, useState } from "react";
import { Heading1, Heading2, Heading3, Image, ImagePlus, Smile, Text, Type } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function EditorPage() {
    const [title, setTitle] = useState("");
    const [emoji, setEmoji] = useState(false);
    const [cover, setCover] = useState(false);
    const [coverUrl, setCoverUrl] = useState("");
    const [showSelect, setShowSelect] = useState(false);
    const [selectedContent, setSelectedContent] = useState("text");

    const fileInputRef = useRef(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        const MAX_SIZE = 5 * 1024 * 1024

        if (file && file.size > MAX_SIZE) {
            alert('Ukuran file maksimal 5MB');
            return;
        }

        const imageUrl = URL.createObjectURL(file)
        return setCoverUrl(imageUrl);
    }

    const handleSelect = (value) => {
        setSelectedContent(value);
        setShowSelect(false);
    };

    const renderContent = () => {
        switch (selectedContent) {
            case "text":
            return (
                <Textarea
                    rows={1}
                    placeholder="Apa yang anda pikirkan..."
                    className="w-full min-h-0 p-0 resize-none border-none outline-none shadow-none bg-transparent md:text-lg text-neutral-700 placeholder:text-gray-400 break-words focus-visible:ring-0"
                />
            );
            case "heading-1":
                return (
                    <Textarea
                        rows={1}
                        placeholder="Heading 1"
                        className="w-full px-0 py-2 resize-none border-none outline-none shadow-none bg-transparent md:text-4xl font-bold text-neutral-700 placeholder:text-gray-400 break-words focus-visible:ring-0"
                    />
                );
            case "heading-2":
                return (
                    <Textarea
                        rows={1}
                        placeholder="Heading 2"
                        className="w-full px-0 py-2 resize-none border-none outline-none shadow-none bg-transparent md:text-3xl font-semibold text-neutral-700 placeholder:text-gray-400 break-words focus-visible:ring-0"
                    />
                );
            case "heading-3":
                return (
                    <Textarea
                        rows={1}
                        placeholder="Heading 3"
                        className="w-full min-h-0 p-0 resize-none border-none outline-none shadow-none bg-transparent md:text-2xl font-medium text-neutral-700 placeholder:text-gray-400 break-words focus-visible:ring-0"
                    />
                );
            case "image":
                return <div className="w-full h-40 bg-gray-300 rounded-md">📷 Image Placeholder</div>;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen mx-auto py-12 w-full h-full lg:max-w-4xl items-start bg-white text-neutral-900">
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
            
            {/* Baris input di bawah title */}
            <div className="flex items-center gap-2 mt-3 text-gray-400 -ml-10">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-xl cursor-pointer"
                    onClick={() => setShowSelect((prev) => !prev)}
                >
                    +
                </Button>

                {/* Conditional render Textarea or Select */}
                {showSelect ? (
                    <Select onValueChange={handleSelect}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Pilih Konten" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Basic</SelectLabel>
                                <SelectItem value="text">
                                    <Type /> Text
                                </SelectItem>
                                <SelectItem value="heading-1">
                                    <Heading1 /> Heading 1
                                </SelectItem>
                                <SelectItem value="heading-2">
                                    <Heading2 /> Heading 2
                                </SelectItem>
                                <SelectItem value="heading-3">
                                    <Heading3 /> Heading 3
                                </SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel>Media</SelectLabel>
                                <SelectItem value="image">
                                    <ImagePlus /> Image
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                ) : (
                    <div className="w-full">{renderContent()}</div>
                )}
            </div>
        </div>
    );
}