import {
  useCallback,
  useState,
  forwardRef,
  InputHTMLAttributes,
  ChangeEvent
} from "react"
import * as Ariakit from "@ariakit/react"

import { cn } from "@/lib/utils"

import "./style.css"
import { useThrottle } from "@/hooks"

export interface SearchableInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    data: { id: string, value: string, label: string } []
    onClickSuggestion: (item: SearchableInputProps["data"][number]) => void
    errorMessage?: string
    throttle: number
  }

const SearchableInput = forwardRef<HTMLInputElement, SearchableInputProps>(
  ({ data, label, throttle, errorMessage, onClickSuggestion, className, type, ...props }, ref) => {
    const [filteredData, setFilteredData] = useState<SearchableInputProps["data"]>([])

    const [, setSearch] = useThrottle<string>(
      {
        throttle,
        callback: (v) => {
          if (v) {
            setFilteredData(
              data.filter((item) =>
                item.value.toLowerCase().includes(v.toLowerCase())
              )
            );
          } else setFilteredData([]);
        },
      },
      [data]
    );

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement> ) => {
      props?.onChange?.(event)
      setSearch(event.target.value)
    }, [props, setSearch])

    return (
      <Ariakit.ComboboxProvider>
        <div className="flex flex-col">
          {label && <label className="text-muted-foreground">{label}</label>}
          <Ariakit.Combobox ref={ref} type={type} className={cn(className, "combobox", "w-full")} {...props} onChange={handleChange}/>
          {errorMessage &&  <p className={'text-red-600 text-sm'}>{errorMessage}</p>}
        </div>
        {filteredData.length ? (
          <Ariakit.ComboboxPopover gutter={4} sameWidth className="popover w-full">
            {filteredData.map((item) => (
              <Ariakit.ComboboxItem
                key={item.value}
                onClick={() => onClickSuggestion(item)}
                className="combobox-item hover:cursor-pointer"
                value={item.value}>
                {item.label}
              </Ariakit.ComboboxItem>
            ))}
          </Ariakit.ComboboxPopover> 
        ) : null}
      </Ariakit.ComboboxProvider>
    )
  }
)
SearchableInput.displayName = "SearchableInput"

export { SearchableInput }

/* reference: https://ariakit.org/components/combobox */