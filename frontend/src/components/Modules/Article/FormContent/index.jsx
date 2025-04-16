import React, { useRef, useState } from 'react'

import { 
    Heading1, 
    Heading2, 
    Heading3, 
    ImagePlus, 
    Plus, 
    Trash, 
    Type, 
} from "lucide-react";

import {
    Select, 
    SelectContent, 
    SelectGroup, 
    SelectItem, 
    SelectLabel, 
    SelectTrigger, 
    SelectValue,
} from "@/components/ui/select";

import { 
    FormControl, 
    FormField, 
    FormItem, 
    FormMessage 
} from '@/components/ui/form';

import EachUtils from '@/utils/EachUtils';
import RenderContent from '../RenderContent';
import { Button } from '@/components/ui/button';

const FormContent = ({ contents, setContents, form }) => {
    const contentInputRefs = useRef({});
    const [contentImgUrl, setContentImgUrl] = useState("");
    const [showSelectIndex, setShowSelectIndex] = useState(null);

    const handleContentBanner = (e, index) => {
        const file = e.target.files[0];
        const MAX_SIZE = 5 * 1024 * 1024;
    
        if (file && file.size > MAX_SIZE) {
            alert("Ukuran file maksimal 5MB");
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setContentImgUrl(imageUrl);

        console.log(file);

        // Simpan juga value url gambar di konten
        const newContents = [...contents];
        newContents[index].value = file;
        setContents(newContents);
    };

    const handleContentChange = (index, value) => {
        const newContents = [...contents];
        newContents[index].value = value;
        setContents(newContents);
    };

    const handleRemoveContent = (index) => {
        if (contents.length === 1) return;
        
        const newContents = contents.filter((_, i) => i !== index);
        setContents(newContents);
    };

    return (
        <>
            <EachUtils 
                of={contents}
                render={(item, index) => (
                    <FormField
                        key={index}
                        control={form.control}
                        name={`content.${index}.value`}
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2 mt-3 text-gray-400">
                                <FormControl>
                                    <div className="min-w-full flex flex-col-reverse md:flex-row gap-1 items-start md:items-center md:-ml-20">
                                        <div className="flex gap-3 md:gap-2">
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
                                        </div>
                                        <div className="w-full flex-1">
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
                                                    <SelectTrigger className="w-full md:w-[180px]">
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
                                                RenderContent(
                                                    { ...item, value: field.value },
                                                    (value) => handleContentChange(index, value),
                                                    index,
                                                    handleContentBanner,
                                                    contentInputRefs,
                                                    contentImgUrl
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
        </>
    )
}

export default FormContent