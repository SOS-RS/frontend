import React from 'react';

interface TitleSectionProps {
    title: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({ title }) => {
    return (
        <p className="text-muted-foreground text-sm md:text-lg font-medium">
            {title}
        </p>
    );
};

export default TitleSection;