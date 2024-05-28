import { useContext } from 'react';
import { HandHeart } from 'lucide-react';

import { Button } from '../ui/button';
import { DonationCartContext } from '@/contexts';

const DonationCartIcon = () => {
  const { toggleOpened } = useContext(DonationCartContext);

  return (
    <Button
      variant="ghost"
      size="sm"
      className="disabled:bg-red-500 hover:bg-red-400"
      onClick={toggleOpened}
    >
      <HandHeart className="w-6 h-6 stroke-white" />
    </Button>
  );
};

export { DonationCartIcon };
