import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { delay, useInput } from "../../utils/utils";
import { Circle } from "../ui/circle/circle";
import styles from "./stack.module.css";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { stack } from "./stack-class";

export const StackPage: React.FC = () => {
  const [stackArr, setStackArr] = useState<string[]>([]);
  const { values, changeInput, setValue } = useInput("");
  const [status, setStatus] = useState<ElementStates>(ElementStates.Default);
  

  async function pushToStack() {
    stack.push(values)
    setStackArr(stack.getElements());
    setStatus(ElementStates.Changing);
    await delay(SHORT_DELAY_IN_MS);
    setStatus(ElementStates.Default);
    setValue("");
  }

  async function popFromStack() {
    setStatus(ElementStates.Changing);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop()
    setStackArr(stack.getElements());
    setStatus(ElementStates.Default);
  }

  function clearStack() {
    stack.clear()
    setStackArr(stack.getElements());
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
          disabled={stackArr.length ? false : true}
        ></Button>
        <Button
          text="Очистить"
          onClick={clearStack}
          extraClass="ml-40"
          disabled={stackArr.length ? false : true}
        ></Button>
      </div>
      <ul className={styles.list_container}>
        {stack != null &&
          stackArr.map((elem, index, array) => {
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
