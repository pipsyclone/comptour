import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function PUT(request) {
    try {
        const body = await request.json()
        const { id, taid, name_image, image_culture } = body

        await prisma.cultures.update({
            where: { id: parseInt(id) },
            data: {
                taid: taid,
                name_image: name_image,
                image: 'https://drive.google.com/thumbnail?sz=w1000&id=' + image_culture
            }
        })
        return NextResponse.json({ status: 200, message: 'Berhasil memperbarui gambar budaya!' })
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}