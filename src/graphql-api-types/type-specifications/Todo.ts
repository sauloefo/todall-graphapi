import {
  GraphQLString
} from 'graphql';

import {
  globalIdField,
} from 'graphql-relay';

const todoTypeSpec = {
  name: 'TodoType',
  fields: {
    id: globalIdField(),
    title: {
      type: GraphQLString
    }
  }
}

export default todoTypeSpec;