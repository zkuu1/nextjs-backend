'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {BannerColumn} from './column'
import { Button } from '@/components/ui/button'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import toast from 'react-hot-toast'

interface CellActionProps {
    data: BannerColumn
}

export const CellAction : React.FC<CellActionProps>= ({
    data
}) => {

    const onCopy = (id:string) => {
        navigator.clipboard.writeText(id);
        toast.success("Banner ID berhasil di copy");
    }


    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        <span className='sr-only'>Open Menu</span>
                        <MoreHorizontal className='h-4 w-4'/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Action</DropdownMenuLabel>
               

                <DropdownMenuItem onClick={() => onCopy(data.id)}>
                    <Copy className='mr-2 h-4 w-4'/>
                    Copy ID
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <Edit className='mr-2 h-4 w-4'/>
                    Update
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <Trash className='mr-2 h-4 w-4'/>
                    Delete
                </DropdownMenuItem>


                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
    
