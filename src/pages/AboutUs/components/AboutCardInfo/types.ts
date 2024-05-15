export interface IAboutCardInfoProps
  extends React.ComponentPropsWithoutRef<'div'> {
  icon: React.ReactNode;
  topLabel: string;
  centerLabel: string;
  bottomLabel: string;
}
