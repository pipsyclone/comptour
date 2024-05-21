import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const query = request.nextUrl.searchParams.get('query')

        const result = await prisma.blogs.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                ]
            }
        })

        return NextResponse.json({ status: 200, message: 'OK', data: result })
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}