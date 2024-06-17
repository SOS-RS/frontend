import { useContext } from 'react';
import { HandHeart } from 'lucide-react';

import { Button } from '../ui/button';
import { DonationCartContext } from '@/contexts';
import { IDonationCartIconProps } from './types';

const DonationCartIcon = (props: IDonationCartIconProps) => {
  const { quantity } = props;
  const { toggleOpened } = useContext(DonationCartContext);

  return (
    <Button
      variant="ghost"
      size="sm"
      className="relative hover:bg-red-400 disabled:bg-red-500"
      onClick={toggleOpened}
    >
      <HandHeart className="h-6 w-6 stroke-white" />
      {!!quantity && (
        <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full border-[1px] border-red-600 bg-red-700 p-2 text-xs text-white">
          {quantity}
        </span>
      )}
    </Button>
  );
};

export { DonationCartIcon };
