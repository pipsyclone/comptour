import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json()

        const result = await prisma.blogs.findMany({
            where: {
                OR: [
                    { title: { contains: body.query, mode: 'insensitive' } },
                    { description: { contains: body.query, mode: 'insensitive' } },
                ]
            }
        })

        return NextResponse.json({ status: 200, message: 'OK', data: result })
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}