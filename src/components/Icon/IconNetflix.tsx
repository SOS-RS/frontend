import { FC } from 'react';

interface IconNetflixProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconNetflix: FC<IconNetflixProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" className={className}>
            <path
                fill="currentColor"
                d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596c2.344.058 4.85.398 4.854.398c-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z"
            />
        </svg>
    );
};

export default IconNetflix;
