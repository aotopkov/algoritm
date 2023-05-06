import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./fibonacci.module.css";
import { delay } from "../../utils/utils_";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const [fiboArr, setFiboArr] = useState<number[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loader, setLoader] = useState(false);

  function handlerInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setCount(Number(value));
  }

  async function handlerClick() {
    setLoader(true);
    setFiboArr([]);

    let arr: number[] = [1, 1];
    for (let i = 2; i < count + 1; i++) {
      arr.push(arr[i - 2] + arr[i - 1]);
    }

    for (let i = 0; i < arr.length; i++) {
      setFiboArr((fiboArr) => [...fiboArr, arr[i]]);
      await delay(SHORT_DELAY_IN_MS);
    }

    setCount(0);
    setLoader(false);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.input_container}>
        <Input
          data-testId="input"
          name="value"
          max="19"
          isLimitText={true}
          type="number"
          onChange={handlerInput}
          value={count}
        ></Input>
        <Button
          data-testId="button"
          text="Рассчитать"
          onClick={handlerClick}
          isLoader={loader}
          disabled={
            Number(count) === null || Number(count) < 1 || Number(count) > 19
          }
        ></Button>
      </div>
      <div className={styles.circles_container}>
        <ul className={styles.circles_list}>
          {fiboArr.map((elem, index) => {
            return (
              <li key={index}>
                <Circle letter={String(elem)} index={index}></Circle>
              </li>
            );
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
