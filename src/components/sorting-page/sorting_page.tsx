import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils_";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [method, setMethod] = useState<string>("vote");
  const [array, setArray] = useState<{ value: number; state: ElementStates }[]>(
    []
  );
  const [run, setRun] = useState<null | "Ascend" | "Descend">(null);

  function getRandomArr() {
    let length = Math.floor(Math.random() * (17 - 3) + 3);
    let randArr = [];
    for (let i = 1; i < length; i++) {
      randArr.push({
        value: Math.floor(Math.random() * 100),
        state: ElementStates.Default,
      });
    }
    setArray(randArr);
  }

  useEffect(() => {
    getRandomArr()
  }, [])

  function swap(
    arr: { value: number; state: ElementStates }[],
    first: number,
    second: number
  ) {
    let temp = arr[first].value;
    arr[first].value = arr[second].value;
    arr[second].value = temp;
  }

  function handlerClickAscend(e: React.BaseSyntheticEvent) {
    setRun("Ascend");
    sortArr("Ascend");
  }

  function handlerClickDescent(e: React.BaseSyntheticEvent) {
    setRun("Descend");
    sortArr("Descend");
  }

  async function sortArr(sortDirection: "Ascend" | "Descend" | null) {
    if (method === "vote") {
      for (let i = 0; i < array.length; i++) {
        array[i].state = ElementStates.Changing;
        setArray([...array]);
        for (let j = i + 1; j < array.length; j++) {
          array[j].state = ElementStates.Changing;
          setArray([...array]);
          await delay(SHORT_DELAY_IN_MS);
          if (sortDirection === "Ascend" && array[i].value > array[j].value) {
            swap(array, i, j);
          }
          if (sortDirection === "Descend" && array[i].value < array[j].value) {
            swap(array, i, j);
          }
          array[j].state = ElementStates.Default;
          setArray([...array]);
        }
        array[i].state = ElementStates.Modified;
        setArray([...array]);
        await delay(SHORT_DELAY_IN_MS);
      }
    }
    if (method === "bubble") {
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i; j++) {
          array[j].state = ElementStates.Changing;
          if (j + 1 < array.length - i) {
            array[j + 1].state = ElementStates.Changing;
          }
          setArray([...array]);
          await delay(SHORT_DELAY_IN_MS);
          if (
            sortDirection === "Ascend" &&
            j + 1 < array.length &&
            array[j].value > array[j + 1].value
          ) {
            swap(array, j, j + 1);
          }
          if (
            sortDirection === "Descend" &&
            j + 1 < array.length &&
            array[j].value < array[j + 1].value
          ) {
            swap(array, j, j + 1);
          }
          array[j].state = ElementStates.Default;
          if (j + 1 < array.length - i) {
            array[j + 1].state = ElementStates.Default;
          }
          setArray([...array]);
        }
        array[array.length - 1 - i].state = ElementStates.Modified;
        setArray([...array]);
        await delay(SHORT_DELAY_IN_MS);
      }
    }
    setRun(null);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.header_container}>
        <RadioInput
          label="Выбор"
          name="radio"
          checked
          onChange={() => {
            setMethod("vote");
          }}
        ></RadioInput>
        <RadioInput
          label="Пузырек"
          name="radio"
          onChange={() => {
            setMethod("bubble");
          }}
        ></RadioInput>

        <Button
          text="По возрастанию"
          sorting={Direction.Ascending}
          onClick={handlerClickAscend}
          disabled={run === "Descend" ? true : false}
          name={"Ascend"}
          isLoader={run === "Ascend" ? true : false}
        ></Button>
        <Button
          text="По убыванию"
          sorting={Direction.Descending}
          onClick={handlerClickDescent}
          disabled={run === "Ascend" ? true : false}
          value={"Descending"}
          isLoader={run === "Descend" ? true : false}
        ></Button>
        <Button
          text="Новый массив"
          onClick={getRandomArr}
          disabled={run === null ? false : true}
        ></Button>
      </div>
      <div className={styles.list_container}>
        <ul className={styles.list}>
          {array.map((elem, index) => {
            return (
              <li key={index}>
                <Column index={elem.value} state={elem.state}></Column>
              </li>
            );
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
