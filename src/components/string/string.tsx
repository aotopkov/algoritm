import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay, useInput } from "../../utils/utils";

export const StringComponent: React.FC = () => {
  const { input, changeInput, setValue } = useInput({string: ''});
  const [string, setString] = useState<string>("");
  const [loader, setLoader] = useState(false);
  const [stringArr, setStringArr] = useState<string[]>([]);
  const [currIndex, setCurrIndex] = useState<number>(0);

  function changeColorCircle(arr: string[], currIndex: number, index: number) {
    if (currIndex === index || arr.length - 1 - currIndex === index) {
      return ElementStates.Changing;
    } else if (index < currIndex || arr.length - 1 - currIndex < index) {
      return ElementStates.Modified;
    }
  }

  // function handlerInput(e: React.ChangeEvent<HTMLInputElement>) {
  //   const value = e.target.value;
  //   setString(value);
  // }

  async function handlerClick() {
    setLoader(true);
    let temp: string[] = input.string.split("");
    setValue({string: ''});
    setStringArr(temp);

    let start = 0;
    let end = temp.length - 1;
    setCurrIndex(-1);
    await delay(DELAY_IN_MS);
    setCurrIndex(start);
    await delay(DELAY_IN_MS);

    while (start < end) {
      let head = temp[start];
      let tail = temp[end];
      temp[start] = tail;
      temp[end] = head;
      setStringArr(temp);
      start++;
      end--;
      setCurrIndex(start);
      await delay(DELAY_IN_MS);
    }
    start = start + end + 1;
    setCurrIndex(start);

    setLoader(false);
    
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.input_container}>
        <Input
          name="string"
          maxLength={11}
          isLimitText={true}
          onChange={changeInput}
          value={input.string}
        ></Input>
        <Button
          type="submit"
          text="Развернуть"
          onClick={handlerClick}
          isLoader={loader}
          disabled={!input.string}
        ></Button>
      </div>
      <div className={styles.circles_container}>
        <ul className={styles.circles_list}>
          {stringArr.map((elem, index) => {
            return (
              <li key={index}><Circle
                letter={elem}
                state={changeColorCircle(stringArr, currIndex, index)}
              ></Circle></li>
            );
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
