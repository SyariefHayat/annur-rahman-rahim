// @/components/Modules/Article/ContentSelector.jsx
import React, { useState } from 'react';
import { Plus, Heading1, Heading2, Heading3, Type, ImagePlus } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { contentsAtom } from '@/jotai/atoms';

const ContentSelector = () => {
    const [showSelect, setShowSelect] = useState(false);
    const [, setContents] = useAtom(contentsAtom);

    const handleSelect = (value) => {
        setContents((prev) => [
            ...prev,
            { id: Date.now(), type: value, value: "" }
        ]);
        setShowSelect(false);
    };

    return (
        <div className="flex items-center gap-2 mt-6">
            <Button variant="ghost" size="icon" onClick={() => setShowSelect(!showSelect)}>
                <Plus />
            </Button>
            {showSelect && (
                <Select onValueChange={handleSelect}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Pilih Konten" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Basic</SelectLabel>
                            <SelectItem value="text"><Type className="mr-2" /> Text</SelectItem>
                            <SelectItem value="heading-1"><Heading1 className="mr-2" /> Heading 1</SelectItem>
                            <SelectItem value="heading-2"><Heading2 className="mr-2" /> Heading 2</SelectItem>
                            <SelectItem value="heading-3"><Heading3 className="mr-2" /> Heading 3</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                            <SelectLabel>Media</SelectLabel>
                            <SelectItem value="image"><ImagePlus className="mr-2" /> Image</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}
        </div>
    );
};

export default ContentSelector;

// import React, { useState } from 'react'

// import {
//     Heading1, 
//     Heading2, 
//     Heading3, 
//     ImagePlus, 
//     Plus, 
//     Type
// } from "lucide-react";

// import {
//     Select, 
//     SelectContent, 
//     SelectGroup, 
//     SelectItem, 
//     SelectLabel,
//     SelectTrigger, 
//     SelectValue,
// } from "@/components/ui/select";

// import RenderContent from '../RenderContent';
// import { Button } from "@/components/ui/button";
// import { useAtom } from 'jotai';
// import { contentsAtom } from '@/jotai/atoms';

// const ContentSelector = () => {
//     const [showSelect, setShowSelect] = useState(false);
//     const [, setContents] = useAtom(contentsAtom);

//     const handleSelect = (value) => {
//         setContents((prev) => [
//             ...prev,
//             { id: Date.now(), type: value }
//         ]);
//         setShowSelect(false);
//     };

//     return (
//         <div className="flex items-center gap-2 mt-3 text-gray-400 -ml-10">
//             <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-xl cursor-pointer"
//                 onClick={() => setShowSelect((prev) => !prev)}
//             >
//                 <Plus />
//             </Button>

//             {showSelect ? (
//                 <Select onValueChange={handleSelect}>
//                     <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Pilih Konten" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectGroup>
//                             <SelectLabel>Basic</SelectLabel>
//                             <SelectItem value="text">
//                                 <Type /> Text
//                             </SelectItem>
//                             <SelectItem value="heading-1">
//                                 <Heading1 /> Heading 1
//                             </SelectItem>
//                             <SelectItem value="heading-2">
//                                 <Heading2 /> Heading 2
//                             </SelectItem>
//                             <SelectItem value="heading-3">
//                                 <Heading3 /> Heading 3
//                             </SelectItem>
//                         </SelectGroup>
//                         <SelectGroup>
//                             <SelectLabel>Media</SelectLabel>
//                             <SelectItem value="image">
//                                 <ImagePlus /> Image
//                             </SelectItem>
//                         </SelectGroup>
//                     </SelectContent>
//                 </Select>
//             ) : (
//                 <div className="w-full">
//                     <RenderContent type="text" id="text-default" />
//                 </div>
//             )}
//         </div>
//     )
// }

// export default ContentSelector