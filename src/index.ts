import Todo from './Todo';
import InMemoryStorage from './InMemoryStorage';

const storage = new InMemoryStorage();

storage.save(new Todo('Todo 1'));
storage.save(new Todo('Todo 2'));
storage.save(new Todo('Todo 3'));

console.log(storage.retrieve());