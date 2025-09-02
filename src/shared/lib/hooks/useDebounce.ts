import { useEffect, useState } from "react";

/**
 * Returns a debounced value that updates only after `delay` ms
 * have passed without further changes.
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler); // cleanup on value/delay change
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;