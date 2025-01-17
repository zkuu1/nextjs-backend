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

  const settingsLink = {
    href: `/${params.storeId}/settings`,
    label: `Settings`,
    active: false, 
  };

  const bannerLink = {
    href: `/${params.storeId}/banners`,
    label: `Manage Catering`,
    active: false, 
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto px-4">
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-orange-500 text-white py-4 px-6">
            <CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-white">
            <div className="text-gray-800 text-lg mb-4">
              <p>
                <span className="font-semibold">Kamu Berada di Catering Yaitu:</span> {" "}
                <span className="text-orange-600 font-medium">
                  {store?.name || "No Store Found"}
                </span>
              </p>
            </div>
            <div className="flex justify-end gap-4">
              <Link href={settingsLink.href} legacyBehavior>
                <a
                  className={`px-4 py-2 rounded-md ${settingsLink.active ? "bg-orange-600 text-white" : "bg-gray-300 text-gray-700"}`}
                >
                  {settingsLink.label}
                </a>
              </Link>
              <Link href={bannerLink.href} legacyBehavior>
                <a
                  className={`px-4 py-2 rounded-md ${bannerLink.active ? "bg-orange-600 text-white" : "bg-orange-500 text-white"}`}
                >
                  {bannerLink.label}
                </a>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
