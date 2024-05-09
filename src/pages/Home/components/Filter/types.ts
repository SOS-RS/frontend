export interface ISupplyOptionsSelect {
    id: string;
    name: string;
    supplyCategory: {
        id: string;
        name: string;
    };
    createdAt: Date;
    updatedAt: Date | null;
}

export interface IComplexSelectGroupedData {
    label: string;
    options: IComplexSelectData[]
}

export interface IComplexSelectData {
    label: string;
    value: string;
}

export interface IAdvancedFilterProps {
    
}