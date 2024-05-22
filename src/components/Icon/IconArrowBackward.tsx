import { FC } from 'react';

interface IconArrowBackwardProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconArrowBackward: FC<IconArrowBackwardProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M9.5 7L4.5 12L9.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path opacity={duotone ? '0.5' : '1'} d="M4.5 12L14.5 12C16.1667 12 19.5 13 19.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
};

export default IconArrowBackward;
