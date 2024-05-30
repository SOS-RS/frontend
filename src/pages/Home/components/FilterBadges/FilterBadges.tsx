import React, { useMemo } from 'react';
import { X } from 'lucide-react';

import { getSupplyPriorityProps } from '@/lib/utils';
import { useSupplyCategories } from '@/hooks/useSupplyCategories';
import { useSupplies } from '@/hooks/useSupplies';
import { ShelterAvailabilityStatusMapped, mapSupplies, mapSupplyCategories } from '../Filter/Filter';
import { IFilterBadgesProps } from './types';
import { IFilterFormProps } from '../Filter/types';

function removeFilter({ from: filterData, filter: item } : { from: IFilterFormProps, filter: string }): IFilterFormProps {
    const filterFormPropsListNames = Object.keys(filterData);
    const onlyArrayProps = filterFormPropsListNames.filter((prop) => Array.isArray(filterData[prop as keyof IFilterFormProps]));
    const newFilterData: IFilterFormProps = {
      search: "",
      priority: [],
      supplyCategoryIds: [],
      supplyIds: [],
      shelterStatus: [],
      cities: []
    }
  
    onlyArrayProps.forEach((property: string) => {
      const propertyValue = filterData[property as keyof IFilterFormProps];
  
      if (Array.isArray(propertyValue)) {
          const newValues =  propertyValue.filter((it) => it !== item) as typeof propertyValue;
          newFilterData[property] = [...newValues];
      }
    });
  
    return newFilterData;
}

const FilterBadges = React.forwardRef<
  HTMLDivElement,
  IFilterBadgesProps
>((props, ref) => {
    const { filterData, onBadgeClicked } = props;

    const { data: supplyCategories } = useSupplyCategories();
    const mappedSupplyCategories = useMemo(() =>
      mapSupplyCategories(supplyCategories), [supplyCategories]);
    const { data: supplies } = useSupplies();
    const mappedSupplies = useMemo(() => mapSupplies(supplies), [supplies]);

    const renderFilterBadge = (filterKey: string, filterLabel: string) => {
        return <div
          className="flex items-center px-4 py-1 font-normal text-sm md:text-md rounded-3xl bg-gray-300 justify-center cursor-pointer hover:opacity-80 transition-all duration-200"
          key={filterKey}
          onClick={() =>
            onBadgeClicked?.(removeFilter({ from: filterData, filter: filterKey }))}
        >
          <span className="pr-1">{filterLabel}</span> <X className="h-4 w-4" />
        </div>;
    };

    return (
        <div ref={ref} className="flex flex-wrap gap-1 items-center">
            {filterData.cities?.map((city) => renderFilterBadge(city, city))}
            {filterData.priority?.map((priorityLevel) =>
                renderFilterBadge(priorityLevel, getSupplyPriorityProps(+priorityLevel).label))}
            {filterData.supplyCategoryIds?.map((supplyCategoryId) =>
                renderFilterBadge(supplyCategoryId, mappedSupplyCategories[supplyCategoryId]?.name))}
            {filterData.supplyIds?.map((supplyId) =>
                renderFilterBadge(supplyId, mappedSupplies[supplyId]?.name))}
            {filterData.shelterStatus?.map((statusLabel) =>
                renderFilterBadge(statusLabel, ShelterAvailabilityStatusMapped[statusLabel]))}
        </div>
    );
});

export { FilterBadges };
