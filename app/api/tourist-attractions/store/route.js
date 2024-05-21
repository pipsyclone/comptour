import prisma from "@/libs/prisma"
import randomstring from "randomstring"
import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const body = await request.json()
    const { userid, nameplace, image, longtitude, latitude, desc } = body

    const checkNamePlace = await prisma.TouristAttractions.findMany({
      where: { name_place: nameplace }
    })

    if (checkNamePlace.length > 0) {
      return NextResponse.json({ status: 400, message: 'Tempat wisata yang anda masukkan sudah tersedia!' })
    } else {
      await prisma.TouristAttractions.create({
        data: {
          taid: 'TA' + randomstring.generate({ length: 13, charset: 'numeric' }),
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