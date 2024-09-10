"use client"


import { Button } from "@/components/ui/button";

import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { MoreHorizontal } from "lucide-react";
interface BoardOptionsProps {
    id: string;
}

export const BoardOptions = ({ id }) => {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="transparent">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
            className="px-0 pt-3 pb-3"
            side="bottom"
            align="start"
            >

            </PopoverContent>

        </Popover>
    )

}