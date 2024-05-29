"use client"

import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { Archive, Search, X } from "lucide-react"
import { priorities } from "./data"
import { useSupplyCategories } from "@/hooks"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const { data: supplyCategories, loading } = useSupplyCategories();

  const categories = supplyCategories && supplyCategories.map(category => { 
    return {
      label: category.name,
      value: category.name,
      icon: Archive
    }
  });

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
              className="h-8 w-full pr-10 pl-10" // Add padding to the right to avoid text overlapping with the button
            />
               <Search className="h-4 w-4 left-2 absolute top-1/2 transform -translate-y-1/2 stroke-gray-400" />
            {isFiltered && (
              <Button
                variant={'ghost'}
                onClick={() => table.resetColumnFilters()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-2 "
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="w-full flex gap-2">
            {table.getColumn("priority") && (
              <DataTableFacetedFilter
                column={table.getColumn("priority")}
                title="Prioridade"
                options={priorities}
              />
            )}
            {categories && !loading &&
              table.getColumn("supplyCategoryName") && (
                <DataTableFacetedFilter
                  column={table.getColumn("supplyCategoryName")}
                  title="Categoria"
                  options={categories}
                />
              )}
          </div>
        </div>
      </div>
    </div>
  )
}