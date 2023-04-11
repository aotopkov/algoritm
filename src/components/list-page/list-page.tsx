import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./list.module.css";
import { Circle } from "../ui/circle/circle";

interface Node {
  value: string;
  next: Node | null;
}

export const ListPage: React.FC = () => {
  const [head, setHead] = useState<Node>({
    value: '0',
    next: { value: '34', next: { value: '8', next: { value: '0', next: null } } },
  });

  let curr = head

  return (
    <SolutionLayout title="Связный список">
    {/* //   <div className={styles.input_container}>
    //     <div className={styles.input}>
    //       <Input */}
    {/* //         maxLength={4}
    //         isLimitText={true}
    //         placeholder="Введите значение"
    //       ></Input>
    //     </div> */}
    {/* //     <Button text="Добавить в head" linkedList={"small"}></Button>
    //     <Button text="Добавить в tail" linkedList={"small"}></Button>
    //     <Button text="Удалить из head" linkedList={"small"}></Button>
    //     <Button text="Удалить из tail" linkedList={"small"}></Button>
    //   </div> */}
    {/* //   <div className={styles.input_container}>
    //     <div className={styles.input}>
    //       <Input placeholder="Введите индекс"></Input>
    //     </div>
    //     <Button linkedList={"big"} text="Добавить по индексу"></Button>
    //     <Button linkedList={"big"} text="Удалить по индексу"></Button>
    //   </div>
    //   <div>

    //     { while(curr) { */}
    {/* //       return (<><Circle letter={curr.value}></Circle></>)}
    //     }
    //   </div> */}
    </SolutionLayout>
  );
};
