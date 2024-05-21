import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function PUT(request) {
    try {
        const body = await request.json()
        const { taid, nameplace, image, desc, longtitude, latitude } = body

        await prisma.TouristAttractions.update({
            where: { taid: taid },
            data: {
                name_place: nameplace,
                image: image,
                description: desc,
                longtitude: longtitude,
                latitude: latitude
            }
        })

        return NextResponse.json({ status: 200, message: 'Berhasil memperbarui data!' })
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}