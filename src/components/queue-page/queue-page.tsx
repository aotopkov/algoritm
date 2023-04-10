import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { delay, useInput } from "../../utils/utils";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

interface QueueState {
  list: string[];
  head: null | number;
  tail: null | number;
}

export const QueuePage: React.FC = () => {
  const { values, changeInput, setValue } = useInput("");
  const [queue, setQueue] = useState<QueueState>({
    list: [],
    head: null,
    tail: null,
  });
  const [status, setStatus] = useState<{
    status: ElementStates;
    index: number | null;
  }>({ status: ElementStates.Default, index: null });

  function initQueue() {
    let tempArr = [];
    for (let i = 0; i < 7; i++) {
      tempArr.push("");
    }
    setQueue({ list: tempArr, head: null, tail: null });
  }

  useEffect(() => {
    initQueue();
  }, []);

  async function addToQueue() {
    let tempArr = queue.list;
    if (queue.tail === null) {
      tempArr[0] = values;
      setQueue({ ...queue, tail: 0, head: 0, list: tempArr });
      setStatus({ status: ElementStates.Changing, index: 0 });
      await delay(SHORT_DELAY_IN_MS);
    }
    if (queue.tail !== null) {
      tempArr[queue.tail + 1] = values;
      setQueue({ ...queue, tail: queue.tail + 1, list: tempArr });
      setStatus({ status: ElementStates.Changing, index: queue.tail + 1 });
      await delay(SHORT_DELAY_IN_MS);
    }
    setStatus({ status: ElementStates.Default, index: null });
    setValue("");
  }

  async function removeFromQueue() {
    let tempArr = queue.list;
    if (queue.head !== null) {
      tempArr[queue.head] = "";
      setQueue({ ...queue, head: queue.head + 1, list: tempArr });
      setStatus({ status: ElementStates.Changing, index: queue.head + 1 });
      await delay(SHORT_DELAY_IN_MS);
      setStatus({ status: ElementStates.Default, index: null });
    }
  }

  function clearQueue() {
    initQueue();
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.menu_container}>
        <Input
          maxLength={4}
          isLimitText={true}
          onChange={changeInput}
          value={values}
        ></Input>
        <Button
          text="Добавить"
          onClick={addToQueue}
          disabled={values && queue.tail !== 6 ? false : true}
        ></Button>
        <Button
          text="Удалить"
          onClick={removeFromQueue}
          disabled={
            queue.head == null || queue.tail == null || queue.head >= queue.tail
              ? true
              : false
          }
        ></Button>
        <Button
          text="Очистить"
          onClick={clearQueue}
          extraClass="ml-40"
          disabled={queue.tail ? false : true}
        ></Button>
      </div>
      <ul className={styles.list_container}>
        {queue.list.map((elem, index) => {
          if (index === queue.head && index !== queue.tail) {
            return (
              <li key={index}>
                <Circle
                  index={index}
                  letter={elem}
                  head="head"
                  state={
                    status.index === index
                      ? status.status
                      : ElementStates.Default
                  }
                ></Circle>
              </li>
            );
          }
          if (index === queue.tail && index !== queue.head) {
            return (
              <li key={index}>
                <Circle
                  index={index}
                  letter={elem}
                  tail="tail"
                  state={
                    status.index === index
                      ? status.status
                      : ElementStates.Default
                  }
                ></Circle>
              </li>
            );
          }
          if (index === queue.tail && index === queue.head) {
            return (
              <li key={index}>
                <Circle
                  index={index}
                  letter={elem}
                  head="head"
                  tail="tail"
                  state={
                    status.index === index
                      ? status.status
                      : ElementStates.Default
                  }
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
