import { useState } from "react";

import HeaderEditor from "@/components/Modules/Article/HeaderEditor";
import ContentEditor from "@/components/Modules/Article/ContentEditor";
import ContentSelector from "@/components/Modules/Article/ContentSelector";

export default function CreateArticle() {
    const [contents, setContents] = useState([]);

    const handleDeleteContent = (id) => {
        setContents((prev) => prev.filter((item) => item.id !== id));
    };    

    return (
        <div className="min-h-screen mx-auto py-12 w-full h-full lg:max-w-4xl items-start bg-white text-neutral-900">
            <HeaderEditor />

            <div className="flex flex-col gap-3 mt-6">
                {contents.map((item) => (
                    <ContentEditor key={item.id} item={item} handleDeleteContent={handleDeleteContent} />
                ))}
            </div>

            <ContentSelector setContents={setContents} />
        </div>
    );
}
