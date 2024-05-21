import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const blogid = request.nextUrl.searchParams.get('blogid')

        const data = await prisma.blogs.findUnique({
            where: { blogid: parseInt(blogid) }
        })

        return NextResponse.json({ status: 200, message: 'OK', data: data })
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}