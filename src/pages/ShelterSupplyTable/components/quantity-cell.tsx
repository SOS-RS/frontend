import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

export const QuantityCell = ({ getValue, row, column, table }: any) => {

  const initialQuantity = getValue()
  const [newQuantity, setNewQuantity] = useState<number>(initialQuantity)

  useEffect(() => {
    setNewQuantity(initialQuantity)
  }, [initialQuantity])

  function handleUpdateQuantity(newPriorityToUpdate: number) {
    setNewQuantity(newPriorityToUpdate)
    table.options.meta?.updateData(row.index, column.id, newPriorityToUpdate)
  }

  return (
    <div className="flex items-center gap-4 w-full">
      <Input
        className="max-w-[100px]"
        type="number"
        placeholder={initialQuantity ? initialQuantity : '0'}
        // defaultValue={initialQuantity ? initialQuantity : ''}
        onChange={(e) => handleUpdateQuantity(Number(e.target.value))}
        value={newQuantity}
      />
      <p className={initialQuantity !== newQuantity ? 'visible' : 'collapse'}>
      Anterior:
      <span className="text-blue-500">
        {' '}{initialQuantity}
      </span>
      </p>
    </div>
  )
}