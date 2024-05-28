"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { PlusCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData extends { supply: { id: string } }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const navigate = useNavigate();
  const { shelterId } = useParams()
  const { toast } = useToast();

  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [updatedRows, setUpdatedRows] = React.useState<TData[]>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    meta: {
      newData: updatedRows,  
      updateRowData: (supplyId: string, value: string, columnId: string ) => {
        setUpdatedRows((old) => {

          const existingIndex = old.findIndex(item => item.supply.id === supplyId);
          const originalData = data.find(item => item.supply.id === supplyId);

          if (!originalData) return old;

          let updatedData: TData[];

          if (existingIndex > -1) {
            updatedData = old.map((item, index) =>
              index === existingIndex ? { ...item, [columnId]: value } : item
            );
          } else {
            updatedData = [...old, { ...originalData, [columnId]: value }];
          }

          // Remove the update if it matches the original data
          if (JSON.stringify(updatedData[existingIndex]) === JSON.stringify(originalData)) {
            return updatedData.filter(item => item.supply.id !== supplyId);
          }

          return updatedData;
        });
      },
      removeRowUpdate: (supplyId: string) => {
        setUpdatedRows((old) => old.filter((updateItem) => updateItem.supply.id !== supplyId));
      },
    },
  })

  function handleUpdateShelterSupplies(shelterId: string, supplies: any[]) {
    toast({
      title: 'Suprimentos atualizados com sucesso',
    });
  }


  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end border-b-2">
      <Button
          variant="ghost"
          className="p-0 m-0 flex gap-2 text-red-500 [&_svg]:stroke-red-500 font-sm text-sm hover:text-red-600"
          onClick={() =>
            navigate(`/abrigo/${shelterId}/item/cadastrar`)}
        >
          Cadastrar novo item
          <PlusCircle />
        </Button>
      </div>

      <DataTableToolbar table={table} />
      <div className="rounded-md border">
      {/* <div className="fixed bottom-0 w-full left-0 bg-gray-200 p-4 z-50">
        <code>{JSON.stringify(updatedRows, null, 2)}</code>
      </div> */}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
      
      <div
        className="flex items-center justify-end"
      >
        <Button
          variant={'ghost'}
          className="text-red-600 hover:text-red-700"
          onClick={() => {
            ''
          }}
        >
          Cancelar
        </Button>
        <Button
          className="bg-red-600 hover:bg-red-700 p-5"
          disabled={updatedRows.length === 0}
          onClick={() => handleUpdateShelterSupplies(shelterId!, updatedRows)}
        >
          Salvar
        </Button>
      </div>

    </div>
  )
}