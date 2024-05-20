import { FC } from 'react';

interface IconClipboardTextProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconClipboardText: FC<IconClipboardTextProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <>
            {!fill ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path
                        opacity={duotone ? '0.5' : '1'}
                        d="M16 4.00195C18.175 4.01406 19.3529 4.11051 20.1213 4.87889C21 5.75757 21 7.17179 21 10.0002V16.0002C21 18.8286 21 20.2429 20.1213 21.1215C19.2426 22.0002 17.8284 22.0002 15 22.0002H9C6.17157 22.0002 4.75736 22.0002 3.87868 21.1215C3 20.2429 3 18.8286 3 16.0002V10.0002C3 7.17179 3 5.75757 3.87868 4.87889C4.64706 4.11051 5.82497 4.01406 8 4.00195"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                    <path d="M8 14H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M7 10.5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M9 17.5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path
                        d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                </svg>
            ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path
                        opacity={duotone ? '0.5' : '1'}
                        d="M21 15.9983V9.99826C21 7.16983 21 5.75562 20.1213 4.87694C19.3529 4.10856 18.175 4.01211 16 4H8C5.82497 4.01211 4.64706 4.10856 3.87868 4.87694C3 5.75562 3 7.16983 3 9.99826V15.9983C3 18.8267 3 20.2409 3.87868 21.1196C4.75736 21.9983 6.17157 21.9983 9 21.9983H15C17.8284 21.9983 19.2426 21.9983 20.1213 21.1196C21 20.2409 21 18.8267 21 15.9983Z"
                        fill="currentColor"
                    />
                    <path d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z" fill="currentColor" />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.25 10.5C6.25 10.0858 6.58579 9.75 7 9.75H17C17.4142 9.75 17.75 10.0858 17.75 10.5C17.75 10.9142 17.4142 11.25 17 11.25H7C6.58579 11.25 6.25 10.9142 6.25 10.5ZM7.25 14C7.25 13.5858 7.58579 13.25 8 13.25H16C16.4142 13.25 16.75 13.5858 16.75 14C16.75 14.4142 16.4142 14.75 16 14.75H8C7.58579 14.75 7.25 14.4142 7.25 14ZM8.25 17.5C8.25 17.0858 8.58579 16.75 9 16.75H15C15.4142 16.75 15.75 17.0858 15.75 17.5C15.75 17.9142 15.4142 18.25 15 18.25H9C8.58579 18.25 8.25 17.9142 8.25 17.5Z"
                        fill={duotone ? 'currentColor' : 'white'}
                    />
                </svg>
            )}
        </>
    );
};

export default IconClipboardText;
