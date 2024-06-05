import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json()
        const { userid, image, title, desc } = body

        const checkTitle = await prisma.blogs.findMany({
            where: { title: title }
        })

        if (checkTitle.length > 0) {
            return NextResponse.json({ status: 400, message: 'Judul blog sudah tersedia!' })
        } else {
            await prisma.blogs.create({
                data: {
                    userid: userid,
                    image: 'https://drive.google.com/thumbnail?sz=w1000&id=' + image,
                    title: title,
                    description: desc
                }
            })

            return NextResponse.json({ status: 200, message: 'Berhasil menambahkan blog!' })
        }
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}