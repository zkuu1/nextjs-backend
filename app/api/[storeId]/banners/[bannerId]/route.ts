import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


// =========== GET BANNER API =============
export async function GET(
    req: Request,
    {params}: {params: {bannerId: string}}
) {
    try {
        if (!params.bannerId) {
            return new NextResponse("Banner id dibutuhhkan", {status:400})
        }

        const banner = await db.store.findUnique({
            where: {
                id: params.bannerId,
            }
        })

        return NextResponse.json(banner);
        
    } catch (error) {
        console.log('[BANNERS_GET]', error)
        return new NextResponse("Internal Error", {status: 500})
    }
}


// ========== UBAH DATA =================
export async function PATCH(
    req: Request,
    {params}: {params: {storeId: string, bannerId: string}}
) {
    try {

        const {userId} = await auth()
        const body = await req.json();

        const {label, imageUrl} = body;

        if(!userId) {
            return new NextResponse("Tidak Terauntentikasi", {status:401})
            
        }

        if (!label) {
            return new NextResponse("Harus menginput Label", {status:400})
        }

        if (!imageUrl) {
            return new NextResponse("Harus menginput ImageUrl", {status:400})
        }

        if (!params.storeId) {
            return new NextResponse("Store id dibutuhhkan", {status:400})
        }


        // ========= CEK AGAR TIDAK TERKENA INJEKSI IMAGE ==========
        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
           })
    
           if(!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 403}) 
        }

        const banner = await db.banner.updateMany({
            where: {
                id: params.bannerId,
            },
            data: {
                label,
                imageUrl
            }
        })

        return NextResponse.json(banner);
        
    } catch (error) {
        console.log('BANNER_PACTH]', error)
        return new NextResponse("Internal Error", {status: 500})
    }
}

// =========== HAPUS / DELETE DATA =============
export async function DELETE(
    req: Request,
    {params}: {params: {storeId: string, bannerId: string}}
) {
    try {

        const {userId} = await auth()
       

        if(!userId) {
            return new NextResponse("Tidak Terauntentikasi", {status:401})
            
        }

        if (!params.bannerId) {
            return new NextResponse("Banner id dibutuhhkan", {status:400})
        }

         // ========= CEK AGAR TIDAK TERKENA INJEKSI IMAGE ==========
         const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
           })
    
           if(!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 403}) 
        }

        const banner = await db.store.deleteMany({
            where: {
                id: params.bannerId
            }
        })

        

        return NextResponse.json(banner);
        
    } catch (error) {
        console.log('[BANNERS_DELETE]', error)
        return new NextResponse("Internal Error", {status: 500})
    }
}


