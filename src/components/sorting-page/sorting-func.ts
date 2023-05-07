function swap(arr: number[], first: number, second: number) {
  let temp = arr[first];
  arr[first] = arr[second];
  arr[second] = temp;
}

export function sortArr(
  sortDirection: "Ascend" | "Descend" | null,
  arr: number[],
  method: "vote" | "bubble"
) {
  let array = arr;

  if (method === "vote") {
    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (sortDirection === "Ascend" && array[i] > array[j]) {
          swap(array, i, j);
        }
        if (sortDirection === "Descend" && array[i] < array[j]) {
          swap(array, i, j);
        }
      }
    }
  }
  if (method === "bubble") {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i; j++) {
        if (j + 1 < array.length - i) {
        }
        if (
          sortDirection === "Ascend" &&
          j + 1 < array.length &&
          array[j] > array[j + 1]
        ) {
          swap(array, j, j + 1);
        }
        if (
          sortDirection === "Descend" &&
          j + 1 < array.length &&
          array[j] < array[j + 1]
        ) {
          swap(array, j, j + 1);
        }
      }
    }
  }
  return array
}
