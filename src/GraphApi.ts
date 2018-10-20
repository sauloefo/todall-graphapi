import { buildSchema } from 'graphql';
import TodAllApi from './TodAllApi';
import InMemoryStorage from './InMemoryStorage';

export const schema = buildSchema(`
  type Todo {
    title: String!
  }

  input TodoInput {
    title: String!
  }

  type Query {
    retrieve: [Todo!]!
  }

  type Mutation {
    save(todo: TodoInput): String
  }
`);

const storage = new InMemoryStorage();
const api = new TodAllApi(storage);

export const resolver = {
  retrieve: () => {
    return api.retrieveTodo();
  },
  save: (args: any): string => {
    api.saveTodo(args.todo);
    return '';
  }
}