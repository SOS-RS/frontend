import { FC } from 'react';

interface IconChromeProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconChrome: FC<IconChromeProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="12" cy="12" r="10"></circle>
            <circle opacity={duotone ? '0.5' : '1'} cx="12" cy="12" r="4"></circle>
            <line opacity={duotone ? '0.5' : '1'} x1="21.17" y1="8" x2="12" y2="8"></line>
            <line opacity={duotone ? '0.5' : '1'} x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
            <line opacity={duotone ? '0.5' : '1'} x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
        </svg>
    );
};

export default IconChrome;
