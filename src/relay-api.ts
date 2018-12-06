import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} from 'graphql';

import {
  nodeDefinitions,
  mutationWithClientMutationId,
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
    nodes: nodesField
  }
});

const baseType = {
  fields: {
    id: globalIdField()
  },
  interfaces: [nodeInterface]
};

const inputTypeBaseFields = {
  id: {
    type: GraphQLString
  }
}

const personTypeName = graphqlTypeSpec.person.name;
const personTypeMergedFields = Object.assign(
  {},
  baseType.fields,
  graphqlTypeSpec.person.fields
);
const personType = new GraphQLObjectType(Object.assign(
  {},
  baseType,
  graphqlTypeSpec.person,
  { fields: personTypeMergedFields }
));

const personInputTypeMergedFields = Object.assign(
  {},
  inputTypeBaseFields,
  graphqlTypeSpec.person.fields
);

const savePersonMutation = mutationWithClientMutationId({
  name: 'savePerson',
  inputFields: personInputTypeMergedFields,
  outputFields: {
    person: {
      type: personType,
      resolve: (payload) => payload.person
    }
  },
  mutateAndGetPayload: ({ name }) => {
    if (!storage[personTypeName]) {
      storage[personTypeName] = {};
    }
    const id = String(Object.keys(storage[personTypeName]).length);
    const newPerson = new models.Person(id, name);
    storage[personTypeName][id] = newPerson;
    return { person: newPerson };
  }
});

const todoTypeName = graphqlTypeSpec.todo.name;
const todoTypeMergedFields = Object.assign(
  {},
  baseType.fields,
  graphqlTypeSpec.todo.fields
);
const todoType = new GraphQLObjectType(Object.assign(
  {},
  baseType,
  graphqlTypeSpec.todo,
  { fields: todoTypeMergedFields }
));
const todoInputTypeMergedFields = Object.assign(
  {},
  inputTypeBaseFields,
  graphqlTypeSpec.todo.fields
);

const saveTodoMutation = mutationWithClientMutationId({
  name: 'saveTodo',
  inputFields: todoInputTypeMergedFields,
  outputFields: {
    todo: {
      type: todoType,
      resolve: (payload) => payload.todo
    }
  },
  mutateAndGetPayload: ({ title }) => {
    if (!storage[todoTypeName]) {
      storage[todoTypeName] = {};
    }
    const id = String(Object.keys(storage[todoTypeName]).length);
    const newTodo = new models.Todo(id, title);
    storage[todoTypeName][id] = newTodo;
    return { todo: newTodo };
  }
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    saveTodo: saveTodoMutation,
    savePerson: savePersonMutation
  })
});

const schema = new GraphQLSchema({ 
  query: queryType,
  mutation: mutationType
});

export default schema;
