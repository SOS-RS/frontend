import { FC } from 'react';

interface IconBinanceProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconBinance: FC<IconBinanceProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" className={className}>
            <g id="Icon">
                <circle cx="512" cy="512" r="512" style={{ fill: '#f3ba2f' }} />
                <path className="st1 fill-white" d="M404.9 468 512 360.9l107.1 107.2 62.3-62.3L512 236.3 342.6 405.7z" />
                <path transform="rotate(-45.001 298.629 511.998)" className="st1 fill-white" d="M254.6 467.9h88.1V556h-88.1z" />
                <path className="st1 fill-white" d="M404.9 556 512 663.1l107.1-107.2 62.4 62.3h-.1L512 787.7 342.6 618.3l-.1-.1z" />
                <path transform="rotate(-45.001 725.364 512.032)" className="st1 fill-white" d="M681.3 468h88.1v88.1h-88.1z" />
                <path className="st1 fill-white" d="M575.2 512 512 448.7l-46.7 46.8-5.4 5.3-11.1 11.1-.1.1.1.1 63.2 63.2 63.2-63.3z" />
            </g>
        </svg>
    );
};

export default IconBinance;
