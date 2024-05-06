import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { IShelterCategoryItemsProps } from './types';
import { getSupplyPriorityProps } from '@/lib/utils';
import { CircleStatus, Chip } from '@/components';
import { Button } from '@/components/ui/button';

const ShelterCategoryItems = (props: IShelterCategoryItemsProps) => {
  const { priority, tags } = props;
  const [opened, setOpened] = useState<boolean>(false);
  const maxVisibleTags: number = 7;
  const visibleTags = useMemo(
    () => (opened ? tags : tags.slice(0, 7)),
    [opened, tags]
  );
  const { className: circleClassName, label } = useMemo(
    () => getSupplyPriorityProps(priority),
    [priority]
  );

  const Icon = opened ? ChevronUp : ChevronDown;
  const btnLabel = opened ? 'Ver menos' : 'Ver todos';

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        <CircleStatus className={circleClassName} />
        <h3>
          {label} ({tags.length})
        </h3>
      </div>
      <div className="flex gap-2 flex-wrap">
        {visibleTags.map((tag, idx) => (
          <Chip className={circleClassName} key={idx} label={tag} />
        ))}
      </div>
      {tags.length > maxVisibleTags && (
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="flex gap-2 items-center"
            onClick={() => setOpened((v) => !v)}
          >
            <span className="text-lg font-normal text-blue-500">
              {btnLabel}
            </span>
            <Icon className="h-5 w-5 stroke-blue-500" />
          </Button>
        </div>
      )}
    </div>
  );
};

export { ShelterCategoryItems };
