import db from "@/lib/db";

import { CategoryColumn} from "./components/columns";

import { format } from 'date-fns';
import { CategoryClient } from "./components/client";


const CategoryPage = async ({
  params
} : {
  params: {storeId: string}
}) => {

  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      banner: true,
    },
    orderBy: {
       createdAt: 'desc'
    }
     
  })

  const formattedCategories : CategoryColumn[] = categories.map((item) =>({
    id: item.id,
    name: item.name,
    imageUrl: item.banner.imageUrl,
    bannerLabel: item.banner.label,
     createdAt: format(new Date(item.createdAt), 'MMM/ do / yyyy')
  }))

  return (
    <div className="flex flex-col space-y-4 p-8">
      {/* Header Section */}
      <div className="flex-1">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoryPage;
