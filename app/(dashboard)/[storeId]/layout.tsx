import Navbar from "@/components/navbar";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export default async function DashboardLayout({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: { storeId: string };
  }) {
    try {
      const { userId } = await auth();
      console.log("User ID from DashboardLayout:", userId);
  
      if (!userId) {
        console.log("Redirecting to /sign-in");
        redirect("/sign-in");
      }
  
      const store = await db.store.findFirst({
        where: {
          id: params.storeId,
          userId,
        },
      });
  
      console.log("Store from database:", store);
  
      if (!store) {
        console.log("Redirecting to /");
        redirect("/");
      }
  
      return (
        <>
          <Navbar />
          {children}
        </>
      );
    } catch (error) {
      console.error("[DASHBOARD_LAYOUT_ERROR]", error);
      redirect("/");
    }
  }
  
