import { FC } from 'react';

interface IconMapPinProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconMapPin: FC<IconMapPinProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path
                opacity={duotone ? '0.5' : '1'}
                d="M4 10.1433C4 5.64588 7.58172 2 12 2C16.4183 2 20 5.64588 20 10.1433C20 14.6055 17.4467 19.8124 13.4629 21.6744C12.5343 22.1085 11.4657 22.1085 10.5371 21.6744C6.55332 19.8124 4 14.6055 4 10.1433Z"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
};

export default IconMapPin;
