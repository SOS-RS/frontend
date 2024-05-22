import { FC } from 'react';

interface IconLaptopProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconLaptop: FC<IconLaptopProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <>
            {!fill ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path
                        d="M3 9C3 6.17157 3 4.75736 3.87868 3.87868C4.75736 3 6.17157 3 9 3H15C17.8284 3 19.2426 3 20.1213 3.87868C21 4.75736 21 6.17157 21 9V14C21 15.8856 21 16.8284 20.4142 17.4142C19.8284 18 18.8856 18 17 18H7C5.11438 18 4.17157 18 3.58579 17.4142C3 16.8284 3 15.8856 3 14V9Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                    <path opacity={duotone ? '0.5' : '1'} d="M22 21H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path opacity={duotone ? '0.5' : '1'} d="M15 15H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1 20.2405C1 19.8207 1.3436 19.4805 1.76744 19.4805H22.2326C22.6564 19.4805 23 19.8207 23 20.2405C23 20.6602 22.6564 21.0005 22.2326 21.0005H1.76744C1.3436 21.0005 1 20.6602 1 20.2405Z"
                        fill="currentColor"
                    />
                    <path
                        opacity={duotone ? '0.5' : '1'}
                        d="M3.69013 3.8904C2.79102 4.78079 2.79102 6.21386 2.79102 9.08V14.1467C2.79102 16.0574 2.79102 17.0128 3.39042 17.6064C3.98983 18.2 4.95457 18.2 6.88404 18.2H17.1166C19.0461 18.2 20.0108 18.2 20.6102 17.6064C21.2096 17.0128 21.2096 16.0574 21.2096 14.1467V9.08C21.2096 6.21386 21.2096 4.78079 20.3105 3.8904C19.4114 3 17.9643 3 15.0701 3H8.93055C6.03635 3 4.58924 3 3.69013 3.8904Z"
                        fill="currentColor"
                    />
                    <path
                        d="M8.93053 14.4004C8.50668 14.4004 8.16309 14.7407 8.16309 15.1604C8.16309 15.5801 8.50668 15.9204 8.93053 15.9204H15.0701C15.4939 15.9204 15.8375 15.5801 15.8375 15.1604C15.8375 14.7407 15.4939 14.4004 15.0701 14.4004H8.93053Z"
                        fill="currentColor"
                    />
                </svg>
            )}
        </>
    );
};

export default IconLaptop;
