import {
  useState,
  useRef,
  useCallback,
  useEffect,
  SetStateAction,
} from "react";

const useStateWithCallback = <T>(
  initialState: T
): [T, (v: SetStateAction<T>, cb?: (arg?: T) => void) => void] => {
  const [state, setState] = useState(initialState);
  const ref = useRef<((arg: T) => void) | null>();

  const setValue = useCallback(
    (v, cb?) => {
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
