import prisma from "@/libs/prisma"
import md5 from "md5"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const body = await request.json()
        const { name, email, password, role } = body

        const userExists = await prisma.users.findUnique({
            where: { email: body.email }
        })

        if (userExists) {
            return NextResponse.json({ status: 400, message: 'Email sudah digunakan!' })
        } else {
            await prisma.users.create({
                data: {
                    id: md5(name + email + password + role),
                    name: name,
                    email: email,
                    password: md5(password),
                    role: role
                }
            })

            return NextResponse.json({ status: 200, message: 'Berhasil menambahkan pengguna!' })
        }

    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}