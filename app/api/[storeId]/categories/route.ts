import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, 
    {params} : {params: {storeId: string}}
) {
    try {
    
        const { userId } = await auth();  // Pastikan untuk menunggu promise auth()
        const body = await req.json();
        const { name, bannerId} = body;
        
        if (!name) {
            return new NextResponse("Nama Category perlu diinput", { status: 400 });
        }

        if (!bannerId) {
            return new NextResponse("Banner ID perlu diinput", { status: 400 });
        }

        // Memeriksa apakah userId ada
        if (!userId) {
            return new NextResponse("User not authenticated", { status: 401 });
        }


       const category = await db.category.create({
        data: {
            name,
            bannerId,
            storeId: params.storeId
        },
       });

       const storeByUserId = await db.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
       })

       if(!storeByUserId) {
        return new NextResponse("Unauthorized", {status: 403}) 
    }

       if(!params.storeId) {
        return new NextResponse("Store ID URL Dibutuhkan");
       }



        return NextResponse.json(category);

    } catch (error) {
        console.error("[CATEGORIES_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(req: Request, 
    {params} : {params: {storeId: string}}
) {
    try {
    
       const categories = await db.category.findMany({
        where: {
            storeId: params.storeId
        },
       });


       if(!params.storeId) {
        return new NextResponse("Store ID URL Dibutuhkan");
       }



        return NextResponse.json(categories);

    } catch (error) {
        console.error("[CATEGORIES_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
