import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Plus, Trash } from 'lucide-react';
import React, { useState } from 'react'

const FormTag = ({ form }) => {
    const [tagInput, setTagInput] = useState("");

    return (
        <FormField control={form.control} name="tags" render={({ field }) => {
            const handleAddTag = () => {
                if (tagInput.trim() !== "") {
                    field.onChange([...(field.value || []), tagInput.trim()]);
                    setTagInput("");
                }
            };

            const handleRemoveTag = (index) => {
                const updatedTags = (field.value || []).filter((_, i) => i !== index);
                field.onChange(updatedTags);
            };

            return (
                <FormItem className="mt-4">
                    <FormControl>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Input
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    placeholder="Tambah tag..."
                                    className="flex-grow"
                                />
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="icon"
                                    onClick={handleAddTag}
                                >
                                    <Plus />
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {(field.value || []).map((tag, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm"
                                    >
                                        <span>{tag}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTag(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            );
        }} />
    )
}

export default FormTag;
