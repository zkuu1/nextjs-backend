import db from "@/lib/db";
import { BannerForm } from "./components/banner-form";

const BannerPage =  async ({
    params
} : {
    params: {bannerId: string}
}) => {

    // db
    const banner = await db.banner.findUnique({
        where: {
            id: params.bannerId
        }
    })

    return(
        <div className="flex-col">
           <div>
            <BannerForm initialData={banner}/>
           </div>
        </div>
    );
    
}

export default BannerPage;