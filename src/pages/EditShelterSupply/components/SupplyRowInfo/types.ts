export interface ISupplyRowInfoProps {
  name: string;
  quantity?: number | null;
  priority: number;
  onClick?: () => void;
}
