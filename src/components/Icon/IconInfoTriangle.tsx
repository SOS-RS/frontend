import { FC } from 'react';

interface IconInfoTriangleProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconInfoTriangle: FC<IconInfoTriangleProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <>
            {!fill ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path
                        opacity={duotone ? '0.5' : '1'}
                        d="M5.31171 10.7615C8.23007 5.58716 9.68925 3 12 3C14.3107 3 15.7699 5.58716 18.6883 10.7615L19.0519 11.4063C21.4771 15.7061 22.6897 17.856 21.5937 19.428C20.4978 21 17.7864 21 12.3637 21H11.6363C6.21356 21 3.50217 21 2.40626 19.428C1.31034 17.856 2.52291 15.7061 4.94805 11.4063L5.31171 10.7615Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                    <path d="M12 8V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="12" cy="16" r="1" fill="currentColor" />
                </svg>
            ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        opacity={duotone ? '0.5' : '1'}
                        d="M12 3C9.68925 3 8.23007 5.58716 5.31171 10.7615L4.94805 11.4063C2.52291 15.7061 1.31034 17.856 2.40626 19.428C3.50217 21 6.21356 21 11.6363 21H12.3637C17.7864 21 20.4978 21 21.5937 19.428C22.6897 17.856 21.4771 15.7061 19.0519 11.4063L18.6883 10.7615C15.7699 5.58716 14.3107 3 12 3Z"
                        fill="currentColor"
                    />
                    <path
                        d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V8C11.25 7.58579 11.5858 7.25 12 7.25Z"
                        fill="currentColor"
                    />
                    <path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="currentColor" />
                </svg>
            )}
        </>
    );
};

export default IconInfoTriangle;
