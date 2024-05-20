import { FC } from 'react';

interface IconCreditCardProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconCreditCard: FC<IconCreditCardProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <>
            {!fill ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path
                        d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                    <path opacity={duotone ? '0.5' : '1'} d="M10 16H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path opacity={duotone ? '0.5' : '1'} d="M14 16H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path opacity={duotone ? '0.5' : '1'} d="M2 10L22 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            ) : duotone ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path
                        opacity={duotone ? '0.5' : '1'}
                        d="M9.99976 20H13.9998C17.771 20 19.6566 20 20.8282 18.8284C21.9998 17.6569 21.9998 15.7712 21.9998 12C21.9998 11.5581 21.9981 10.392 21.9962 10H2C1.99811 10.392 1.99976 11.5581 1.99976 12C1.99976 15.7712 1.99976 17.6569 3.17133 18.8284C4.34291 20 6.22852 20 9.99976 20Z"
                        fill="currentColor"
                    />
                    <path
                        d="M9.99484 4H14.0052C17.7861 4 19.6766 4 20.8512 5.11578C21.6969 5.91916 21.9337 7.07507 22 9V10H2V9C2.0663 7.07507 2.3031 5.91916 3.14881 5.11578C4.3234 4 6.21388 4 9.99484 4Z"
                        fill="currentColor"
                    />
                    <path
                        d="M12.5 15.25C12.0858 15.25 11.75 15.5858 11.75 16C11.75 16.4142 12.0858 16.75 12.5 16.75H14C14.4142 16.75 14.75 16.4142 14.75 16C14.75 15.5858 14.4142 15.25 14 15.25H12.5Z"
                        fill="currentColor"
                    />
                    <path
                        d="M6 15.25C5.58579 15.25 5.25 15.5858 5.25 16C5.25 16.4142 5.58579 16.75 6 16.75H10C10.4142 16.75 10.75 16.4142 10.75 16C10.75 15.5858 10.4142 15.25 10 15.25H6Z"
                        fill="currentColor"
                    />
                </svg>
            ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path
                        d="M14 4H10C6.22876 4 4.34315 4 3.17157 5.17157C2.32803 6.01511 2.09185 7.22882 2.02572 9.25H21.9743C21.9082 7.22882 21.672 6.01511 20.8284 5.17157C19.6569 4 17.7712 4 14 4Z"
                        fill="currentColor"
                    />
                    <path
                        d="M10 20H14C17.7712 20 19.6569 20 20.8284 18.8284C22 17.6569 22 15.7712 22 12C22 11.5581 22 11.142 21.9981 10.75H2.00189C2 11.142 2 11.5581 2 12C2 15.7712 2 17.6569 3.17157 18.8284C4.34315 20 6.22876 20 10 20Z"
                        fill="currentColor"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.25 16C5.25 15.5858 5.58579 15.25 6 15.25H10C10.4142 15.25 10.75 15.5858 10.75 16C10.75 16.4142 10.4142 16.75 10 16.75H6C5.58579 16.75 5.25 16.4142 5.25 16Z"
                        fill="white"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.75 16C11.75 15.5858 12.0858 15.25 12.5 15.25H14C14.4142 15.25 14.75 15.5858 14.75 16C14.75 16.4142 14.4142 16.75 14 16.75H12.5C12.0858 16.75 11.75 16.4142 11.75 16Z"
                        fill="white"
                    />
                </svg>
            )}
        </>
    );
};

export default IconCreditCard;
