import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, 
    {params} : {params: {storeId: string}}
) {
    try {
    
        const { userId } = await auth();  // Pastikan untuk menunggu promise auth()
        const body = await req.json();
        const { label, imageUrl, description} = body;
        
        // Memeriksa apakah userId ada
        if (!userId) {
            return new NextResponse("User not authenticated", { status: 401 });
        }

        if (!label) {
            return new NextResponse("Nama Banner Perlu Diinput" , {status: 400})
        }

        if (!description) {
            return new NextResponse("Deskripsi Perlu Diinput" , {status: 400})
        }

        if (!imageUrl) {
            return new NextResponse("Image Banner perlu Diinput" , {status: 400})
        }

       const banner = await db.banner.create({
        data: {
            label,
            description,
            imageUrl,
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



        return NextResponse.json(banner);

    } catch (error) {
        console.error("[BANNERS_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(req: Request, 
    {params} : {params: {storeId: string}}
) {
    try {
    
       const banner = await db.banner.findMany({
        where: {
            storeId: params.storeId
        },
       });


       if(!params.storeId) {
        return new NextResponse("Store ID URL Dibutuhkan");
       }



        return NextResponse.json(banner);

    } catch (error) {
        console.error("[BANNERS_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
