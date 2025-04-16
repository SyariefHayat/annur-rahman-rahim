import { z } from "zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormMessage 
} from "@/components/ui/form";

import { userAtomStorage } from "@/jotai/atoms";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import FormTag from "@/components/Modules/Article/FormTag";
import FormCover from "@/components/Modules/Article/FormCover";
import FormContent from "@/components/Modules/Article/FormContent";
import { apiInstanceExpress } from "@/services/express/apiInstance";

const postArticleSchema = z.object({
    cover: z
    .any()
    .refine(
        (file) => file instanceof File || (file && file.length > 0),
        { message: "Banner harus diisi",}
    ),
    title: z.string().min(1, { message: "Title harus diisi" }),
    content: z.array(
        z.object({
            type: z.enum(["heading-1", "heading-2", "heading-3", "text", "image"]),
            value: z.any(),
        }).refine(
            (data) => {
                if (data.type === "image") {
                return data.value instanceof File || (data.value && data.value.length > 0);
                } else {
                return typeof data.value === "string" && data.value.trim().length > 0;
                }
            },
            {
                message: "Konten tidak boleh kosong",
                path: ["value"], // supaya error muncul di field value
            }
        )
        ).min(1, { message: "Konten artikel tidak boleh kosong" }),
    tags: z.array(z.string()).optional(),
});

const CreateArticle = () => {
    const [user] = useAtom(userAtomStorage)
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
            cover: "",
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

    const onSubmit = async (data) => {
        console.log("✅ Submit:", data);

        const formData = new FormData();
    
        // Tambahkan cover (pastikan data.cover adalah File)
        if (data.cover) {
            formData.append("cover", data.cover);
        }
    
        // Tambahkan field biasa
        formData.append("title", data.title);
        formData.append("description", "");
        formData.append("createdBy", user.id);
    
        // Tambahkan tags jika ada
        (data.tags || []).forEach((tag) => {
            formData.append("tags", tag);
        });
    
        // Tambahkan konten (harus diubah ke string JSON dulu)
        formData.append("content", JSON.stringify(data.content));
    
        // Cari item konten yang berupa image
        data.content.forEach((item) => {
            if (item.type === "image" && item.value) {
                formData.append("image", item.value);
            }
        });
    
        try {
            const response = await apiInstanceExpress.post("article", formData, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
    
            if (response.status === 201) {
                alert("Berhasil");
            }
        } catch (error) {
            console.error("❌ Submit error:", error);
        }
    };
    

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="min-h-screen mx-auto px-5 py-12 w-full h-full lg:max-w-4xl items-start bg-white text-neutral-900">
                
                {/* COVER IMAGE */}
                <FormCover form={form} />

                {/* TAGS */}
                <FormTag form={form} />

                {/* TITLE */}
                <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Textarea rows={1} placeholder="Halaman Baru" className="w-full min-h-0 px-0 py-2 resize-none overflow-hidden border-none outline-none shadow-none bg-transparent text-4xl md:text-5xl font-bold text-neutral-900 placeholder:text-gray-300 break-words focus-visible:ring-0" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                {/* CONTENT */}
                <FormContent contents={contents} setContents={setContents} form={form} />

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