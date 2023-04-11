import { useState } from "react";

export function delay(millisec: number) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, millisec);
    })
}

export function useInput(inputs: any)  {
  const [input, setValue] = useState(inputs);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setValue({...input, [name]: value});
  };
  return { input, changeInput, setValue };
}