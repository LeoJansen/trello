"use client"

import { useCardModal } from "@/hooks/use-card-modal";
import { Dialog, DialogContent } from "../ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { Header } from "./card-modal/header";
import { Description } from "./card-modal/description";
import { Actions } from "./card-modal/actions";

export const CardModal = () => {
    const id = useCardModal((state) => state.id);
    const isOpen = useCardModal((state) => state.isOpen);
    const onClose = useCardModal((state) => state.onClose);

    const { data: cardData } = useQuery<CardWithList>({
        queryKey: ["card", id],
        queryFn: () => fetcher(`/api/cards/${id}`),
    })


    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>

                {cardData ? <Header data={cardData} /> : <Header.Skeleton />}
                <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 ">
                    <div className="col-span-3">
                        <div className="w-full space-y-6">
                            {cardData ? <Description data={cardData} /> : <Description.Skeleton />}
                        </div>
                    </div>
                    {cardData ? <Actions data={cardData} /> : <Actions.Skeleton />}
                </div>
            </DialogContent>

        </Dialog>
    )
}
