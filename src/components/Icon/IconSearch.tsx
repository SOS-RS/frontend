import { FC } from 'react';

interface IconSearchProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconSearch: FC<IconSearchProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity={duotone ? '0.5' : '1'} />
            <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
};

export default IconSearch;
