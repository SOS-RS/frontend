import { useState, ReactNode, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

interface WithTooltipProps {
  children: ReactNode;
  content: string;
}

const WithTooltip = ({ children, content }: WithTooltipProps) => {
  const [open, setOpen] = useState(false);
  console.log('🚀 ~ WithTooltip ~ open:', open);

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
          e.preventDefault();
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          setOpen((curr) => !curr);
        }}
      >
        {children}
      </TooltipTrigger>

      <TooltipContent className=" bg-gray-950 data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] px-[15px] py-[10px] text-[12px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]">
        <p className="text-white">{content}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default WithTooltip;
