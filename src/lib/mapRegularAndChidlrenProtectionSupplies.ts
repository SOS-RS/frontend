import { IUseShelterDataSupply } from "@/hooks/useShelter/types";
import { SupplyPriority } from "@/service/supply/types";

const CHILDREN_PROTECTION_CATEGORY = 'Proteção para crianças';

export function mapRegularAndChidlrenProtectionSupplies(shelterSupplies: IUseShelterDataSupply[]): {
  childrenProtectionSupplies: IUseShelterDataSupply[];
  regularSupplies: IUseShelterDataSupply[];
} {
  const childrenProtectionSupplies: IUseShelterDataSupply[] = [];
  const regularSupplies: IUseShelterDataSupply[] = [];

  shelterSupplies.forEach((currentSupply) => {
    if (currentSupply.priority === SupplyPriority.NotNeeded) return;

    if (currentSupply.supply.supplyCategory.name === CHILDREN_PROTECTION_CATEGORY) {
      childrenProtectionSupplies.push(currentSupply);
    }

    regularSupplies.push(currentSupply);
  });

  return { childrenProtectionSupplies, regularSupplies };
}
