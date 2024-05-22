import { FC } from 'react';

interface IconFacebookCircleProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconFacebookCircle: FC<IconFacebookCircleProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
            <path
                d="M14 7C14 3.15 10.85 0 7 0C3.15 0 0 3.15 0 7C0 10.5 2.5375 13.3875 5.8625 13.9125V9.0125H4.1125V7H5.8625V5.425C5.8625 3.675 6.9125 2.7125 8.4875 2.7125C9.275 2.7125 10.0625 2.8875 10.0625 2.8875V4.6375H9.1875C8.3125 4.6375 8.05 5.1625 8.05 5.6875V7H9.975L9.625 9.0125H7.9625V14C11.4625 13.475 14 10.5 14 7Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default IconFacebookCircle;
