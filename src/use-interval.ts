import {useEffect,useRef} from "react";
import * as React from "react";

export function useInterval(fn: () => void,delay:number) {
    const saveCallback:React.MutableRefObject<any> = useRef();

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

        return () => {}
    },[delay])

}