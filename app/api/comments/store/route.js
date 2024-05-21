import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json()
        const { taid, name, contact, desc } = body
        await prisma.comments.create({
            data: {
                taid: taid,
                name: name,
                contact: contact,
                description: desc
            }
        })

        return NextResponse.json({ status: 200, message: 'Berhasil menambahkan komentar!' })
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}