import { FC } from 'react';

interface IconCaretDownProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconCaretDown: FC<IconCaretDownProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <>
            {!fill ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path
                        d="M12.4044 8.30273L15.8351 11.6296C16.0549 11.8428 16.0549 12.1573 15.8351 12.3704L9.20467 18.8001C8.79094 19.2013 8 18.9581 8 18.4297V12.7071L12.4044 8.30273Z"
                        fill="currentColor"
                    />
                    <path opacity={duotone ? '0.5' : '1'} d="M8 11.2929L8 5.5703C8 5.04189 8.79094 4.79869 9.20467 5.1999L11.6864 7.60648L8 11.2929Z" fill="currentColor" />
                </svg>
            )}
        </>
    );
};

export default IconCaretDown;
