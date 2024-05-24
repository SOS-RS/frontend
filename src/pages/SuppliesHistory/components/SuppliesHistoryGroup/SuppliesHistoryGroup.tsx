import { SuppliesHistoryItem } from '../SuppliesHistoryItem';
import { ISuppliesHistoryGroupProps } from './types';

const SuppliesHistoryGroup = (props: ISuppliesHistoryGroupProps) => {
  const { items, className, title } = props;
  return (
    items.length > 0 && (
      <>
        <p className="text-xs px-6">{title}</p>
        <div className="flex gap-2 px-6 flex-wrap">
          {items.map((history, index) => (
            <SuppliesHistoryItem
              key={index}
              history={history}
              className={className}
            />
          ))}
        </div>
      </>
    )
  );
};

export { SuppliesHistoryGroup };
