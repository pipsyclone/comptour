import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const taid = request.nextUrl.searchParams.get('taid')
        const data = await prisma.TouristAttractions.findUnique({
            where: { taid: taid },
            include: {
                Cultures: true,
                Comment: true
            }
        })

        return NextResponse.json({ status: 200, message: 'OK', data: data })

    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}