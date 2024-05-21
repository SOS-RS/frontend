"use client"

import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {

  return (
    <div>
      <div className="hidden md:flex w-auto items-center  justify-between">
        <Button
          variant={'link'}
          className="px-3 py-2"
          onClick={() => {
            console.log('row clicked', row);
          }}
        >
          <Save className="w-5 h-5 stroke-primary/80 hover:stroke-blue-500" />
        </Button>
      </div>
    </div>
  )
}