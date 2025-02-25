"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from './cell-action';
import Image from "next/image";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string
  name: string
  description: string
  imageUrl: string
  price: string
  category: string
  isFeatured: boolean
  isArchived: boolean
  createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "description",
    header: "Description",
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
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },

  {
    accessorKey: "price",
    header: "Price",
  },

  {
    accessorKey: "category",
    header: "Category",
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