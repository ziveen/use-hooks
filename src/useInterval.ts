import { useEffect, useRef } from 'react';

const useInterval = (fn: Function, delay?: number | null) => {
  const saveCallback = useRef();

  useEffect(() => {
    saveCallback.current = fn;
  });

  useEffect(() => {
    function click() {
      saveCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(click, delay || 0);

      return () => clearInterval(id);
    }

    return undefined;
  }, [delay]);
};

export default useInterval;
