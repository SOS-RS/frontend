"use client"

import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { priorities } from "./data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { X } from "lucide-react"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col-reverse items-start gap-y-2
          md:flex-row md:flex-1  md:justify-between md:items-center"
      >
        <div className="flex flex-col w-full gap-y-4">
          <div className="w-full flex flex-1 items-center space-x-2 relative">
            <Input
              placeholder="Filtrar itens..."
              value={(table.getColumn("supplyName")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("supplyName")?.setFilterValue(event.target.value)}
              className="h-8 w-full pr-10" // Add padding to the right to avoid text overlapping with the button
            />
            {isFiltered && (
              <Button
                variant={'ghost'}
                onClick={() => table.resetColumnFilters()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-2"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="w-full">
            {table.getColumn("priority") && (
              <DataTableFacetedFilter
                column={table.getColumn("priority")}
                title="Prioridade"
                options={priorities}
              />
            )}
          </div>

        </div>
      </div>
    </div>
  )
}