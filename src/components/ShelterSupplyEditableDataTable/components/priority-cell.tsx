// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn, getSupplyPriorityProps, priorityOptions,
  //  separateClasses 
  } from "@/lib/utils"
import { SupplyPriority } from "@/service/supply/types"
import { useEffect, useState } from "react"
import { CircleIcon } from "lucide-react"
import { getColorClass } from "./utils"

export const PriorityCell = ({ getValue, row, column, table }: any) => {
  const supplyId = row.original.supply.id as string

  const initialPriority: number = getValue()
  const [selectedPriority, setSelectedPriority] = useState<number>(initialPriority)

  const { newData } = table.options.meta
  const rowIsModified = newData && newData.some((item: any) => item.supply.id === supplyId);

  // is necessaary?
  // useEffect(() => {
  //   setSelectedPriority(initialPriority)
  // }, [initialPriority])

  useEffect(() => {
    if (!rowIsModified) {  
      setSelectedPriority(initialPriority)
    }
  }, [rowIsModified, initialPriority])

  function handleUpdatePriority(newPriority: number) {
    setSelectedPriority(newPriority)

    table.options.meta?.updateRowData(supplyId, newPriority, column.id)
  }

  return (
    <div className="flex items-center w-64">
      {/* Maybe show this component to mobile devices */}
      {/* <ToggleGroup
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
          const selectedItemClassName = `data-[state=on]:bg-red-500 data-[state=on]:text-white`
          // console.log({isEqual})
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
                initialPriority === value && !isEqual ? ' data-[state=off]:border-red-400 text-gray-400' : '',
                isEqual ? selectedItemClassName : '',
              )}
            >
              {initialsItem}
            </ToggleGroupItem>
          )
        })}
      </ToggleGroup> */}

      <Select 
        value={getSupplyPriorityProps(selectedPriority).label} onValueChange={(value) => {
          const priorityValue = Object.entries(SupplyPriority).find(([, val]) => priorityOptions[val as SupplyPriority] === value)
          if (priorityValue) {
            handleUpdatePriority(Number(priorityValue[1]))
          }
        }}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione a prioridade" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* <SelectLabel>Prioridades</SelectLabel> */}
            {Object.values(SupplyPriority).filter(value => typeof value === 'number').map((value) => {
              const { label: labelItem } = getSupplyPriorityProps(value as SupplyPriority)
              const colorPriorityClass =  getColorClass(value) 
              
              return (
                <SelectItem key={value} value={labelItem} className="">
                  <div className="flex items-center">
                  <CircleIcon className={cn("mr-2 h-4 w-4", colorPriorityClass)} /> 
                  {labelItem}
                  </div>
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}