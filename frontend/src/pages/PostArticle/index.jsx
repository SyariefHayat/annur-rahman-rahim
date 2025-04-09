import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Minus, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRef, useState } from 'react'
import { toast, Toaster } from 'sonner'
import { Separator } from '@/components/ui/separator'

const formSchema = z.object({
    title: z.string().min(1, 'Judul artikel wajib diisi'),
    contents: z.array(z.string().min(1, 'Paragraf tidak boleh kosong')),
    banner: z.string().min(1, 'Banner harus diunggah'),
})

export default function PostArticle() {
    const fileInputRef = useRef(null)
    const [contents, setContents] = useState([''])
    const [banner, setBanner] = useState('')

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            contents: [''],
            banner: '',
        },
    })

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        const MAX_SIZE = 5 * 1024 * 1024
        if (file && file.size > MAX_SIZE) {
            toast.error('Ukuran file maksimal 5MB')
            return
        }

        const imageUrl = URL.createObjectURL(file)
        setBanner(imageUrl)
        form.setValue('banner', imageUrl)
    }

    const handleAddContent = () => {
        const updated = [...contents, '']
        setContents(updated)
        form.setValue('contents', updated)
    }

    const handleContentChange = (index, value) => {
        const updated = [...contents]
        updated[index] = value
        setContents(updated)
        form.setValue('contents', updated)
    }

    const handleRemoveContent = (index) => {
        const updated = contents.filter((_, i) => i !== index)
        setContents(updated)
        form.setValue('contents', updated)
    }

    const onSubmit = (data) => {
        alert(`${data.title} ${data.contents} ${data.banner}`)
        toast.success('Artikel berhasil disubmit!')
    }

    return (
        <section className="mx-auto my-12 flex flex-col gap-6 w-full h-full lg:w-4xl items-start">
            <Toaster />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    {/* Banner Upload */}
                    <FormField
                    control={form.control}
                    name="banner"
                    render={() => (
                        <FormItem>
                            <div className="w-full h-80 bg-gray-200 rounded-md relative flex items-center justify-center overflow-hidden">
                                {banner && (
                                <img
                                    src={banner}
                                    alt="Preview"
                                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                                />
                                )}
                                <div className="z-10">
                                <Button type="button" onClick={() => fileInputRef.current?.click()}>
                                    <Plus className="mr-2" />
                                    Tambah Banner
                                </Button>
                                </div>
                                <input
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                                />
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
        
                    {/* Title */}
                    <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <input
                                placeholder="Judul Artikel"
                                className="text-4xl font-semibold tracking-tight outline-none border-b-2 border-gray-300 rounded-none"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
        
                    {/* Konten Dinamis */}
                    <FormField
                    control={form.control}
                    name="contents"
                    render={() => (
                        <FormItem>
                            <div className="flex flex-col gap-4">
                                {contents.map((content, index) => (
                                <div key={index} className="relative">
                                    {contents.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveContent(index)}
                                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                                        title="Hapus paragraf"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    )}
                                    <FormControl>
                                    <textarea
                                        rows={4}
                                        value={content}
                                        placeholder={`Tulis paragraf ke-${index + 1}`}
                                        onChange={(e) => handleContentChange(index, e.target.value)}
                                        className="w-full p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    </FormControl>
                                </div>
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
        
                    <div className="flex gap-4">
                    <Button type="button" onClick={handleAddContent} variant="outline">
                        <Plus size={18} className="mr-1" />
                        Tambah Konten
                    </Button>
                    <Button type="submit" className="bg-blue-600 text-white">
                        Submit Artikel
                    </Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}