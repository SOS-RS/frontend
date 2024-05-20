import { FC } from 'react';

interface IconLoginProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconLogin: FC<IconLoginProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <>
            {!fill ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path
                        d="M2.00098 11.999L16.001 11.999M16.001 11.999L12.501 8.99902M16.001 11.999L12.501 14.999"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        opacity={duotone ? '0.5' : '1'}
                        d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
            ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path
                        opacity={duotone ? '0.6' : '1'}
                        d="M15 2H14C11.1716 2 9.75736 2 8.87868 2.87868C8 3.75736 8 5.17157 8 8V16C8 18.8284 8 20.2426 8.87868 21.1213C9.75736 22 11.1716 22 14 22H15C17.8284 22 19.2426 22 20.1213 21.1213C21 20.2426 21 18.8284 21 16V8C21 5.17157 21 3.75736 20.1213 2.87868C19.2426 2 17.8284 2 15 2Z"
                        fill="currentColor"
                    />
                    <path
                        opacity={duotone ? '0.4' : '1'}
                        d="M8 8C8 6.46249 8 5.34287 8.14114 4.5H8C5.64298 4.5 4.46447 4.5 3.73223 5.23223C3 5.96447 3 7.14298 3 9.5V14.5C3 16.857 3 18.0355 3.73223 18.7678C4.46447 19.5 5.64298 19.5 8 19.5H8.14114C8 18.6571 8 17.5375 8 16V12.75V11.25V8Z"
                        fill="currentColor"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14.5303 11.4697C14.8232 11.7626 14.8232 12.2374 14.5303 12.5303L12.5303 14.5303C12.2374 14.8232 11.7626 14.8232 11.4697 14.5303C11.1768 14.2374 11.1768 13.7626 11.4697 13.4697L12.1893 12.75L5 12.75C4.58579 12.75 4.25 12.4142 4.25 12C4.25 11.5858 4.58579 11.25 5 11.25L12.1893 11.25L11.4697 10.5303C11.1768 10.2374 11.1768 9.76256 11.4697 9.46967C11.7626 9.17678 12.2374 9.17678 12.5303 9.46967L14.5303 11.4697Z"
                        fill="currentColor"
                    />
                </svg>
            )}
        </>
    );
};

export default IconLogin;
