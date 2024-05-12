import { useState, useEffect } from 'react';

export const useDebouncedValue = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);
  const [currentValue, setCurrentValue] = useState<string>(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (currentValue !== debouncedValue) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDebouncedValue(currentValue);
      }, delay);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentValue, debouncedValue, delay]);

  return debouncedValue;
};
