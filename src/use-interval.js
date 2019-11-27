import {useEffect,useRef} from "react";

export function useInterval(fn,delay) {
    const saveCallback = useRef();

    useEffect(() => {
        saveCallback.current = fn;
    });

    useEffect(() => {
        function click() {
            saveCallback.current();
        }

        if(delay !== null) {
            const id = setInterval(click, delay);

            return () => clearInterval(id)
        }
    },[delay])

}