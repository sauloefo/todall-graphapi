import IStorage from './an-interface';
import Todo from 'todall';

export default class InMemoryStorage implements IStorage {
  private storage : Todo[] = [];

  save(todo: Todo) {
    this.storage.push(todo);
  }

  retrieve() {
    return this.storage;
  }
}