import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ApiSearchProps, ISearchableObject } from './types';
import { useThrottle } from '@/hooks';
import * as Ariakit from '@ariakit/react';

export const ApiSearchFunc = forwardRef(
  <T extends ISearchableObject>(props: ApiSearchProps<T>, ref: any) => {
    const {
      label,
      containerClassName,
      labelClassName,
      className,
      error,
      setSelectedItem,
      helperText,
      data,
      throttle,
      ...rest
    } = props;

    const [filteredItems, setFilteredItems] = useState<T[]>([]);
    const [, setSearch] = useThrottle<string>(
      {
        throttle,
        callback: (v) => {
          if (v) {
            setFilteredItems(
              data.filter((s) => s.name.toLowerCase().includes(v.toLowerCase()))
            );
          } else setFilteredItems(data);
        },
      },
      [data]
    );

    return (
      <div className={cn('flex flex-col gap-2 w-full', containerClassName)}>
        <Ariakit.ComboboxProvider>
          <div className="flex flex-col">
            {label && (
              <label className={cn('text-muted-foreground', labelClassName)}>
                {label}
              </label>
            )}
            <Ariakit.Combobox
              ref={ref}
              className={cn(
                className,
                'combobox w-full',
                'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                error ? 'border-[1px] border-red-600' : ''
              )}
              {...rest}
              onChange={(ev) => {
                setSelectedItem({
                  name: ev.target.value,
                });
                setSearch(ev.target.value);
              }}
            />
            {helperText && (
              <p className={'text-red-600 text-sm'}>{helperText}</p>
            )}
          </div>
          {filteredItems.length > 0 && (
            <Ariakit.ComboboxPopover
              gutter={4}
              sameWidth
              className={cn(
                'popover w-full z-10 max-h-96 p-1',
                'overflow-x-hidden	overflow-y-scroll rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                className
              )}
            >
              {filteredItems.map((item) => (
                <>
                  <Ariakit.ComboboxItem
                    key={item.id}
                    onClick={() => {
                      setSelectedItem(item);
                      setSearch('');
                    }}
                    className={cn(
                      'p-1 hover:bg-accent hover:text-accent-foreground',
                      'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
                      className
                    )}
                    value={item.name}
                  >
                    {item.name}
                  </Ariakit.ComboboxItem>
                  {filteredItems.length > 1 && (
                    <div
                      key={`${item.id}-divider`}
                      className={cn('-mx-1 my-1 h-px bg-muted', className)}
                    />
                  )}
                </>
              ))}
            </Ariakit.ComboboxPopover>
          )}
        </Ariakit.ComboboxProvider>
      </div>
    );
  }
);
