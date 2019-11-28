import * as React from "react";
import { useState,} from 'react';
import {useInterval} from '../use-interval';
import { Button } from '@storybook/react/demo';
import {storiesOf} from "@storybook/react";


function Counter({time,success}) {
    const [count,setCount] = useState<number>(time);
    const [delay] = useState<number>(1000);
    const [isRunning,setRunning] = useState<boolean>(false);

    const start = () => {
        setRunning(true);
    };

    useInterval(() => {
        setCount(count - 1);
        //  count明明是0 为什么是1呢，setCount异步？
        if(count < 1) {
            success(count);
            setCount(0);
            setRunning(false);
        }
    }, isRunning ? delay : null);


    return (
        <div>
            <Button onClick={start}>开始计时</Button>
            <span>剩余时间：{count}</span>
        </div>
    )
}

export function Countdown() {
    const successCallback = (data) => {
        console.log("完成计时" + data);
    };
    return (
        <Counter time={5} success={successCallback}/>
    )
}

storiesOf("计时器",module)
    .add("Countdown", () => <Countdown />);