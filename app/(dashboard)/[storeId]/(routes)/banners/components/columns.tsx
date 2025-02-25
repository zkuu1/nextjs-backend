import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { CellAction } from "./cell-action";

export type BannerColumn = {
  id: string;
  label: string;
  description: string;
  imageUrl: string;
  createdAt: string;
};

export const columns: ColumnDef<BannerColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "description",
    header: "Desc",
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <div className="w-20 h-20 relative">
        <Image
          src={row.original.imageUrl}
          alt="Banner Image"
          layout="fill"
          objectFit="cover"
          className="rounded-md border"
        />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
