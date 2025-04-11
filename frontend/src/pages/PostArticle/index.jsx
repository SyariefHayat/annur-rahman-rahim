import { Button } from "@/components/ui/button";
import { Image, Smile } from "lucide-react";
import { useState } from "react";

export default function EditorPage() {
    const [hovered, setHovered] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return (
        <div className="min-h-screen mx-auto py-40 w-full h-full lg:max-w-4xl items-start bg-white text-neutral-900">
            <div className="w-full group flex flex-col gap-2">
                <div className="group-hover:opacity-100 opacity-0 flex gap-2 text-sm text-gray-500 transition-opacity">
                    <Button variant="ghost" className="p-2 text-xs cursor-pointer">
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
                    className="w-full text-5xl font-bold text-neutral-900 bg-transparent focus:outline-none placeholder:text-gray-300"
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



// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from '@/components/ui/form'

// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Minus, Plus } from 'lucide-react'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { z } from 'zod'
// import { useRef, useState } from 'react'
// import { toast, Toaster } from 'sonner'
// import { Separator } from '@/components/ui/separator'
// import { Textarea } from '@/components/ui/textarea'

// const formSchema = z.object({
//     title: z.string().min(1, 'Judul artikel wajib diisi'),
//     contents: z.array(z.string().min(1, 'Paragraf tidak boleh kosong')),
//     banner: z.string().min(1, 'Banner harus diunggah'),
// })

// export default function PostArticle() {
//     const fileInputRef = useRef(null)
//     const [contents, setContents] = useState([''])
//     const [banner, setBanner] = useState('')

//     const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             title: '',
//             banner: '',
//             contents: [{ paragraph: "" }],
//         },
//     })

//     const handleFileChange = (e) => {
//         const file = e.target.files[0]
//         const MAX_SIZE = 5 * 1024 * 1024

//         if (file && file.size > MAX_SIZE) {
//             toast.error('Ukuran file maksimal 5MB')
//             return
//         }

//         const imageUrl = URL.createObjectURL(file)
//         setBanner(imageUrl)
//         form.setValue('banner', imageUrl)
//     }

//     const handleAddContent = () => {
//         const updated = [...contents, '']
//         setContents(updated)
//         form.setValue('contents', updated)
//     }

//     const handleContentChange = (index, value) => {
//         const updated = [...contents]
//         updated[index] = value
//         setContents(updated)
//         form.setValue('contents', updated)
//     }

//     const handleRemoveContent = (index) => {
//         const updated = contents.filter((_, i) => i !== index)
//         setContents(updated)
//         form.setValue('contents', updated)
//     }

//     const onSubmit = (data) => {
//         alert(`${data.title} ${data.contents} ${data.banner}`)
//         toast.success('Artikel berhasil disubmit!')
//     }

//     return (
//         <section className="mx-auto my-12 flex flex-col gap-6 w-full h-full lg:max-w-4xl items-start">
//             <Toaster />
//             <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
//                     {/* Banner Upload */}
//                     <FormField
//                     control={form.control}
//                     name="banner"
//                     render={() => (
//                         <FormItem>
//                             <div className="w-full h-80 bg-gray-200 rounded-md relative flex items-center justify-center overflow-hidden">
//                                 {banner && (
//                                     <img
//                                         src={banner}
//                                         alt="Preview"
//                                         className="absolute top-0 left-0 w-full h-full object-cover z-0"
//                                     />
//                                 )}

//                                 <div className="z-10">
//                                     <Button type="button" onClick={() => fileInputRef.current?.click()} className="cursor-pointer">
//                                         <Plus className="mr-2" />
//                                         Tambah Banner
//                                     </Button>
//                                 </div>

//                                 <input
//                                     ref={fileInputRef}
//                                     type="file"
//                                     className="hidden"
//                                     accept="image/*"
//                                     onChange={handleFileChange}
//                                 />
//                             </div>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                     />
        
//                     {/* Title */}
//                     <FormField
//                     control={form.control}
//                     name="title"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormControl>
//                                 <Input
//                                     placeholder="Judul Artikel"
//                                     className="p-4"
//                                     {...field}
//                                 />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                     />
        
//                     {/* Konten Dinamis */}
//                     <FormField
//                     control={form.control}
//                     name="contents"
//                     render={({ field }) => (
//                         <FormItem>
//                             <div className="flex flex-col gap-4">
//                                 {contents.map((content, index) => (
//                                 <div key={index} className="relative">
//                                     {contents.length > 1 && (
//                                         <button
//                                             type="button"
//                                             onClick={() => handleRemoveContent(index)}
//                                             className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
//                                             title="Hapus paragraf"
//                                         >
//                                             <Minus size={18} />
//                                         </button>
//                                     )}

//                                     <FormControl>
//                                         <Textarea
//                                             value={content}
//                                             placeholder={`Tulis paragraf ke-${index + 1}`}
//                                             onChange={(e) => handleContentChange(index, e.target.value)}
//                                             className="p-4 resize-none"
//                                             {...field}
//                                         />
//                                     </FormControl>
//                                 </div>
//                                 ))}
//                             </div>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                     />
        
//                     <div className="flex gap-4">
//                     <Button type="button" onClick={handleAddContent} variant="outline">
//                         <Plus size={18} className="mr-1" />
//                         Tambah Konten
//                     </Button>
//                     <Button type="submit" className="bg-blue-600 text-white">
//                         Submit Artikel
//                     </Button>
//                     </div>
//                 </form>
//             </Form>
//         </section>
//     )
// }