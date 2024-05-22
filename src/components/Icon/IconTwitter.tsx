import { FC } from 'react';

interface IconTwitterProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconTwitter: FC<IconTwitterProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <>
            {fill ? (
                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" className={className}>
                    <path
                        d="M14 1.625C13.475 1.8875 12.95 1.975 12.3375 2.0625C12.95 1.7125 13.3875 1.1875 13.5625 0.4875C13.0375 0.8375 12.425 1.0125 11.725 1.1875C11.2 0.6625 10.4125 0.3125 9.625 0.3125C7.7875 0.3125 6.3875 2.0625 6.825 3.8125C4.4625 3.725 2.3625 2.5875 0.875 0.8375C0.0875 2.15 0.525 3.8125 1.75 4.6875C1.3125 4.6875 0.875 4.5125 0.4375 4.3375C0.4375 5.65 1.4 6.875 2.7125 7.225C2.275 7.3125 1.8375 7.4 1.4 7.3125C1.75 8.45 2.8 9.325 4.1125 9.325C3.0625 10.1125 1.4875 10.55 0 10.375C1.3125 11.1625 2.8 11.6875 4.375 11.6875C9.7125 11.6875 12.6875 7.225 12.5125 3.1125C13.125 2.7625 13.65 2.2375 14 1.625Z"
                        fill="currentColor"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={className}
                >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
            )}
        </>
    );
};
export default IconTwitter;
