import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function PUT(request) {
    try {
        const body = await request.json()
        const { taid, nameplace, image, province, regency, district, longtitude, latitude, desc } = body

        if (image === "" || province === "") {
            await prisma.TouristAttractions.update({
                where: { taid: taid },
                data: {
                    name_place: nameplace,
                    description: desc,
                    longtitude: longtitude,
                    latitude: latitude
                }
            })
        } else {
            await prisma.TouristAttractions.update({
                where: { taid: taid },
                data: {
                    name_place: nameplace,
                    image: 'https://drive.google.com/thumbnail?sz=w1000&id=' + image,
                    province: province,
                    regency: regency,
                    district: district,
                    longtitude: longtitude,
                    latitude: latitude,
                    description: desc,
                }
            })
        }

        return NextResponse.json({ status: 200, message: 'Berhasil memperbarui data!' })
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}