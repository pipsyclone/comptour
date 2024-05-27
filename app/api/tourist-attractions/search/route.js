import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json()
        const data = await prisma.TouristAttractions.findMany({
            where: {
                OR: [
                    { name_place: { contains: body.query, mode: 'insensitive' } },
                    { description: { contains: body.query, mode: 'insensitive' } }
                ]
            }
        })

        const results = data.map(data => ({
            taid: data.taid,
            name: data.name_place,
            desc: data.description,
            image: data.image
        }))

        if (results.length < 1) {
            return NextResponse.json({ status: 404, message: 'Data tidak ditemukan!' })
        } else {
            return NextResponse.json({ status: 200, message: 'OK', data: results })
        }
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}