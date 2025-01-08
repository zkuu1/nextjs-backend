import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
    
        const { userId } = await auth();  // Pastikan untuk menunggu promise auth()
        const body = await req.json();
        const { name } = body;
        
        // Memeriksa apakah userId ada
        if (!userId) {
            return new NextResponse("User not authenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Nama Toko Perlu Diinput" , {status: 400})
        }

       const store = await db.store.create({
        data: {
            name,
            userId,
        },
       });

       return NextResponse.json(store);

       

    } catch (error) {
        console.error("[STORES_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
