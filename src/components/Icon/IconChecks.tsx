import { FC } from 'react';

interface IconChecksProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconChecks: FC<IconChecksProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <>
            {!fill ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path opacity={duotone ? '0.5' : '1'} d="M4 12.9L7.14286 16.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20.0002 7.5625L11.4286 16.5625L11.0002 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        opacity={duotone ? '0.5' : '1'}
                        d="M3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355Z"
                        fill="currentColor"
                    />
                    <path
                        d="M18.581 9.47431C18.843 9.15344 18.7952 8.68098 18.4743 8.41903C18.1534 8.15709 17.681 8.20486 17.419 8.52573L12.2514 14.8559C12.0385 14.7803 11.7939 14.8014 11.5901 14.9345C11.2432 15.1609 11.1456 15.6256 11.372 15.9724L11.6575 16.4099C11.7883 16.6103 12.0068 16.7362 12.2457 16.749C12.4846 16.7617 12.7153 16.6597 12.8666 16.4743L18.581 9.47431Z"
                        fill={duotone ? 'currentColor' : 'white'}
                    />
                    <path
                        d="M14.581 9.47431C14.843 9.15343 14.7952 8.68097 14.4743 8.41903C14.1534 8.15709 13.681 8.20487 13.419 8.52574L8.28574 14.814L6.58102 12.7257C6.31908 12.4049 5.84662 12.3571 5.52574 12.619C5.20487 12.881 5.15709 13.3534 5.41903 13.6743L7.70474 16.4743C7.84718 16.6488 8.0605 16.75 8.28574 16.75C8.51098 16.75 8.7243 16.6488 8.86673 16.4743L14.581 9.47431Z"
                        fill={duotone ? 'currentColor' : 'white'}
                    />
                </svg>
            )}
        </>
    );
};

export default IconChecks;
