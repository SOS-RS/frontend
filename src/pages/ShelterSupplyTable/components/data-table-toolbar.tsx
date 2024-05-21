"use client"

import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { priorities, statuses } from "../data/data"
// import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { PlusCircle, X } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const navigate = useNavigate();
  const { shelterId } = useParams()

  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col-reverse items-start gap-y-2
          md:flex-row md:flex-1  md:justify-between md:items-center "
      >
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Filtrar itens..."
            value={(table.getColumn("supplyName")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("supplyName")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[200px] lg:w-[400px]"
          />
          {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Limpar
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>


        <Button
          variant="ghost"
          className="p-0 m-0 flex gap-2 text-blue-500 [&_svg]:stroke-blue-500 font-sm text-sm hover:text-blue-600"
          onClick={() =>
            navigate(`/abrigo/${shelterId}/item/cadastrar`)}
        >
          <PlusCircle />
          Cadastrar novo item
        </Button>
      </div>
    </div>
  )
}