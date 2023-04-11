import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./list.module.css";
import { Circle } from "../ui/circle/circle";
import { delay, useInput } from "../../utils/utils";
import { list } from "./list-class";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const ListPage: React.FC = () => {
  const { input, changeInput, setValue } = useInput({ value: "", index: 0 });
  const [listState, setListState] = useState<string[]>([]);
  const [status, setStatus] = useState({
    append: false,
    prepend: false,
    deleteHead: false,
    deleteTail: false,
    insertAt: false,
    deleteAt: false,
    done: false,
    value: "",
    index: NaN,
  });

  function getRandomList() {
    let length = Math.floor(Math.random() * (6 - 2) + 2);
    for (let i = 1; i < length; i++) {
      list.append(String(Math.floor(Math.random() * 100)));
    }
    setListState(list.toArray());
  }

  useEffect(() => {
    getRandomList();
  }, []);

  async function insertNode(method: "append" | "prepend") {
    setStatus({
      ...status,
      prepend: method === "prepend" ? true : false,
      append: method === "append" ? true : false,
      value: input.value,
    });
    await delay(SHORT_DELAY_IN_MS);
    method === "prepend" ? list.prepend(input.value) : list.append(input.value);
    setListState(list.toArray());
    setValue({ value: "" });
    setStatus((status) => ({
      ...status,
      value: "",
      done: true,
    }));
    await delay(SHORT_DELAY_IN_MS);
    setStatus({
      ...status,
      append: false,
      prepend: false,
      done: false,
    });
  }

  async function deleteNode(method: "head" | "tail") {
    setStatus({
      ...status,
      deleteHead: method === "head" ? true : false,
      deleteTail: method === "tail" ? true : false,
      value: method === "head" ? listState[0] : listState[listState.length - 1],
    });
    await delay(SHORT_DELAY_IN_MS);
    method === "head" ? list.deleteHead() : list.deleteTail();
    setListState(list.toArray());
    setStatus({ ...status, deleteHead: false, deleteTail: false, value: "" });
  }

  async function fromIndex(method: "insert" | "delete") {
    for (let i = 0; i < input.index; i++) {
      setStatus({
        ...status,
        index: i,
        insertAt: method === "insert" ? true : false,
        deleteAt: method === "delete" ? true : false,
        value: method === "insert" ? input.value : listState[i],
      });
      await delay(SHORT_DELAY_IN_MS);
    }
    method === "insert"
      ? list.insertAt(input.value, input.index)
      : list.deleteAt(input.index);
    setListState(list.toArray());
    setStatus((status) => ({
      ...status,
      insertAt: false,
      deleteAt: false,
      done: true,
    }));
    await delay(SHORT_DELAY_IN_MS);
    setStatus({ ...status, done: false, index: NaN });
    setValue({ value: "", index: 0 });
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.input_container}>
        <div className={styles.input}>
          <Input
            name="value"
            maxLength={4}
            isLimitText={true}
            onChange={changeInput}
            placeholder="Введите значение"
            value={input.value}
          ></Input>
        </div>
        <Button
          text="Добавить в head"
          linkedList={"small"}
          onClick={() => insertNode("prepend")}
          isLoader={status.prepend}
          disabled={input.value === "" ? true : false}
        ></Button>
        <Button
          text="Добавить в tail"
          linkedList={"small"}
          onClick={() => insertNode("append")}
          isLoader={status.append}
          disabled={input.value === "" ? true : false}
        ></Button>
        <Button
          text="Удалить из head"
          linkedList={"small"}
          onClick={() => deleteNode("head")}
          isLoader={status.deleteHead}
          disabled={!listState.length}
        ></Button>
        <Button
          text="Удалить из tail"
          linkedList={"small"}
          onClick={() => deleteNode("tail")}
          isLoader={status.deleteTail}
          disabled={listState.length === 1 || !listState.length}
        ></Button>
      </div>
      <div className={styles.input_container}>
        <div className={styles.input}>
          <Input
            type="number"
            placeholder="Введите индекс"
            name="index"
            value={input.index}
            onChange={changeInput}
            max={listState.length}
          ></Input>
        </div>
        <Button
          linkedList={"big"}
          text="Добавить по индексу"
          onClick={() => fromIndex("insert")}
          disabled={input.index < 1 || input.value === "" ? true : false}
        ></Button>
        <Button
          onClick={() => fromIndex("delete")}
          linkedList={"big"}
          text="Удалить по индексу"
          disabled={input.index < 1 ? true : false}
        ></Button>
      </div>
      <ul className={styles.list}>
        {listState.map((elem, index) => {
          let value = String(elem);
          return (
            <li key={index} className={styles.list_item}>
              <Circle
                letter={
                  (index === 0 && status.deleteHead) ||
                  (index === listState.length - 1 && status.deleteTail)
                    ? ""
                    : value
                }
                head={
                  (index === 0 && status.prepend && !status.done) ||
                  (index === listState.length - 1 &&
                    status.append &&
                    !status.done) ||
                  (index === status.index && status.insertAt) ? (
                    <Circle
                      letter={status.value}
                      isSmall={true}
                      state={ElementStates.Changing}
                    ></Circle>
                  ) : (
                    "" || (index === 0 ? "head" : "")
                  )
                }
                tail={
                  (index === 0 && status.deleteHead) ||
                  (index === listState.length - 1 && status.deleteTail) ||
                  (index === status.index && status.deleteAt) ? (
                    <Circle
                      letter={status.value}
                      isSmall={true}
                      state={ElementStates.Changing}
                    ></Circle>
                  ) : (
                    "" ||
                    (index === listState.length - 1 && listState.length !== 1
                      ? "tail"
                      : "")
                  )
                }
                state={
                  status.done
                    ? (index === 0 && status.prepend) ||
                      index === status.index + 1 ||
                      (index === listState.length - 1 && status.append)
                      ? ElementStates.Modified
                      : ElementStates.Default
                    : index < status.index
                    ? ElementStates.Changing
                    : undefined
                }
              ></Circle>
              {index !== listState.length - 1 && <ArrowIcon></ArrowIcon>}
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
