import db from "@/lib/db";
import { BannerClient } from "./components/client";
import { BannerColumn } from "./components/columns";

import { format } from 'date-fns';


const BannersPage = async ({
  params
} : {
  params: {storeId: string}
}) => {

  const banners = await db.banner.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
       createdAt: 'desc'
    }
     
  })

  const formattedBanners : BannerColumn[] = banners.map((item) =>({
    id: item.id,
    label: item.label,
    description: item.description,
    imageUrl: item.imageUrl,
    createdAt: format(new Date(item.createdAt), 'MMM/ do / yyyy')
  }))

  return (
    <div className="flex flex-col space-y-4 p-8">
      {/* Header Section */}
      <div className="flex-1">
        <BannerClient data={formattedBanners} />
      </div>
    </div>
  );
};

export default BannersPage;
