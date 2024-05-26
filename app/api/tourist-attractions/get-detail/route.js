import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const taid = request.nextUrl.searchParams.get('taid')
        const touristattractions = await prisma.TouristAttractions.findUnique({
            where: { taid: taid }
        })

        const cultures = await prisma.cultures.findMany({
            where: { taid: taid }
        })

        const comments = await prisma.comments.findMany({
            where: { taid: taid }
        })

        return NextResponse.json({
            status: 200, message: 'OK', details: {
                touristattractions,
                cultures: cultures.map((data) => ({
                    name_image: data.name_image,
                    image: data.image
                })),
                comments: comments.map((data) => ({
                    name: data.name,
                    desc: data.description,
                    time: data.time
                }))
            }
        })

    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}