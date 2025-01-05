"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export const BannerClient = () => {

    const router = useRouter();
    const params = useParams();

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <Heading
          title="Banner (0)"
          description="Atur Banner Untuk Tokomu"
        />
        <Button className="flex items-center gap-2"
        onClick={()=> router.push(`/${params.storeId}/banners/new`)}
        >
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      {/* Separator */}
      <Separator />
    </div>
  );
};
