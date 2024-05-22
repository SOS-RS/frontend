import { FC } from 'react';

interface IconLinkedinProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconLinkedin: FC<IconLinkedinProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={fill ? 'currentColor' : 'none'}
            stroke={!fill ? 'currentColor' : 'none'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
        </svg>
    );
};

export default IconLinkedin;
