"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "./data-table-column-header"
import { IUseShelterDataSupply } from "@/hooks/useShelter/types"
import { PriorityCell } from "./priority-cell"
// import { DataTableRowActions } from "./data-table-row-actions"
import { QuantityCell } from "./quantity-cell"
import { DataTableRowAction } from "./data-table-row-actions"
// import { Checkbox } from "@/components/ui/checkbox"


export const columns: ColumnDef<IUseShelterDataSupply>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]
  //        data-[state=checked]:bg-blue-500
  //       "
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]
  //       data-[state=checked]:bg-blue-500
  //       "
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorFn: (row) => row.supply.name,
    id: "supplyName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => (
      <div className="flex-col md:flex-row md:space-x-2">
        <p className="max-[100px] md:max-w-[500px] md:truncate font-medium">
          {row.original.supply.name}
        </p>
        <span 
        className="md:hidden text-[10px] md:text-xs"
        >
          {row.original.supply.supplyCategory.name}
          </span>
      </div>
    ),
    filterFn: (row, id, value) => {
      const searchValue = value.toLowerCase();
      const rowValue = (row.getValue(id) as string).toLowerCase();
      return rowValue.includes(searchValue);
    },
  },
  {
    accessorFn: (row) => row.supply.supplyCategory.name,
    id: "supplyCategoryName",
    header: ({ column }) => (
      <DataTableColumnHeader className="hidden md:block" column={column} title="Categoria" />
    ),
    cell: ({ row }) => (
      <div className="hidden md:flex flex-col md:flex-row md:space-x-2">
        <Badge variant="outline"
          className="text-xs"
        >
          {row.original.supply.supplyCategory.name}
        </Badge>
      </div>
    ),
    filterFn: (row, id, value) => {
      // const searchValue = value
      // const rowValue = (row.getValue(id) as string)
      // return rowValue.includes(searchValue);
      return value.includes(row.getValue(id))
    },
    enableGrouping: true,
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prioridade" />
    ),
    cell: PriorityCell,
    // cell: ({ getValue, row, column, table }) => {
    //   const priority: number = row.getValue("priority")
    //   return <PriorityCell priority={priority} />
    // },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantidade" />
    ),
    cell: QuantityCell,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: DataTableRowAction
    // cell: ({ row  }) => <DataTableRowActions row={row} />,
  },
]
