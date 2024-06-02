import { Chip } from '@/components';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ISuppliesHistoryItemProps } from './types';

const SuppliesHistoryItem = ({
  history,
  className,
}: ISuppliesHistoryItemProps) => {
  const quantity = history.quantity ?? history.predecessor?.quantity;
  const showBadge = quantity !== null && quantity !== undefined && quantity > 0;

  return (
    <div className={cn('flex gap-x-1 relative', { 'mr-3': history.quantity })}>
      <Chip label={history.supply.name} className={className} />
      {showBadge && (
        <Badge
          variant="default"
          className="absolute z-10 right-4 top-0 -translate-y-2 translate-x-full text-xs flex items-center justify-center w-7 h-6"
        >
          {quantity > 99 ? '99+' : quantity}
        </Badge>
      )}
    </div>
  );
};

export { SuppliesHistoryItem };
