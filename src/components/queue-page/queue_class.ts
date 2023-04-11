interface IQueue<T> {
  enqueue: (item: string) => void;
  dequeue: () => void;
  peak: () => string | null;
  getQueue: () => string[];
}

export class Queue<T> implements IQueue<T> {
  private container: string[] = [];
  private head = -1;
  private tail = -1;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array();
  }

  init = () => {
    this.container = [];
    this.head = -1;
    this.tail = -1;
    for (let i = 0; i < this.size; i++) {
      this.container.push("");
    }
  };

  enqueue = (item: string) => {
    if (this.length >= this.size + 1) {
      throw new Error("Maximum length exceeded");
    }
    this.tail++;
    this.container[this.tail] = item;
    this.length++;
    if (this.head === -1) {
      this.head++;
    }
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head] = "";
    this.head++;
    this.length--;
  };

  peak = (): string | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[0];
  };

  isEmpty = () => this.length === 0;

  getQueue = () => this.container;

  getHead = () => this.head;

  getTail = () => this.tail;

  clear = () => (this.container = []);
}

export const queue = new Queue<string>(7);

let rename = 'for git FileChanges'
