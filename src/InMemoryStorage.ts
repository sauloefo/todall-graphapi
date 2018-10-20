import Todo from './Todo';

export default class InMemoryStorage {
  private storage : Todo[] = [];

  save(todo: Todo) {
    this.storage.push(todo);
  }

  retrieve() {
    return this.storage;
  }
}