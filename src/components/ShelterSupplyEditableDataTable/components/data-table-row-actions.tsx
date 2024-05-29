"use client"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
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
    // TODO: change any 
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleDeleteSupply({supplyId}: { supplyId: string }) {

    // TODO: add delete shelter supply endpoint here

    toast({
      title: 'Suprimento excluído com sucesso',
    });
  }

  return (
    <div className="ml-6 sm:max-w-[100px]">
      <div className="md:flex items-center gap-4">
        <Button
          variant={'link'}
          className={cn("p-0 m-0", !rowIsModified ? 'collapse' : 'active')}
          disabled={!rowIsModified}
          onClick={() => handleResetToInitialValues({
            supplyId
          })}
          aria-label="Desfazer edições"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant={'link'}
          className="p-0 m-0"
          onClick={() => handleDeleteSupply({
            supplyId
          })}
          aria-label="Excluir item"
        >
          <Trash2 className="h-4 w-4 stroke-red-600" />
        </Button>
      </div>
    </div>
  )
}