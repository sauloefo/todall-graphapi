import Todo from 'todall';
import IStorage from './istorage';

export default class TodAllApi {
  constructor(private storage: IStorage) { }

  retrieveTodo() {
    return this.storage.retrieve();
  }

  saveTodo(todo: Todo): void {
    console.log('saveTodo: ', todo);
    this.storage.save(todo);
  }
}