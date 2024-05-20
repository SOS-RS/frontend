import { FC } from 'react';

interface IconLayoutProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconLayout: FC<IconLayoutProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <>
            {!fill ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path
                        d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                    <path
                        opacity={duotone ? '0.5' : '1'}
                        d="M2 8.75C1.58579 8.75 1.25 9.08579 1.25 9.5C1.25 9.91421 1.58579 10.25 2 10.25V8.75ZM22 10.25C22.4142 10.25 22.75 9.91421 22.75 9.5C22.75 9.08579 22.4142 8.75 22 8.75V10.25ZM8.25 21C8.25 21.4142 8.58579 21.75 9 21.75C9.41421 21.75 9.75 21.4142 9.75 21H8.25ZM9.75 10C9.75 9.58579 9.41421 9.25 9 9.25C8.58579 9.25 8.25 9.58579 8.25 10L9.75 10ZM2 10.25H22V8.75H2V10.25ZM9.75 21L9.75 10L8.25 10L8.25 21H9.75Z"
                        fill="currentColor"
                    />
                </svg>
            ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path
                        opacity={duotone ? '0.5' : '1'}
                        d="M11.9999 2C16.714 2 19.071 2 20.5355 3.46447C21.6157 4.54472 21.8991 6.11064 21.9735 8.75L21.9999 9.5H9.74992H8.99992H2.02637V8.75C2.10072 6.11064 2.38413 4.54472 3.46439 3.46447C4.92885 2 7.28588 2 11.9999 2Z"
                        fill="currentColor"
                    />
                    <path
                        opacity={duotone ? '0.7' : '1'}
                        d="M2 12C2 16.714 2 19.0711 3.46447 20.5355C4.47468 21.5458 5.90962 21.8591 8.25 21.9563L9 22V10.25V9.5H2.02645L2.00339 10.25C2 10.7944 2 11.3766 2 12Z"
                        fill="currentColor"
                    />
                    <path
                        d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C11.1815 22 9.68405 22 9 21.9923V21L9 10.25V9.5L22 9.5L21.9966 10.25C22 10.7944 22 11.3766 22 12Z"
                        fill="currentColor"
                    />
                </svg>
            )}
        </>
    );
};
export default IconLayout;
