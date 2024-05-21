import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    try {
        const blogid = request.nextUrl.searchParams.get('blogid')
        await prisma.blogs.delete({
            where: { blogid: parseInt(blogid) }
        })

        return NextResponse.json({ status: 200, message: 'Berhasil menghapus blog!' })
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}