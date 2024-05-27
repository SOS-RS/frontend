"use client"
import { Button } from "@/components/ui/button"
// import { Row } from "@tanstack/react-table"
import { Undo } from "lucide-react"

// interface DataTableRowActionsProps<TData> {
//   row: Row<TData>
// }

// export function DataTableRowActions<TData>({
//   row,
// }: DataTableRowActionsProps<TData>) {

  export function DataTableRowAction(
    { 
      // getValue, column,
      row, table }: any) {

  // const id = row.index
  // const priority = getValue("priority") as number
  // const quantity = getValue("quantity") as number

  const supplyId = row.original.supply.id as string



  // error: quando faço isso, dentro das cells priority e quantity
  // the newValue not return to the initial value
  function handleResetToInitialValues(
    { supplyId }: { supplyId: string }
    ) {

  console.log('handleResetToInitialValues supplyId', supplyId)


    table.options.meta?.removeUpdateData(supplyId)
  }

  return (
    <div>
      <div className="hidden md:flex w-auto items-center justify-between">
        <Button
          variant={'ghost'}
          className=""
          onClick={() => handleResetToInitialValues({
            supplyId
          })}
        >
          <Undo className="h-4 w-4" />

        </Button>
      </div>
    </div>
  )
}