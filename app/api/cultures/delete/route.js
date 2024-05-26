import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get('id')

        await prisma.cultures.delete({
            where: { id: parseInt(id) }
        })

        return NextResponse.json({ status: 200, message: 'Berhasil menghapus gambar budaya!' })
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}