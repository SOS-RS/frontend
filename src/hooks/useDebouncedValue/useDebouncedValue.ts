import { useState, useEffect } from 'react';

export const useDebouncedValue = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);
  const [currentValue, setCurrentValue] = useState<string>(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (currentValue !== debouncedValue) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDebouncedValue(currentValue);
      }, delay);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentValue, debouncedValue, delay]);

  return debouncedValue;
};
