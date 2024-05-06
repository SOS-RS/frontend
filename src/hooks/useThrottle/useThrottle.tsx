import React, { useState, useEffect } from 'react';

import { ThrottleOptions } from './types';

function useThrottle<T>(
  initialValue: T,
  options: ThrottleOptions<T>,
  deps: any[]
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const { throttle = 400, callback } = options;
  const [value, setValue] = useState<T>(initialValue);
  const [, setIntervalId] = useState<NodeJS.Timeout>();

  useEffect(() => {
    const id = setTimeout(() => callback(value), throttle);
    setIntervalId((prev) => {
      if (prev) clearTimeout(prev);
      return id;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, throttle, ...deps]);

  return [value, setValue];
}

export { useThrottle };
