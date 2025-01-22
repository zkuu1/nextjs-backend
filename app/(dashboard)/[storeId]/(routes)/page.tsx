import db from "@/lib/db";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface DashboardPageProps {
  params: { storeName: string }; // Menggunakan nama store
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const storeName = params.storeName;

  // Query untuk mendapatkan data store berdasarkan nama
  const store = await db.store.findFirst({
    where: {
      name: storeName, // Menggunakan nama store
    },
  });

  if (!store) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-2xl text-gray-600">Store not found</p>
      </div>
    );
  }

  // Query untuk menghitung jumlah data terkait store
  const [totalBanners, totalCategories, totalMenus] = await Promise.all([
    db.banner.count({
      where: { storeId: store.id }, // Gunakan ID store dari hasil query sebelumnya
    }),
    db.category.count({
      where: { storeId: store.id },
    }),
    db.product.count({
      where: { storeId: store.id },
    }),
  ]);



  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10">
      <div className="w-full max-w-6xl mx-auto px-4">
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-orange-500 text-white py-6 px-8">
            <CardTitle className="text-3xl font-bold">Dashboard Admin</CardTitle>
          </CardHeader>
          <CardContent className="p-8 bg-white">
            <div className="text-gray-800 text-lg mb-6">
              <p>
                <span className="font-semibold">Kamu Berada Di Catering: </span>{" "}
                <span className="text-orange-600 font-medium">
                  {store.name || "No Store Found"}
                </span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Statistik */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-bold text-gray-700">Total Banner</h4>
                <p className="text-2xl font-semibold text-orange-500">
                  {totalBanners}
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-bold text-gray-700">Total Categories</h4>
                <p className="text-2xl font-semibold text-orange-500">
                  {totalCategories}
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-bold text-gray-700">Total Menu</h4>
                <p className="text-2xl font-semibold text-orange-500">
                  {totalMenus}
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-bold text-gray-700">Total All</h4>
                <p className="text-2xl font-semibold text-orange-500">
                  {totalBanners + totalCategories + totalMenus}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
