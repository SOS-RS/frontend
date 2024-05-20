import { FC } from 'react';

interface IconRestoreProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconRestore: FC<IconRestoreProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <g clipPath="url(#clip0_1276_6232)">
                <path
                    d="M19.7285 10.9288C20.4413 13.5978 19.7507 16.5635 17.6569 18.6573C14.5327 21.7815 9.46736 21.7815 6.34316 18.6573C3.21897 15.5331 3.21897 10.4678 6.34316 7.3436C9.46736 4.21941 14.5327 4.21941 17.6569 7.3436L18.364 8.05071M18.364 8.05071H14.1213M18.364 8.05071V3.80807"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>
            </g>
            <defs>
                <clipPath id="clip0_1276_6232">
                    <rect width="24" height="24" fill="white"></rect>
                </clipPath>
            </defs>
        </svg>
    );
};

export default IconRestore;
