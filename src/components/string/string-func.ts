export function reverseString(str: string) {
    let temp: string[] | string = str.split("");


    let start = 0;
    let end = temp.length - 1;

    while (start < end) {
      let head = temp[start];
      let tail = temp[end];
      temp[start] = tail;
      temp[end] = head;

      start++;
      end--;
    }

    temp = temp.join('')
    return temp
  }

