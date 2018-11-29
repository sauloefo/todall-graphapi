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
    return (obj.title)?todoType:personType;
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

class Person {
  constructor(public id: string, public name: String) { }
}

const personTypeName = 'PersonType';
const personType = new GraphQLObjectType({
  name: personTypeName,
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    name: {
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
    node: nodeField,
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
        const newPerson = new Person(id, args.name);
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
