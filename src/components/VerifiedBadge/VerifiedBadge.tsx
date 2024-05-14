import WithTooltip from '@/components/ui/with-tooltip.tsx';
import { BadgeCheck } from 'lucide-react';

const VerifiedBadge = () => {
  return (
    <WithTooltip content="Abrigo verificado">
      <BadgeCheck className="h-5 w-5 stroke-white dark:stoke-black" fill="#1D61C8" />
    </WithTooltip>
  )
}

export { VerifiedBadge };
