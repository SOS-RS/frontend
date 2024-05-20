import { FC } from 'react';

interface IconListCheckProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconListCheck: FC<IconListCheckProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M2 5.5L3.21429 7L7.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path opacity={duotone ? '0.5' : '1'} d="M2 12.5L3.21429 14L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 19.5L3.21429 21L7.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 19L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path opacity={duotone ? '0.5' : '1'} d="M22 12L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M22 5L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
};

export default IconListCheck;
