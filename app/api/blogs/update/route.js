import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function PUT(request) {
    try {
        const body = await request.json()
        const { blogid, image, title, desc } = body

        const checkId = await prisma.blogs.findMany({
            where: { blogid: blogid }
        })

        if (checkId.length < 1) {
            return NextResponse.json({ status: 404, message: 'Blog tidak ditemukan!' })
        } else {
            if (image === "") {
                await prisma.blogs.update({
                    where: { blogid: parseInt(blogid) },
                    data: {
                        title: title,
                        description: desc
                    }
                })
            } else {
                await prisma.blogs.update({
                    where: { blogid: parseInt(blogid) },
                    data: {
                        image: 'https://drive.google.com/thumbnail?sz=w1000&id=' + image,
                        title: title,
                        description: desc
                    }
                })
            }

            return NextResponse.json({ status: 200, message: 'Berhasil memperbarui data!' })
        }

    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}