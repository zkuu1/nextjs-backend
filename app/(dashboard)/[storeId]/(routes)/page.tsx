import db from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-6 px-4 sm:px-8">
      <div className="w-full max-w-6xl mx-auto">
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-orange-500 text-white py-6 px-6 sm:px-8">
            <CardTitle className="text-2xl sm:text-3xl font-bold">Dashboard Admin</CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 bg-white">
            <div className="text-gray-800 text-base sm:text-lg mb-6">
              <p>
                <span className="font-semibold">Kamu Berada Di Catering: </span>{" "}
                <span className="text-orange-600 font-medium">
                  {store?.name || "No Store Found"}
                </span>
              </p>
            </div>
            {/* Grid 2x2 pada Mobile */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {/* Banner */}
              <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md">
                <h4 className="text-lg sm:text-xl font-bold text-gray-700">Banner</h4>
              
                <Link href={`/${params.storeId}/banners`} passHref>
                  <Button className="mt-4 w-full bg-orange-500 text-white">Kelola Banner</Button>
                </Link>
              </div>
              {/* Categories */}
              <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md">
                <h4 className="text-lg sm:text-xl font-bold text-gray-700">Categories</h4>
               
                <Link href={`/${params.storeId}/categories`} passHref>
                  <Button className="mt-4 w-full bg-orange-500 text-white">Kelola Kategori</Button>
                </Link>
              </div>
              {/* Menu */}
              <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md">
                <h4 className="text-lg sm:text-xl font-bold text-gray-700">Menu</h4>
                
                <Link href={`/${params.storeId}/products`} passHref>
                  <Button className="mt-4 w-full bg-orange-500 text-white">Kelola Menu</Button>
                </Link>
              </div>
              {/* Public API */}
              <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md">
                <h4 className="text-lg sm:text-xl font-bold text-gray-700">Public API</h4>
                
                <Link href={`/${params.storeId}/settings`} passHref>
                  <Button className="mt-4 w-full bg-orange-500 text-white">Pengaturan API</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  
};

export default DashboardPage;
