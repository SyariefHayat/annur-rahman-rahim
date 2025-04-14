import { z } from "zod";
import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
    Heading1, Heading2, Heading3, Image, ImagePlus, 
    Plus, Smile, Trash, Type 
} from "lucide-react";

import { 
    Form, FormControl, FormField, FormItem, FormMessage 
} from "@/components/ui/form";

import {
    Select, SelectContent, SelectGroup, SelectItem, 
    SelectLabel, SelectTrigger, SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import EachUtils from "@/utils/EachUtils";

const postArticleSchema = z.object({
    banner: z.string().optional(),
    emote: z.string().optional(),
    title: z.string().min(1, { message: "Title harus diisi" }),
    content: z.array(
        z.object({
            type: z.enum(["heading-1", "heading-2", "heading-3", "text", "image"]),
            value: z.string().min(1, { message: "Konten tidak boleh kosong" })
        })
    ).min(1, { message: "Konten artikel tidak boleh kosong" }),
    tags: z.array(z.string()).optional(),
});

const renderContent = (item, onChange, index, handleContentBanner, contentInputRefs) => {
    return (
        <>
            {item.type === "image" ? (
                <>
                    <div onClick={() => contentInputRefs.current[index]?.click()} className="w-full h-52 rounded-md border bg-gray-300 cursor-pointer">
                        {item.value && (
                            <img src={item.value} alt="Preview" className="w-full h-full object-cover object-center rounded-md" />
                        )}
                    </div>
                    <input ref={(el) => (contentInputRefs.current[index] = el)} type="file" className="hidden" accept="image/*" onChange={(e) => handleContentBanner(e, index)} />
                </>
            ) : (
                <Textarea
                    value={item.value}
                    onChange={(e) => onChange(e.target.value)}
                    rows={1}
                    placeholder={item.placeholder}
                    className={`w-full resize-none border-none outline-none shadow-none bg-transparent text-neutral-700 placeholder:text-gray-300 break-words focus-visible:ring-0 ${
                        item.type === "text" && "min-h-0 p-0 md:text-lg"
                    } ${item.type === "heading-1" && "px-0 py-2 md:text-4xl font-bold placeholder:capitalize"} ${
                        item.type === "heading-2" && "min-h-0 py-1 px-0 md:text-3xl font-semibold placeholder:capitalize"
                    } ${item.type === "heading-3" && "min-h-0 p-0 md:text-2xl font-medium placeholder:capitalize"}`}
                />
            )}
        </>
    );
};

const CreateArticle = () => {
    const fileInputRef = useRef(null);
    const contentInputRefs = useRef({});

    const [emoji, setEmoji] = useState(false);
    const [cover, setCover] = useState(false);
    const [coverUrl, setCoverUrl] = useState("");
    const [showSelectIndex, setShowSelectIndex] = useState(null);

    const [contents, setContents] = useState([
        {
            type: "text",
            placeholder: "Apa yang anda pikirkan...",
            value: ""
        },
    ]);

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
    });

    useEffect(() => {
        const filteredContents = contents.map(({ type, value }) => ({ type, value }));
        form.setValue("content", filteredContents);
    }, [contents]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const MAX_SIZE = 5 * 1024 * 1024;

        if (file && file.size > MAX_SIZE) {
            alert('Ukuran file maksimal 5MB');
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setCoverUrl(imageUrl);
        form.setValue("banner", imageUrl);
    };

    const handleContentBanner = (e, index) => {
        const file = e.target.files[0];
        const MAX_SIZE = 5 * 1024 * 1024;
    
        if (file && file.size > MAX_SIZE) {
            alert("Ukuran file maksimal 5MB");
            return;
        }
    
        const imageUrl = URL.createObjectURL(file);
    
        // Simpan juga value url gambar di konten
        const newContents = [...contents];
        newContents[index].value = imageUrl;
        setContents(newContents);
    };
    

    const handleContentChange = (index, value) => {
        const newContents = [...contents];
        newContents[index].value = value;
        setContents(newContents);
    };

    const handleAddContent = () => {
        setContents([
            ...contents,
            {
                type: "text",
                placeholder: "Apa yang anda pikirkan...",
                value: ""
            }
        ]);
    };

    const handleRemoveContent = (index) => {
        if (contents.length === 1) return;
        
        const newContents = contents.filter((_, i) => i !== index);
        setContents(newContents);
    };

    const onSubmit = async (data) => {
        console.log("✅ Submit:", data);
        alert(JSON.stringify(data, null, 2));
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="min-h-screen mx-auto py-12 w-full h-full lg:max-w-4xl items-start bg-white text-neutral-900">
                
                {/* COVER IMAGE */}
                {cover && (
                    <FormField control={form.control} name="banner" render={() => (
                        <FormItem>
                            <div onClick={() => fileInputRef.current?.click()} className="w-full h-80 bg-gray-300 rounded-md cursor-pointer">
                                {coverUrl && (
                                    <img src={coverUrl} alt="Preview" className="w-full h-full object-cover object-center rounded-md" />
                                )}
                            </div>
                            <FormControl>
                                <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                )}

                {/* EMOJI */}
                {emoji && (
                    <FormField control={form.control} name="emote" render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <input
                                    type="text"
                                    {...field}
                                    maxLength={2}
                                    placeholder="📒"
                                    className="w-20 h-20 text-6xl text-center"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                )}

                {/* TITLE */}
                <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem className="mt-3">
                        <div className="hover:opacity-100 opacity-100 flex gap-2 text-sm text-gray-500 transition-opacity">
                            <Button type="button" variant="ghost" onClick={() => {
                                setEmoji(!emoji);
                                setCover(false);
                            }} className="p-2 text-xs">
                                <Smile /> Tambah icon
                            </Button>

                            <Button type="button" variant="ghost" onClick={() => {
                                setCoverUrl("");
                                setCover(!cover);
                                setEmoji(false);
                            }} className="p-2 text-xs">
                                <Image /> Tambah cover
                            </Button>
                        </div>

                        <FormControl>
                            <Textarea {...field} rows={1} placeholder="Halaman Baru" className="w-full min-h-0 px-0 py-2 resize-none overflow-hidden border-none outline-none shadow-none bg-transparent md:text-5xl font-bold text-neutral-900 placeholder:text-gray-300 break-words focus-visible:ring-0" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                {/* CONTENT */}
                <EachUtils 
                    of={contents}
                    render={(item, index) => (
                        <FormField
                            key={index}
                            control={form.control}
                            name={`content.${index}.value`}
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2 mt-3 text-gray-400 -ml-20">
                                    <FormControl>
                                        <div className="w-full flex gap-1 items-center">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="text-xl"
                                                onClick={() => setShowSelectIndex(index === showSelectIndex ? null : index)}
                                            >
                                                <Plus />
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleRemoveContent(index)}
                                                className="hover:text-red-500"
                                            >
                                                <Trash />
                                            </Button>

                                            <div className="flex-1">
                                                {showSelectIndex === index ? (
                                                    <Select
                                                        onValueChange={(val) => {
                                                            const newContents = [...contents];
                                                            newContents[index].type = val;
                                                            newContents[index].placeholder = val.replace("-", " ");
                                                            setContents(newContents);
                                                            setShowSelectIndex(null);
                                                        }}
                                                    >
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Pilih Konten" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Basic</SelectLabel>
                                                                <SelectItem value="text"><Type /> Text</SelectItem>
                                                                <SelectItem value="heading-1"><Heading1 /> Heading 1</SelectItem>
                                                                <SelectItem value="heading-2"><Heading2 /> Heading 2</SelectItem>
                                                                <SelectItem value="heading-3"><Heading3 /> Heading 3</SelectItem>
                                                            </SelectGroup>
                                                            <SelectGroup>
                                                                <SelectLabel>Media</SelectLabel>
                                                                <SelectItem value="image"><ImagePlus /> Image</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                ) : (
                                                    renderContent(
                                                        { ...item, value: field.value },
                                                        (value) => handleContentChange(index, value),
                                                        index,
                                                        handleContentBanner,
                                                        contentInputRefs
                                                    )
                                                    

                                                )}
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="ml-20" />
                                </FormItem>
                            )}
                        />
                    )}
                />

                <div className="flex gap-3 mt-6">
                    <Button type="button" variant="outline" onClick={handleAddContent}>
                        Tambah Konten
                    </Button>
                    <Button type="submit">Posting</Button>
                </div>
            </form>
        </Form>
    );
};

export default CreateArticle;