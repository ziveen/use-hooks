import { useState, useRef, useCallback, useEffect } from 'react';

const useStateWithCallback = <T>(initialState: T) => {
  const [state, setState] = useState(initialState);
  const ref = useRef(null);

  const setValue = useCallback(
    (v, cb) => {
      setState(v);
      ref.current = cb;
    },
    [state]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current(state);
      ref.current = null;
    }
  }, [state]);

  return [state, setValue];
};

export default useStateWithCallback;
