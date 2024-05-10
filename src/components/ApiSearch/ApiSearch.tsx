import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { ApiSearchProps, ISearchableObject } from './types';
import { useThrottle } from '@/hooks';

export const ApiSearchFunc = forwardRef(
  <T extends ISearchableObject>(props: ApiSearchProps<T>, ref: any) => {
    const {
      label,
      name,
      containerClassName,
      labelClassName,
      className,
      error,
      setSelectedItem,
      helperText,
      data,
      loading,
      ...rest
    } = props;

    const [filteredItems, setFilteredItems] = useState<T[]>([]);
    const [search, setSearch] = useThrottle<string>(
      {
        throttle: 300,
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
    const [item, setItem] = useState<string | undefined>(undefined);

    return (
      <div className={cn('flex flex-col gap-2 w-full', containerClassName)}>
        <label
          htmlFor={name}
          className={cn('text-muted-foreground', labelClassName)}
        >
          {label}
        </label>

        <Input
          ref={ref}
          name={name}
          className={cn(error ? 'border-[1px] border-red-600' : '', className)}
          onChange={(ev) => {
            setSelectedItem({
              name: ev.target.value,
              id: undefined,
            });
            setItem(ev.target.value);
            setSearch(ev.target.value);
          }}
          value={item}
          {...rest}
        />

        {search && (
          <div
            className={cn(
              'relative z-50 max-h-96 min-w-[8rem] overflow-x-hidden	overflow-y-scroll rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
              'p-1',
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
              'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
              className
            )}
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((supply) => (
                <>
                  <div
                    className={cn(
                      'p-1 hover:bg-accent hover:text-accent-foreground',
                      'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
                      className
                    )}
                    onClick={() => {
                      setItem(supply.name);
                      setSelectedItem({
                        name: supply.name,
                        id: supply.id,
                      });
                      setSearch('');
                    }}
                    key={supply.id}
                  >
                    {loading ? `carregando` : supply.name}
                  </div>
                  {filteredItems.length > 1 && (
                    <div
                      className={cn('-mx-1 my-1 h-px bg-muted', className)}
                    />
                  )}
                </>
              ))
            ) : (
              <div
                className={cn(
                  'p-1',
                  'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
                  className
                )}
                onClick={() => {
                  setItem(item);
                  setSelectedItem({
                    name: item ?? '',
                    id: undefined,
                  });
                  setSearch('');
                }}
              >
                {item}
              </div>
            )}
          </div>
        )}

        {helperText && (
          <p className={cn(error ? 'text-red-600 text-sm' : '', className)}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
