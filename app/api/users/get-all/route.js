import prisma from "@/libs/prisma"
import { NextResponse } from "next/server"

export async function POST() {
    try {
        const users = await prisma.users.findMany()

        return NextResponse.json({ status: 200, message: 'OK', data: users })
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}