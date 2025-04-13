// @/components/Modules/Article/ContentEditor.jsx
import React from 'react';
import { useAtom } from 'jotai';
import { contentsAtom } from '@/jotai/atoms';
import { Button } from '@/components/ui/button';
import RenderContent from '../RenderContent';

const ContentEditor = ({ item, handleDeleteContent }) => {
    const [contents, setContents] = useAtom(contentsAtom);

    const handleChange = (e) => {
        setContents((prev) =>
            prev.map((c) =>
                c.id === item.id ? { ...c, value: e.target.value } : c
            )
        );
    };

    return (
        <div className="relative group border rounded-md p-3">
            <RenderContent
                type={item.type}
                id={item.id}
                value={item.value || ""}
                onChange={handleChange}
            />
            <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDeleteContent(item.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                Hapus
            </Button>
        </div>
    );
};

export default ContentEditor;

// import { Button } from '@/components/ui/button'
// import { Trash } from 'lucide-react'
// import React from 'react'
// import RenderContent from '../RenderContent'

// const ContentEditor = ({ item ,handleDeleteContent, handleChangeContent }) => {
//     const handleChange = (e) => {
//         handleChangeContent(item.id, e.target.value);
//     };

//     return (
//         <div className="flex items-center gap-2 mt-3 text-gray-400 -ml-10">
//             <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-xl cursor-pointer hover:text-red-400"
//                 onClick={() => handleDeleteContent(item.id)}
//             >
//                 <Trash />
//             </Button>

//             <div className="w-full">
//                 <RenderContent type={item.type} id={item.id} value={item.value} onChange={handleChange} />
//             </div>
//         </div>
//     )
// }

// export default ContentEditor