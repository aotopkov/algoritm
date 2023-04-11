import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { delay, useInput } from "../../utils/utils";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { queue } from "./queue-class";

interface QueueState {
  list: string[];
  head: null | number;
  tail: null | number;
}

export const QueuePage: React.FC = () => {
  const { input, changeInput, setValue } = useInput({queue: ''});
  const [queueState, setQueueState] = useState<QueueState>({
    list: [],
    head: null,
    tail: null,
  });
  const [status, setStatus] = useState<{
    enqueue: boolean;
    dequeue: boolean;
    clear: boolean;
    status: ElementStates;
    index: number | null;
  }>({
    status: ElementStates.Default,
    index: null,
    enqueue: false,
    dequeue: false,
    clear: false,
  });

  useEffect(() => {
    queue.init();
    setQueueState({
      ...queueState,
      tail: queue.getTail(),
      head: queue.getHead(),
      list: queue.getQueue(),
    });
  }, []);

  async function addToQueue() {
    queue.enqueue(input.queue);
    setQueueState({
      ...queueState,
      tail: queue.getTail(),
      head: queue.getHead(),
      list: queue.getQueue(),
    });
    setStatus({
      ...status,
      status: ElementStates.Changing,
      index: queue.getTail(),
      enqueue: true,
    });
    setValue({queue: ''});
    await delay(SHORT_DELAY_IN_MS);
    setStatus({
      ...status,
      status: ElementStates.Default,
      index: null,
      enqueue: false,
    });
  }

  async function removeFromQueue() {
    queue.dequeue();
    setQueueState({
      ...queue,
      head: queue.getHead(),
      list: queue.getQueue(),
      tail: queue.getTail(),
    });
    setStatus({
      ...status,
      status: ElementStates.Changing,
      index: queue.getHead(),
      dequeue: true,
    });
    await delay(SHORT_DELAY_IN_MS);
    setStatus({
      ...status,
      status: ElementStates.Default,
      index: null,
      dequeue: false,
    });
  }

  async function clearQueue() {
    setStatus({ ...status, clear: true });
    await delay(SHORT_DELAY_IN_MS);
    queue.init();
    setQueueState({
      head: queue.getHead(),
      list: queue.getQueue(),
      tail: queue.getTail(),
    });
    setStatus({ ...status, clear: false });
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.menu_container}>
        <Input
          name="queue"
          maxLength={4}
          isLimitText={true}
          onChange={changeInput}
          value={input.queue}
        ></Input>
        <Button
          text="Добавить"
          onClick={addToQueue}
          disabled={input.queue && queueState.tail !== 6 ? false : true}
          isLoader={status.enqueue}
        ></Button>
        <Button
          text="Удалить"
          onClick={removeFromQueue}
          disabled={
            queueState.head == null ||
            queueState.tail == null ||
            queueState.head >= queueState.tail
              ? true
              : false
          }
          isLoader={status.dequeue}
        ></Button>
        <Button
          text="Очистить"
          onClick={clearQueue}
          extraClass="ml-40"
          disabled={queueState.tail === -1 ? true : false}
          isLoader={status.clear}
        ></Button>
      </div>
      <ul className={styles.list_container}>
        {queueState.list.map((elem, index) => {
          if (index === queueState.head && index !== queueState.tail) {
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
          if (index === queueState.tail && index !== queueState.head) {
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
          if (index === queueState.tail && index === queueState.head) {
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
