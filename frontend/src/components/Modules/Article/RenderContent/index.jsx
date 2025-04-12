import React from 'react';
import { Textarea } from '@/components/ui/textarea';

const RenderContent = ({ type, id }) => {
    switch (type) {
        case "text":
            return (
                <Textarea
                    key={id}
                    rows={1}
                    placeholder="Apa yang anda pikirkan..."
                    className="w-full min-h-0 p-0 resize-none border-none outline-none shadow-none bg-transparent md:text-lg text-neutral-700 placeholder:text-gray-300 break-words focus-visible:ring-0"
                />
            );
        case "heading-1":
            return (
                <Textarea
                    key={id}
                    rows={1}
                    placeholder="Heading 1"
                    className="w-full px-0 py-2 resize-none border-none outline-none shadow-none bg-transparent md:text-4xl font-bold text-neutral-700 placeholder:text-gray-300 break-words focus-visible:ring-0"
                />
            );
        case "heading-2":
            return (
                <Textarea
                    key={id}
                    rows={1}
                    placeholder="Heading 2"
                    className="w-full px-0 py-2 resize-none border-none outline-none shadow-none bg-transparent md:text-3xl font-semibold text-neutral-700 placeholder:text-gray-300 break-words focus-visible:ring-0"
                />
            );
        case "heading-3":
            return (
                <Textarea
                    key={id}
                    rows={1}
                    placeholder="Heading 3"
                    className="w-full min-h-0 p-0 resize-none border-none outline-none shadow-none bg-transparent md:text-2xl font-medium text-neutral-700 placeholder:text-gray-300 break-words focus-visible:ring-0"
                />
            );
        case "image":
            return (
                <div
                    key={id}
                    className="w-full h-40 bg-gray-300 rounded-md flex items-center justify-center text-gray-500"
                >
                    📷 Image Placeholder
                </div>
            );
        default:
            return null;
    }
};

export default RenderContent;