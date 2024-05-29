import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

export const QuantityCell = ({ getValue, row, column, table }: any) => {
  const supplyId = row.original.supply.id as string
  const initialQuantity = getValue()
  const [newQuantity, setNewQuantity] = useState<number>(initialQuantity)

  const { newData } = table.options.meta
  const rowIsModified = newData && newData.some((item: any) => item.supply.id === supplyId);

  // is necessaary?
  useEffect(() => {
    setNewQuantity(initialQuantity)
  }, [initialQuantity])

  useEffect(() => {
    if (!rowIsModified) {  
      setNewQuantity(initialQuantity)
    }
  }, [rowIsModified, initialQuantity])


  function handleUpdateQuantity(newQuantityToUpdate: number) {
    setNewQuantity(newQuantityToUpdate)

    if (initialQuantity === null && newQuantityToUpdate === 0) {
      table.options.meta?.updateRowData(supplyId, null, column.id)
    }

    table.options.meta?.updateRowData(supplyId, newQuantityToUpdate, column.id)
  }

  return (
    <div className="flex items-center gap-4 max-w-[120px]">
      <Input
        className="w-full"
        type="number"
        placeholder={initialQuantity ? initialQuantity : '0'}
        // defaultValue={initialQuantity ? initialQuantity : ''}
        onChange={(e) => handleUpdateQuantity(Number(e.target.value))}
        value={newQuantity ? newQuantity : ''}
      />

      {/* <div className="max-w-[20px]">
        <p className={initialQuantity !== newQuantity ? 'visible text-gray-400' : 'collapse'}>
          Anterior:
          <span className="text-red-500">
            {' '}{initialQuantity ? initialQuantity : '0'}
          </span>
        </p>
      </div> */}
    </div>
  )
}