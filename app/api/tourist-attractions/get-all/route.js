import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function POST() {
    try {
        const data = await prisma.TouristAttractions.findMany()
        return NextResponse.json({ status: 200, message: 'OK', data: data })
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}