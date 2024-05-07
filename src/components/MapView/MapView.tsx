import { useRef } from 'react';

import { useMap } from '@/hooks';

const MapView = () => {
  const ref = useRef<HTMLDivElement>(null);
  useMap(ref);

  return (
    <div
      ref={ref}
      className="w-full h-full absolute top-0 bottom-0 right-0 left-0"
    />
  );
};

export { MapView };
