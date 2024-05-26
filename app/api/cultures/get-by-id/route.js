import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const id = request.nextUrl.searchParams.get('id')
        const data = await prisma.cultures.findUnique({
            where: { id: parseInt(id) }
        })

        if (data === null) {
            return NextResponse.json({ status: 404, message: 'ID tidak valid!' })
        }

        return NextResponse.json({ status: 200, message: 'OK', data: data })
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}