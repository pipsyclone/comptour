import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const data = await prisma.cultures.findMany()
        return NextResponse.json({ status: 200, message: 'OK', data: data })
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}