import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { getSupplyPriorityProps, priorityOptions } from "@/lib/utils"
import { SupplyPriority } from "@/service/supply/types"
import { useState } from "react"

export const PriorityCell: React.FC<{ priority: number }> = ({ priority }) => {
  const [selectedPriority, setSelectedPriority] = useState<number>(priority)
  return (
    <div className="flex items-center">
      <ToggleGroup
        type="single"
        value={getSupplyPriorityProps(selectedPriority).label}
        onValueChange={(value) => {
          const priorityValue = Object.entries(SupplyPriority).find(([, val]) => priorityOptions[val as SupplyPriority] === value)
          if (priorityValue) {
            setSelectedPriority(Number(priorityValue[1]))
          }
        }}
      >
        {Object.values(SupplyPriority).filter(value => typeof value === 'number').map((value) => {
          const { label: labelItem, initials: initialsItem,
            // className: circleClassNameItem 
          } = getSupplyPriorityProps(value as SupplyPriority)
          const isEqual = selectedPriority === value
          // const result = separateClasses(circleClassNameItem);
          // const selectedItemClassName = String(`data-[state=on]:${result.bgClass}`)

          return (
            <ToggleGroupItem
              key={value}
              value={labelItem}
              // defaultChecked={value === priority }
              aria-label={labelItem}
              // do not working
              // className={cn('',
              //   isEqual ? selectedItemClassName : ''
              //   )}
              className={
                isEqual ? `data-[state=on]:bg-blue-500 data-[state=on]:text-white` : ``
              }
            >
              {initialsItem}
            </ToggleGroupItem>
          )
        })}
      </ToggleGroup>
    </div>
  )
}