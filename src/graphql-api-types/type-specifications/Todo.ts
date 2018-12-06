import {
  GraphQLString
} from 'graphql';

const todoTypeSpec = {
  name: 'TodoType',
  fields: {
    title: {
      type: GraphQLString
    }
  }
}

export default todoTypeSpec;