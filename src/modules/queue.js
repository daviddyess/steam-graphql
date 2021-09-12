export default class Queue {
  constructor() {
    this.list = [];
    this.task = {
      current: 0,
      name: null
    };
    this.start = false;
    this.complete = false;
  }

  add(options = {}) {
    if (Array.isArray(options)) {
      options.forEach((option) => {
        this.list.push(option);
      });
    } else {
      this.list.push(options);
    }
  }

  next() {
    return ++this.task.current;
  }

  start() {
    this.start = true;
    return this.task.current;
  }

  jump(task) {
    this.task.current = task;
  }
}
