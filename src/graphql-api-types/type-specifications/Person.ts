import {
  GraphQLString
} from 'graphql';

import {
  globalIdField,
} from 'graphql-relay';

const personTypeSpec = {
  name: 'PersonType',
  fields: {
    id: globalIdField(),
    name: {
      type: GraphQLString
    }
  }
}

export default personTypeSpec;