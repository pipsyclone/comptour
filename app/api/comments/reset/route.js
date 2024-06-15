import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function DELETE() {
    try {
        await prisma.comments.deleteMany()

        return NextResponse.json({ status: 200, message: 'Berhasil menghapus semua data!' })
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}