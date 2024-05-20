import { FC } from 'react';

interface IconDollarSignProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconDollarSign: FC<IconDollarSignProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M12 6V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path
                d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default IconDollarSign;
