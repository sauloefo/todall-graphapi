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

import * as models from './models';
import * as graphqlTypeSpec from './graphql-api-types';

type SObject = { id: string }
const storage: { [id: string]: { [id: string]: SObject } } = {};

const retrieveByGlobalId = (globalId: string) => {
  const {type, id} = fromGlobalId(globalId);
  return storage[type][id];
}

const typeResolver = (obj: any): GraphQLObjectType => {
  return (obj.title)?todoType:personType;
}

const { nodeInterface, nodeField, nodesField } = nodeDefinitions(
  retrieveByGlobalId,
  typeResolver
);

const typeBase = {
  interfaces: [nodeInterface]
};

const todoType = new GraphQLObjectType(Object.assign({}, typeBase, graphqlTypeSpec.todo));
const personType = new GraphQLObjectType(Object.assign({}, typeBase, graphqlTypeSpec.person));

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
    node: nodeField,
    nodes: nodesField,
    retrieveAllTodo: {
      type: new GraphQLList(todoType),
      resolve: () => {
        return Object.keys(storage[todoTypeName]).map(key => storage[todoTypeName][key]);
      }
    },
    retrieveAllPerson: {
      type: new GraphQLList(personType),
      resolve: () => {
        return Object.keys(storage[personTypeName]).map(key => storage[personTypeName][key]);
      }
    }
  }
});

const todoTypeName = graphqlTypeSpec.todo.name;
const personTypeName = graphqlTypeSpec.person.name;

console.log('todo', todoTypeName);
console.log('person', personTypeName);

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
        const newTodo = new models.Todo(id, args.title);
        storage[todoTypeName][id] = newTodo;
        return newTodo;
      }
    },
    savePerson: {
      type: personType,
      args: {
        name: {
          type: GraphQLString
        }
      },
      resolve: (source, args) => {
        if (!storage[personTypeName]) {
          storage[personTypeName] = {};
        }
        const id = String(Object.keys(storage[personTypeName]).length);
        const newPerson = new models.Person(id, args.name);
        storage[personTypeName][id] = newPerson;
        return newPerson;
      }
    }
  }
});

export const schema = new GraphQLSchema({ 
  query: queryType,
  mutation: mutationType
});
