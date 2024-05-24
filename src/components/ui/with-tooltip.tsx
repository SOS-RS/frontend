import { useState, ReactNode, useEffect } from 'react';
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from './tooltip';

interface WithTooltipProps {
  children: ReactNode;
  content: string;
  preventLinkDefault?: boolean;
}

const WithTooltip = ({
  children,
  content,
  preventLinkDefault = false,
}: WithTooltipProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      setOpen(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [open]);

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger
        asChild
        onClick={(e) => {
          if (preventLinkDefault) {
            e.preventDefault();
          }
        }}
        onTouchStart={(e) => {
          if (preventLinkDefault) {
            e.preventDefault();
          }
          setOpen((curr) => !curr);
        }}
      >
        {children}
      </TooltipTrigger>

      <TooltipContent className="border-none data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[8px] px-[15px] py-[10px] text-[12px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]">
        <p className="antialiased font-bold text-white">{content}</p>
        <TooltipArrow />
      </TooltipContent>
    </Tooltip>
  );
};

export default WithTooltip;
