import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function PUT(request) {
    try {
        const body = await request.json()
        const { userid, name, email } = body

        const checkEmail = await prisma.users.findUnique({
            where: { email: email }
        })

        if (email === "") {
            await prisma.users.update({
                where: { id: userid },
                data: {
                    name: name
                }
            })
            return NextResponse.json({ status: 200, message: 'Berhasil memperbarui profile, silahkan masuk kembali untuk melihat perubahan!' })
        } else if (checkEmail) {
            return NextResponse.json({ status: 400, message: 'Email sudah digunakan, silahkan coba yang lain!' })
        } else {
            await prisma.users.update({
                where: { id: userid },
                data: {
                    name: name,
                    email: email
                }
            })

            return NextResponse.json({ status: 200, message: 'Berhasil memperbarui profile, silahkan masuk kembali untuk melihat perubahan!' })
        }
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}