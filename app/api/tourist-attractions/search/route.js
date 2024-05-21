import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const query = request.nextUrl.searchParams.get('query')
        const result = await prisma.TouristAttractions.findMany({
            where: {
                OR: [
                    { name_place: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } }
                ]
            }
        })

        if (result.length < 1) {
            return NextResponse.json({ status: 401, message: 'Data tidak ditemukan!' })
        } else {
            return NextResponse.json({ status: 200, message: 'OK', data: result })
        }
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}