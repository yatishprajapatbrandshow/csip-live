'use client';

import { useEffect, useState } from 'react';

export const useCountUp = (target, duration = 1000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = Math.ceil(target / (duration / 100));
    let currentCount = 0;

    const interval = setInterval(() => {
      if (currentCount < target) {
        currentCount += increment;
        if (currentCount > target) currentCount = target;
        setCount(currentCount);
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [target, duration]);

  return count;
};

