import { useState } from "react";

export function delay(millisec: number) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, millisec);
    })
}


export function useInput(inputs: any)  {
  const [values, setValue] = useState(inputs);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input: {value?: string} = e.target;
    setValue(input.value);
  };
  return { values, changeInput, setValue };
}