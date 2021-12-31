import { useEffect, useRef } from "react";

type Callback = () => void;

const useInterval = (fn: Callback, delay?: number | null) => {
  const ref = useRef<Callback>();

  useEffect(() => {
    ref.current = fn;
  });

  useEffect(() => {
    function click() {
      ref.current!();
    }

    if (delay !== null) {
      const id = setInterval(click, delay || 0);

      return () => clearInterval(id);
    }

    return undefined;
  }, [delay]);
};

export default useInterval;
