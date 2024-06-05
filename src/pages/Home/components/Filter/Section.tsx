import React, { ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
};

const Section: React.FC<SectionProps> = ({ children }) => {
  return (
    <div className="flex flex-col gap-2 w-full my-4">
      {children}
    </div>
  );
};

export default Section;