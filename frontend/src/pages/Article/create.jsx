import { z } from "zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
    Heading1, 
    Heading2, 
    Heading3, 
    Image, 
    ImagePlus, 
    Plus, 
    Smile, 
    Type 
} from "lucide-react";

import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormMessage 
} from "@/components/ui/form";

import {
    Select, 
    SelectContent, 
    SelectGroup, 
    SelectItem, 
    SelectLabel,
    SelectTrigger, 
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const postArticleSchema = z.object({
    banner: z.string().optional(),
    emote: z.string().optional(),
    title: z.string()
        .min(1, { message: "Title harus diisi" }),
    content: z.array(
        z.object({
            type: z.enum(["heading1", "heading2", "heading3", "paragraph", "image"]),
            value: z.union([
                z.string(), // untuk teks (heading, paragraf)
                z.object({ url: z.string().url(), alt: z.string().optional() }) // untuk gambar
            ])
        })
    ).min(1, { message: "Konten artikel tidak boleh kosong" }),
    author: z.string().min(1, { message: "Author wajib diisi" }),
    tags: z.array(z.string()).optional(),
})

const CreateArticle = () => {
    const fileInputRef = useRef(null);

    const [emoji, setEmoji] = useState(false);
    const [cover, setCover] = useState(false);
    const [coverUrl, setCoverUrl] = useState("");
    const [showSelect, setShowSelect] = useState(false);

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

    const form = useForm({
        resolver: zodResolver(postArticleSchema),
        defaultValues: {
            banner: "",
            emote: "",
            title: "",
            content: [],
            author: "",
            tags: [],
        }
    })

    const onSubmit = async (data) => {
        alert(data);
        console.log(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="min-h-screen mx-auto py-12 w-full h-full lg:max-w-4xl items-start bg-white text-neutral-900">
                {cover && (
                    <FormField control={form.control} name="banner" render={({ field }) => (
                        <FormItem>
                            <div onClick={() => fileInputRef.current?.click()} className="w-full h-80 bg-gray-300 rounded-md cursor-pointer" >
                                {coverUrl && (
                                    <img
                                        src={coverUrl}
                                        alt="Preview"
                                        className="w-full h-full object-cover object-center rounded-md"
                                    />
                                )}
                            </div>

                            <FormControl>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                )}

                {emoji && (
                    <FormField control={form.control} name="emote" render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className={`${emoji ? "block" : "hidden"} w-20 h-20 flex items-center justify-center text-center text-7xl`}>
                                    📒
                                </div>
                            </FormControl>
                        </FormItem>
                    )} />
                )}

                <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem className="mt-3">
                        <div className="hover:opacity-100 opacity-0 flex gap-2 text-sm text-gray-500 transition-opacity">
                            <Button variant="ghost" onClick={() => {
                                setEmoji(!emoji);
                                setCover(false);
                                }} className="p-2 text-xs cursor-pointer"
                            >
                                <Smile /> Tambah icon
                            </Button>
                            <Button variant="ghost" onClick={() => {
                                setCoverUrl("");
                                setCover(!cover);
                                setEmoji(false);
                            }} className="p-2 text-xs cursor-pointer">
                                <Image /> Tambah cover
                            </Button>
                        </div>
                        <FormControl>
                            <Textarea
                                rows={1}
                                placeholder="Halaman Baru"
                                className="w-full min-h-0 px-0 py-2 resize-none overflow-hidden border-none outline-none shadow-none bg-transparent md:text-5xl font-bold text-neutral-900 placeholder:text-gray-300 break-words focus-visible:ring-0"
                                {...field}
                            />
                        </FormControl>
                    </FormItem>
                )} />

                <FormField control={form.control} name="content" render={({ field }) => (
                    <FormItem>
                        <div className="flex items-center gap-2 mt-3 text-gray-400 -ml-10">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-xl cursor-pointer"
                                onClick={() => setShowSelect((prev) => !prev)}
                            >
                                <Plus />
                            </Button>

                            {showSelect ? (
                                <Select>
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
                                <FormControl>
                                    <Textarea
                                        // key={id}
                                        // value={value}
                                        // onChange={onChange}
                                        rows={1}
                                        placeholder="Apa yang anda pikirkan..."
                                        className="w-full min-h-0 p-0 resize-none border-none outline-none shadow-none bg-transparent md:text-lg text-neutral-700 placeholder:text-gray-300 break-words focus-visible:ring-0"
                                        {...field}
                                    />
                                </FormControl>
                            )}
                        </div>
                    </FormItem>
                )} />

                <FormField control={form.control} name="content" render={({ field }) => (
                    <FormItem>
                        <div className="flex items-center gap-2 mt-3 text-gray-400 -ml-10">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-xl cursor-pointer"
                                onClick={() => setShowSelect((prev) => !prev)}
                            >
                                <Plus />
                            </Button>

                            {showSelect ? (
                                <Select>
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
                                <FormControl>
                                    <Textarea
                                        // key={id}
                                        // value={value}
                                        // onChange={onChange}
                                        rows={1}
                                        placeholder="Apa yang anda pikirkan..."
                                        className="w-full min-h-0 p-0 resize-none border-none outline-none shadow-none bg-transparent md:text-lg text-neutral-700 placeholder:text-gray-300 break-words focus-visible:ring-0"
                                        {...field}
                                    />
                                </FormControl>
                            )}
                        </div>
                    </FormItem>
                )} />

                <div className="flex gap-3 mt-3 text-gray-300">
                    <Button variant="ghost">Tambah Konten</Button>
                    <Button variant="ghost">Posting</Button>
                </div>
            </form>
        </Form>
    );
}

export default CreateArticle

    // const [contents, setContents] = useAtom(contentsAtom);

    // const handleDeleteContent = (id) => {
    //     setContents((prev) => prev.filter((item) => item.id !== id));
    // };

    // const handleChangeContent = (id, newValue) => {
    //     setContents((prev) =>
    //         prev.map((item) =>
    //             item.id === id ? { ...item, value: newValue } : item
    //         )
    //     );
    // };

        // <div className="min-h-screen mx-auto py-12 w-full h-full lg:max-w-4xl items-start bg-white text-neutral-900">
            
        //     <HeaderEditor />

        //     <div className="flex flex-col gap-3 mt-6">
        //         {contents.map((item) => (
        //             <ContentEditor
        //                 key={item.id}
        //                 item={item}
        //                 handleDeleteContent={handleDeleteContent}
        //                 handleChangeContent={handleChangeContent}
        //             />
        //         ))}
        //     </div>

        //     <ContentSelector setContents={setContents} handleChangeContent={handleChangeContent} />
        //     <Button onClick={handleSubmit}>Submit Artikel</Button>
        // </div>