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
      className="disabled:bg-red-500 hover:bg-red-400 relative"
      onClick={toggleOpened}
    >
      <HandHeart className="w-6 h-6 stroke-white" />
      {!!quantity && (
        <span className="absolute right-0 top-0 w-4 h-4 flex justify-center items-center rounded-full p-2 bg-red-700 text-xs text-white border-red-600 border-[1px]">
          {quantity}
        </span>
      )}
    </Button>
  );
};

export { DonationCartIcon };
