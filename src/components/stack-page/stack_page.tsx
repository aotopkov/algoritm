import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { delay, useInput } from "../../utils/utils_";
import { Circle } from "../ui/circle/circle";
import styles from "./stack.module.css";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { stack } from "./stack_class";

interface Status {
  state: ElementStates,
  push: boolean,
  pop: boolean,
  clear: boolean
}

export const StackPage: React.FC = () => {
  const [stackArr, setStackArr] = useState<string[]>([]);
  const { input, changeInput, setValue } = useInput({ stack: "" });
  const [status, setStatus] = useState<Status>({
    state: ElementStates.Default,
    push: false,
    pop: false,
    clear: false,
  });

  async function pushToStack() {
    stack.push(input.stack);
    setStackArr(stack.getElements());
    setStatus({...status, state: ElementStates.Changing, push: true});
    await delay(SHORT_DELAY_IN_MS);
    setStatus({...status, state: ElementStates.Default, push: false});
    setValue({ stack: "" });
  }

  async function popFromStack() {
    setStatus({...status, state: ElementStates.Changing, pop: true});
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setStackArr(stack.getElements());
    setStatus({...status, state: ElementStates.Default, pop: false});
  }

  async function clearStack() {
    setStatus({...status, clear: true})
    await delay(SHORT_DELAY_IN_MS)
    stack.clear();
    setStackArr(stack.getElements());
    setStatus({...status, clear: false})
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.menu_container}>
        <Input
          name="stack"
          maxLength={4}
          isLimitText={true}
          onChange={changeInput}
          value={input.stack}
        ></Input>
        <Button
          text="Добавить"
          onClick={pushToStack}
          disabled={input.stack ? false : true}
          isLoader={status.push}
        ></Button>
        <Button
          text="Удалить"
          onClick={popFromStack}
          disabled={stackArr.length ? false : true}
          isLoader={status.pop}
        ></Button>
        <Button
          text="Очистить"
          onClick={clearStack}
          extraClass="ml-40"
          disabled={stackArr.length ? false : true}
          isLoader={status.clear}
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
                    state={status.state}
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
