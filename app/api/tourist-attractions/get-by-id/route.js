import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json()
        const data = await prisma.TouristAttractions.findUnique({
            where: { taid: body.taid }
        })

        if (data === null) {
            return NextResponse.json({ status: 404, message: 'Tempat wisata tidak ditemukan!' })
        }

        return NextResponse.json({ status: 200, message: 'OK', data: data })
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}