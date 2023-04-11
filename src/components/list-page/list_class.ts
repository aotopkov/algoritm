export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
}

class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  private container: T[];
  constructor() {
    this.head = null;
    this.size = 0;
    this.container = [];
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Node(element);

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let prev = null;
        let currIndex = 0;

        while (currIndex < index && curr != null) {
          prev = curr;
          curr = curr.next;
          currIndex++;
        }
        if (prev != null) {
          prev.next = node;
          node.next = curr;
        }
      }

      this.size++;
    }
  }

  deleteAt(index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      let curr = this.head;
      let prev = null;
      let currIndex = 0;
      if (index - 1 === 0 && curr !== null && curr.next === null) {
        return (this.head = null);
      } else {
        while (currIndex < index - 1 && curr != null) {
          prev = curr;
          curr = curr.next;
          currIndex++;
        }
        if (prev != null && curr != null) {
          prev.next = curr.next;
        }
      }

      this.size--;
    }
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  prepend(element: T) {
    const node = new Node(element);
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  deleteHead() {
    if (this.head !== null) {
      if (this.head.next !== null) {
        let current = this.head.next;
        this.head = current;
      } else {
        this.head = null;
      }
    }
  }

  deleteTail() {
    if (this.head !== null) {
      let curr = this.head;
      let prev = curr;
      while (curr.next) {
        prev = curr;
        curr = curr.next;
      }
      prev.next = null;
    }
  }

  getSize() {
    return this.size;
  }

  toArray() {
    let curr = this.head;
    this.container = [];
    while (curr) {
      this.container.push(curr.value);
      curr = curr.next;
    }
    return this.container;
  }
}

export const list = new LinkedList<string>();

let rename = 'for git FileChanges'