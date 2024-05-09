import { BadgeCheck } from 'lucide-react';
import WithTooltip from '@/components/ui/with-tooltip.tsx';

const VerifiedBadge = () => {
  return (
    <WithTooltip content="Abrigo verificado">
      <BadgeCheck className="h-5 w-5 stroke-white" fill="#1D61C8" />
    </WithTooltip>
  )
}

export { VerifiedBadge };