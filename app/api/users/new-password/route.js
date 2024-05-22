import prisma from "@/libs/prisma";
import md5 from "md5";
import { NextResponse } from "next/server";

export async function PUT(request) {
    try {
        const body = await request.json()
        const { userid, confirmPassword } = body

        await prisma.users.update({
            where: { id: userid },
            data: {
                password: md5(confirmPassword)
            }
        })
        return NextResponse.json({ status: 200, message: 'Berhasil menyimpan perubahan, silahkan masuk kembali dengan password baru!' })
    } catch (err) {
        return NextResponse.json({ status: 500, messag: err.message })
    }
}