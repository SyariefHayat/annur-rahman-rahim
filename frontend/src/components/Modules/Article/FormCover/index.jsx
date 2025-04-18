import React, { useRef, useState } from 'react';

import { 
    FormControl, 
    FormField, 
    FormItem, 
    FormMessage 
} from '@/components/ui/form';

import { AspectRatio } from '@/components/ui/aspect-ratio';

const FormCover = ({ form }) => {
    const fileInputRef = useRef(null);
    const [coverUrl, setCoverUrl] = useState("");
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const MAX_SIZE = 5 * 1024 * 1024;

        if (file && file.size > MAX_SIZE) {
            alert('Ukuran file maksimal 5MB');
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setCoverUrl(imageUrl);
        form.setValue("cover", file);
    };

    return (
        <FormField control={form.control} name="cover" render={() => (
            <FormItem>
                <div onClick={() => fileInputRef.current?.click()} className="w-full bg-gray-300 rounded-md cursor-pointer">
                    <AspectRatio ratio={16 / 9}>
                        <img src={coverUrl} alt="Preview" className={`w-full h-full object-cover object-center rounded-md ${!coverUrl && "hidden" }`} />
                    </AspectRatio>
                </div>
                <FormControl>
                    <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />
    )
}

export default FormCover