"use client"

import { useCardModal } from "@/hooks/use-card-modal";

import { useQuery } from "@tanstack/react-query";
import { CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";

import { AuditLog } from "@prisma/client";

import { Header } from "./header";
import { Description } from "./description";
import { Activity } from "./activity";
import { Actions } from "./actions";
import { Dialog, DialogContent } from "@/components/ui/dialog";


export const CardModal = () => {
    const id = useCardModal((state) => state.id);
    const isOpen = useCardModal((state) => state.isOpen);
    const onClose = useCardModal((state) => state.onClose);

    const { data: cardData } = useQuery<CardWithList>({
        queryKey: ["card", id],
        queryFn: () => fetcher(`/api/cards/${id}`),
    })

    const { data: auditLogsData } = useQuery<AuditLog[]>({
        queryKey: ["card-logs", id],
        queryFn: () => fetcher(`/api/cards/${id}/logs`),
    })


    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        
        >
            <DialogContent>

                {cardData ? <Header data={cardData} /> : <Header.Skeleton />}
                <div className="mt-44 grid grid-cols-1 md:grid-cols-4 md:gap-4 z-80">
                    <div className="col-span-3">
                        <div className="w-full space-y-6">
                            {cardData ? <Description data={cardData} /> : <Description.Skeleton />}
                            {auditLogsData ? <Activity items={auditLogsData} /> : <Activity.Skeleton />}
                        </div>
                    </div>
                    {cardData ? <Actions data={cardData} /> : <Actions.Skeleton />}
                </div>
            </DialogContent>

        </Dialog>
    )
}
