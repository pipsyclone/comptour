import { NextResponse } from "next/server";

export async function DELETE(request) {
    try {
        const taid = request.nextUrl.searchParams.get('taid')
        await prisma.TouristAttractions.delete({
            where: { taid: taid }
        })
        return NextResponse.json({ status: 200, message: 'Berhasil menghapus data!' })
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}