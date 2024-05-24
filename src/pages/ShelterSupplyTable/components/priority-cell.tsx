import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn, getSupplyPriorityProps, priorityOptions,
  //  separateClasses 
  } from "@/lib/utils"
import { SupplyPriority } from "@/service/supply/types"
import { useEffect, useState } from "react"

export const PriorityCell = ({ getValue, row, column, table }: any) => {

  const initialPriority = getValue()
  const [selectedPriority, setSelectedPriority] = useState<number>(initialPriority)

  useEffect(() => {
    setSelectedPriority(initialPriority)
  }, [initialPriority])

  function handleUpdatePriority(newPriority: number) {
    setSelectedPriority(newPriority)
    table.options.meta?.updateData(row.index, column.id, newPriority)
  }

  return (
    <div className="flex items-center">
      <ToggleGroup
        type="single"
        value={getSupplyPriorityProps(selectedPriority).label}
        onValueChange={(value) => {
          const priorityValue = Object.entries(SupplyPriority).find(([, val]) => priorityOptions[val as SupplyPriority] === value)
          if (priorityValue) {
            handleUpdatePriority(Number(priorityValue[1]))
          }
        }}
      >
        {Object.values(SupplyPriority).filter(value => typeof value === 'number').map((value) => {
          const { label: labelItem, initials: initialsItem,
            // className: circleClassNameItem 
          } = getSupplyPriorityProps(value as SupplyPriority)
          const isEqual = selectedPriority === value
          // const result = separateClasses(circleClassNameItem);
          const selectedItemClassName = `data-[state=on]:bg-blue-500 data-[state=on]:text-white`
          
          // do not working
          // const selectedItemClassName = `data-[state=on]:${result.bgClass}`

          return (
            <ToggleGroupItem
              key={value}
              value={labelItem}
              defaultChecked={value === selectedPriority }
              aria-label={labelItem}
              variant={'outline'}
              
              className={cn(
                initialPriority === value && !isEqual ? 'border-blue-400 border-2' : '',
                isEqual ? selectedItemClassName : '',
              )}
            >
              {initialsItem}
            </ToggleGroupItem>
          )
        })}
      </ToggleGroup>
    </div>
  )
}