"use client"

import { unsplash } from "@/lib/unsplash";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface FormPickerProps {
    id: string;
    errors?: Record<string, string[] | undefined>
};

export const FormPicker = ({
    id,
    errors
}: FormPickerProps) => {
    const [images, setImages] = useState<Array<Record<string, any>>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [selectedImageId, setSelectedImageId] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const result = await unsplash.photos.getRandom({
                    collectionIds: ["317099"],
                    count: 9
                });
                if(result && result.response) {
                    const newImages = (result.response as Array<Record<string, any>>);
                    setImages(newImages);
                } else {
                    console.error("Failed to get images from Unsplash");
                }
                
            } catch (error) {
                console.log(error)
                setImages([])
                
            } finally {
                setIsLoading(true)
            }
        }


    }, []);

    if(isLoading) {
        return (
            <div className="p-6 flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-sky-700 animate-spin"/>
        </div>


        )
        
    }

    return (
        <div>
            Form Picker
        </div>
    );
};