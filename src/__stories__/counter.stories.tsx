import React, { useState } from "react";
import { Button } from "@storybook/react/demo";
import { storiesOf } from "@storybook/react";
import { useInterval, useStateWithCallback } from "../index";

function Counter({
  time,
  success,
}: {
  time: number;
  success: (v: number) => void;
}) {
  const [count, setCount] = useStateWithCallback(time);
  const [delay] = useState(1000);
  const [isRunning, setRunning] = useState(false);

  const start = () => {
    setRunning(true);
  };

  useInterval(
    () => {
      setCount(count - 1);
      if (count < 1) {
        success(count);
        setCount(0, () => {
          setRunning(false);
        });
      }
    },
    isRunning ? delay : null
  );

  return (
    <div>
      <Button onClick={start}>开始计时</Button>
      <span>剩余时间：{count}</span>
    </div>
  );
}

export function Countdown() {
  const successCallback = (data) => {
    console.log("完成计时" + data);
  };
  return <Counter time={5} success={successCallback} />;
}

storiesOf("计时器", module).add("Countdown", () => <Countdown />);
