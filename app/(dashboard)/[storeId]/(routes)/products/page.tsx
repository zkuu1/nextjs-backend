import db from "@/lib/db";
import { ProductClient } from "./components/client";
import {  ProductColumn } from "./components/columns";

import { format } from 'date-fns';
import { formatter } from "@/lib/utils";


const ProductPage = async ({
  params
} : {
  params: {storeId: string}
}) => {

  const products = await db.product.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      category: true,
      images: true, // Ambil relasi images
    },
  });
  

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    imageUrl: item.images.length > 0 ? item.images[0].url : "/images/default.jpg", // Ambil gambar pertama jika ada
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    createdAt: format(new Date(item.createdAt), "MMM do, yyyy"),
  }));
  

  return (
    <div className="flex flex-col space-y-4 p-8">
      {/* Header Section */}
      <div className="flex-1">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductPage;
