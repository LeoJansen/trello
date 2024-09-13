"use server"

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCardOrder } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
        return {
            error: "Unauthorized"
        };
    };

    const { items, listId } = data;
    let cards;

    try {
        const transaction = items.map((card) => {
            db.card.update({
                where: {
                    id: card.id,
                    list: {
                        board: {
                            orgId
                        },
                    },
                },
                data: {
                    order: card.order,
                },
            })
        });



    } catch (error) {
        return {
            error: "Failed to reorder"
        }
    };
    revalidatePath(`/board/${boardId}`)
    return { data: cards };

};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);