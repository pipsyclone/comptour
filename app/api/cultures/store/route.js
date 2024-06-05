import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json()
        const { taid, name_image, image_culture } = body

        const checkImageCulture = await prisma.cultures.findMany({
            where: { image: image_culture }
        })

        if (checkImageCulture.length > 0) {
            return NextResponse.json({ status: 400, message: 'URL gambar yang anda masukkan sudah tersedia!' })
        }

        await prisma.cultures.create({
            data: {
                taid: taid,
                name_image: name_image,
                image: 'https://drive.google.com/thumbnail?sz=w1000&id=' + image_culture
            }
        })
        return NextResponse.json({ status: 200, message: 'Berhasil menambahkan gambar budaya!' })
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}