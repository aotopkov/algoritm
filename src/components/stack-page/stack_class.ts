interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  getElements: () => T[];
}

export class Stack<T> implements IStack<T> {
  container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.container.length) {
      this.container.pop();
    }
  };

  peak = (): T | null => {
    if (this.container.length) {
      return this.container[this.container.length - 1];
    }
    return null;
  };

  getSize = () => this.container.length;

  getElements = () => this.container


  clear = () => {
    this.container = [];
  };
}

export const stack = new Stack<string>();

let rename = 'for git FileChanges'
