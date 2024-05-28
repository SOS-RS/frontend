"use client"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast";
// import { Row } from "@tanstack/react-table"
import { Trash2, Undo } from "lucide-react"

// interface DataTableRowActionsProps<TData> {
//   row: Row<TData>
// }

// export function DataTableRowActions<TData>({
//   row,
// }: DataTableRowActionsProps<TData>) {

export function DataTableRowAction(
  {
    // getValue,
    // column,
    row,
    table
  }: any) {
  const { toast } = useToast();

  const supplyId = row.original.supply.id as string

  const { newData } = table.options.meta
  const rowIsModified = newData && newData.some((item: any) => item.supply.id === supplyId);

  function handleResetToInitialValues(
    { supplyId }: { supplyId: string }
  ) {
    table.options.meta?.removeRowUpdate(supplyId)
  }

  function handleDeleteSupply(supplyId: any) {
    toast({
      title: 'Suprimento excluído com sucesso',
    });
  }

  return (
    <div>
      <div className="hidden md:flex w-auto items-center">
        <Button
          variant={'ghost'}
          className={!rowIsModified ? 'collapse' : 'active'}
          disabled={!rowIsModified}
          onClick={() => handleResetToInitialValues({
            supplyId
          })}
          aria-label="Desfazer edições"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant={'ghost'}
          className=""
          onClick={() => handleDeleteSupply({
            supplyId
          })}
          aria-label="Excluir item"
        >
          <Trash2 className="h-5 w-5 stroke-red-600" />
        </Button>
      </div>
    </div>
  )
}