import { FC } from 'react';

interface IconPrinterProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconPrinter: FC<IconPrinterProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path
                d="M6 17.9827C4.44655 17.9359 3.51998 17.7626 2.87868 17.1213C2 16.2426 2 14.8284 2 12C2 9.17157 2 7.75736 2.87868 6.87868C3.75736 6 5.17157 6 8 6H16C18.8284 6 20.2426 6 21.1213 6.87868C22 7.75736 22 9.17157 22 12C22 14.8284 22 16.2426 21.1213 17.1213C20.48 17.7626 19.5535 17.9359 18 17.9827"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path opacity={duotone ? '0.5' : '1'} d="M9 10H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M19 14L5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path
                d="M18 14V16C18 18.8284 18 20.2426 17.1213 21.1213C16.2426 22 14.8284 22 12 22C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                opacity={duotone ? '0.5' : '1'}
                d="M17.9827 6C17.9359 4.44655 17.7626 3.51998 17.1213 2.87868C16.2427 2 14.8284 2 12 2C9.17158 2 7.75737 2 6.87869 2.87868C6.23739 3.51998 6.06414 4.44655 6.01733 6"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <circle opacity={duotone ? '0.5' : '1'} cx="17" cy="10" r="1" fill="currentColor" />
            <path opacity={duotone ? '0.5' : '1'} d="M15 16.5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path opacity={duotone ? '0.5' : '1'} d="M13 19H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
};

export default IconPrinter;
