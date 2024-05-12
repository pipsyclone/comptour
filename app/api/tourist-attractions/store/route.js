import prisma from "@/libs/prisma"
import md5 from "md5"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const body = await request.json()
        const { userid, nameplace, image, longtitude, latitude, desc } = body

        const nameExists = await prisma.TouristAttractions.findUnique({
            where: { taid: md5(nameplace) }
        })

        if (nameExists) {
            return NextResponse.json({ status: 400, message: 'Tempat wisata yang anda masukkan sudah tersedia!' })
        } else {
            await prisma.TouristAttractions.create({
                data: {
                    taid: md5(nameplace),
                    userid: userid,
                    name_place: nameplace,
                    image: image,
                    description: desc,
                    longtitude: longtitude,
                    latitude: latitude
                }
            })

            return NextResponse.json({ status: 200, message: 'Berhasil menambahkan tempat wisata!' })
        }
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}