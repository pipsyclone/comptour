import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const touristattractions = await prisma.TouristAttractions.findMany({
            include: {
                Comment: true
            }
        })

        const recommendations = touristattractions.map(attraction => ({
            name_place: attraction.name_place,
            description: attraction.description,
            commentCount: attraction.Comment.length,
        }));

        // Sort recommendations by the number of comments, descending
        recommendations.sort((a, b) => b.commentCount - a.commentCount);

        return NextResponse.json({
            status: 200, message: 'OK', recommendations
        })
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}