"use client"
import { Button } from "@/components/ui/button"
import { Undo } from "lucide-react"

// interface DataTableRowActionsProps<TData> {
//   row: Row<TData>
// }

// export function DataTableRowActions<TData>({
//   row,
// }: DataTableRowActionsProps<TData>) {

  export function DataTableRowAction(
    { getValue, row, column, table }: any) {

  const id = row.index
  const priority = getValue("priority") as number
  const quantity = getValue("quantity") as number



  // error: quando faço isso, dentro das cells priority e quantity
  // the newValue not return to the initial value
  function handleResetToInitialValues(values: { id: number, priority: number, quantity: number }) {
    console.log({
      values
    })

    table.options.meta?.removeUpdateData(row.index, column.id, values)
  }

  return (
    <div>
      <div className="hidden md:flex w-auto items-center justify-between">
        <Button
          variant={'ghost'}
          className=""
          onClick={() => handleResetToInitialValues({
            id, priority, quantity
          })}
        >
          <Undo className="h-4 w-4" />

        </Button>
      </div>
    </div>
  )
}