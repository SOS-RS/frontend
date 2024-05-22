import { FC } from 'react';

interface IconMenuProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconMenu: FC<IconMenuProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M20 7L4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path opacity={duotone ? '0.5' : '1'} d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 17L4 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
};

export default IconMenu;
