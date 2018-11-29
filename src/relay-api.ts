import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} from 'graphql';

import {
  nodeDefinitions,
  globalIdField,
  fromGlobalId
} from 'graphql-relay';

type SObject = { id: string }

const storage: { [id: string]: { [id: string]: SObject } } = {};

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    return storage[type][id];
  },
  (obj): GraphQLObjectType => {
    return todoType;
  }
);

class Todo {
  constructor(public id: string, public title: String) { }
}

const todoTypeName = 'TodoType';
const todoType = new GraphQLObjectType({
  name: todoTypeName,
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    title: {
      type: GraphQLString
    }
  })
});

const queryType = new GraphQLObjectType({
  name: 'Query',
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
    retrieveAll: {
      type: new GraphQLList(todoType),
      resolve: () => {
        return Object.keys(storage[todoTypeName]).map(key => storage[todoTypeName][key]);
      }
    },
    node: nodeField
  }
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    saveTodo: {
      type: todoType,
      args: {
        title: {
          type: GraphQLString
        }
      },
      resolve: (source, args) => {
        if (!storage[todoTypeName]) {
          storage[todoTypeName] = {};
        }
        const id = String(Object.keys(storage[todoTypeName]).length);
        const newTodo = new Todo(id, args.title);
        storage[todoTypeName][id] = newTodo;
        return newTodo;
      }
    }
  }
});

export const schema = new GraphQLSchema({ 
  query: queryType,
  mutation: mutationType
});
