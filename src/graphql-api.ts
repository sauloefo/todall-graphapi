import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} from 'graphql';
import TodAllApi from './todall-api';
import Todo from 'todall';
import InMemoryStorage from './in-memory-storage';

const storage = new InMemoryStorage();
const api = new TodAllApi(storage);

const todoType = new GraphQLObjectType({
  name: 'todo',
  fields: {
    title: {
      type: GraphQLString
    },
  }
});

const queryType = new GraphQLObjectType({
  name: 'query',
  fields: {
    getMessage: {
      type: GraphQLString,
      args: {
        name: {
          type: GraphQLString
        }
      },
      resolve: (source, args) => {
        return 'Hello World ' + args.name;
      }
    },
    retrieveTodo: {
      type: new GraphQLList(todoType),
      resolve: () => {
        return api.retrieveTodo();
      }
    }
  }
});

const mutationType = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    saveTodo: {
      type: GraphQLString,
      args: {
        title: {
          type: GraphQLString
        }
      },
      resolve: (source, args) => {
        api.saveTodo(new Todo(args.title));
        return args.title + ' saved!';
      }
    }
  }
});

export const schema = new GraphQLSchema({ 
  query: queryType,
  mutation: mutationType
});
