import db from "@/lib/db";

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
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center w-3/4 max-w-md text-orange-700">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg">
          <span className="font-semibold">Kamu Berada Di Catering Yaitu</span>{" "}
          {store?.name || "No Store Found"}
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
