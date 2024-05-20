import { FC } from 'react';

interface IconMoodSmileProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconMoodSmile: FC<IconMoodSmileProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <circle opacity={duotone ? '0.5' : '1'} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5Z" fill="currentColor" />
            <ellipse cx="9" cy="10.5" rx="1" ry="1.5" fill="currentColor" />
        </svg>
    );
};

export default IconMoodSmile;
