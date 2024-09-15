import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { cardId: string } }
) {
    try {
        const {userId, orgId} = auth();

        if(!userId || !orgId) {
            return new NextResponse("Unauthorized", {status: 401})

        }

    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }

}