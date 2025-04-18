import React from 'react'

import { Textarea } from '@/components/ui/textarea'

const RenderContent = (item, onChange, index, handleContentBanner, contentInputRefs, contentImgUrl) => {
    return (
        <>
            {item.type === "image" ? (
                <>
                    <div onClick={() => contentInputRefs.current[index]?.click()} className="w-full h-[300px] rounded-md bg-gray-300 cursor-pointer">
                        <img src={contentImgUrl} alt="preview" className={`w-full h-full object-cover object-center rounded-md ${contentImgUrl ? "block" : "hidden"}`} />
                    </div>
                    <input ref={(el) => (contentInputRefs.current[index] = el)} type="file" className="hidden" accept="image/*" onChange={(e) => handleContentBanner(e, index)} />
                </>
            ) : (
                <Textarea
                    value={item.value}
                    onChange={(e) => onChange(e.target.value)}
                    rows={1}
                    placeholder={item.placeholder}
                    className={`w-full resize-none border-none outline-none shadow-none bg-transparent text-neutral-700 placeholder:text-gray-300 break-words break-all focus-visible:ring-0 ${
                        item.type === "text" && "min-h-0 p-0 md:text-lg"
                    } ${item.type === "heading-1" && "min-h-0 py-1 px-0 md:py-2 md:text-4xl text-3xl font-bold placeholder:capitalize border"} ${
                        item.type === "heading-2" && "min-h-0 py-1 px-0 md:text-3xl text-2xl font-semibold placeholder:capitalize"
                    } ${item.type === "heading-3" && "min-h-0 p-0 md:text-2xl text-xl font-medium placeholder:capitalize"}`}
                />
            )}
        </>
    )
}

export default RenderContent