import {
  GraphQLString
} from 'graphql';

const personTypeSpec = {
  name: 'PersonType',
  fields: {
    name: {
      type: GraphQLString
    }
  }
}

export default personTypeSpec;