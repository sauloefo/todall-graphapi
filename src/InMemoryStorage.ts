import IStorage from './IStorage';
import Todo from './Todo';

export default class InMemoryStorage implements IStorage {
  private storage : Todo[] = [];

  save(todo: Todo) {
    this.storage.push(todo);
  }

  retrieve() {
    return this.storage;
  }
}