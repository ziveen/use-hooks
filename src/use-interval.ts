import { useEffect,useRef } from 'react';
import * as React from 'react';

function useInterval(fn: Function, delay?: number | null) {
    const saveCallback:React.MutableRefObject<any> = useRef();

    useEffect(() => {
        saveCallback.current = fn;
    });

    useEffect(() => {
        function click() {
            saveCallback.current();
        }

        if(delay !== null) {
            const id = setInterval(click, delay || 0);

            return () => clearInterval(id)
        } 

        return undefined
    },[delay])

}

export { useInterval }