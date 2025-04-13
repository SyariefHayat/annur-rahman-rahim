// @/pages/CreateArticle.jsx
import { useAtom } from 'jotai';
import { contentsAtom } from '@/jotai/atoms';
import HeaderEditor from '@/components/Modules/Article/HeaderEditor';
import ContentEditor from '@/components/Modules/Article/ContentEditor';
import ContentSelector from '@/components/Modules/Article/ContentSelector';
import { Button } from '@/components/ui/button';
import { z } from 'zod';

const ContentSchema = z.object({
    contents: z.array(
        z.object({
            id: z.number(),
            type: z.string(),
            value: z.string().optional()
        })
    )
});

const CreateArticle = () => {
    const [contents, setContents] = useAtom(contentsAtom);

    const handleDeleteContent = (id) => {
        setContents((prev) => prev.filter((item) => item.id !== id));
    };

    const handleSubmit = () => {
        const result = ContentSchema.safeParse({ contents });

        if (!result.success) {
            console.log(result.error.format());
            alert("Validasi gagal! Cek konsol.");
        } else {
            console.log("Data valid:", result.data);
            alert("Artikel valid dan siap dikirim!");
        }
    };

    return (
        <div className="min-h-screen mx-auto py-12 w-full h-full lg:max-w-4xl bg-white text-neutral-900">
            <HeaderEditor />
            <div className="flex flex-col gap-3 mt-6">
                {contents.map((item) => (
                    <ContentEditor
                        key={item.id}
                        item={item}
                        handleDeleteContent={handleDeleteContent}
                    />
                ))}
            </div>
            <ContentSelector />
            <Button onClick={handleSubmit} className="mt-4">Submit Artikel</Button>
        </div>
    );
};

export default CreateArticle;

// import { useState } from "react";

// import HeaderEditor from "@/components/Modules/Article/HeaderEditor";
// import ContentEditor from "@/components/Modules/Article/ContentEditor";
// import ContentSelector from "@/components/Modules/Article/ContentSelector";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import { useAtom } from "jotai";
// import { contentsAtom } from "@/jotai/atoms";

// const CreateArticle = () => {
//     const [contents, setContents] = useAtom(contentsAtom);

//     const handleDeleteContent = (id) => {
//         setContents((prev) => prev.filter((item) => item.id !== id));
//     };

//     const handleChangeContent = (id, newValue) => {
//         setContents((prev) =>
//             prev.map((item) =>
//                 item.id === id ? { ...item, value: newValue } : item
//             )
//         );
//     };

//     const handleSubmit = () => {
//         console.log(contents);
//     };    

//     return (
//         <div className="min-h-screen mx-auto py-12 w-full h-full lg:max-w-4xl items-start bg-white text-neutral-900">
//             <HeaderEditor />

//             <div className="flex flex-col gap-3 mt-6">
//                 {contents.map((item) => (
//                     <ContentEditor
//                         key={item.id}
//                         item={item}
//                         handleDeleteContent={handleDeleteContent}
//                         handleChangeContent={handleChangeContent}
//                     />
//                 ))}
//             </div>

//             <ContentSelector setContents={setContents} handleChangeContent={handleChangeContent} />
//             <Button onClick={handleSubmit}>Submit Artikel</Button>
//         </div>
//     );
// }

// export default CreateArticle