import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { delay, useInput } from "../../utils/utils";
import { Circle } from "../ui/circle/circle";
import styles from "./stack.module.css";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {
  const [stack, setStack] = useState<string[]>([]);
  const { values, changeInput, setValue } = useInput("");
  const [status, setStatus] = useState<ElementStates>(ElementStates.Default);

  async function pushToStack() {
    if (stack === null) {
      setStack([values]);
    } else {
      setStack([...stack, values]);
    }
    setStatus(ElementStates.Changing);
    await delay(SHORT_DELAY_IN_MS);
    setStatus(ElementStates.Default);
    setValue("");
  }

  async function popFromStack() {
    setStatus(ElementStates.Changing);
    await delay(SHORT_DELAY_IN_MS);
    let tempArr = stack;
    tempArr.pop();
    setStack(tempArr);
    setStatus(ElementStates.Default);
  }

  function clearStack() {
    setStack([]);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.menu_container}>
        <Input
          maxLength={4}
          isLimitText={true}
          onChange={changeInput}
          value={values}
        ></Input>
        <Button
          text="Добавить"
          onClick={pushToStack}
          disabled={values ? false : true}
        ></Button>
        <Button
          text="Удалить"
          onClick={popFromStack}
          disabled={stack?.length ? false : true}
        ></Button>
        <Button
          text="Очистить"
          onClick={clearStack}
          extraClass="ml-40"
          disabled={stack?.length ? false : true}
        ></Button>
      </div>
      <ul className={styles.list_container}>
        {stack != null &&
          stack.map((elem, index, array) => {
            if (index === array.length - 1) {
              return (
                <li key={index}>
                  <Circle
                    index={index}
                    letter={elem}
                    head="TOP"
                    state={status}
                  ></Circle>
                </li>
              );
            } else {
              return (
                <li key={index}>
                  <Circle index={index} letter={elem}></Circle>
                </li>
              );
            }
          })}
      </ul>
    </SolutionLayout>
  );
};
