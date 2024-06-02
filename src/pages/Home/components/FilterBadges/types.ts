import { IFilterFormProps } from "../Filter/types";


export interface IFilterBadgesProps
  extends React.ComponentPropsWithoutRef<'div'> {
    filterData: IFilterFormProps;
    onBadgeClicked?: (v: IFilterFormProps) => void;
}
