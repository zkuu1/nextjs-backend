"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from './cell-action';
import Image from "next/image";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
  id: string
  name: string
  imageUrl: string
  bannerLabel: string
  createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "banner",
    header: "Banner",
    cell: ({row}) => row.original.bannerLabel,
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
    cell: ({row}) => <CellAction data={row.original} />
  }
]