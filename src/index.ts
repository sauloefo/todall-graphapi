require('pkginfo')(module, 'version');
const { version } = module.exports;
console.log(`Initializing TodALL GrapAPI version ${version}...`);

import express from 'express';
import graphqlHTTP from 'express-graphql';
import { schema, resolver } from './GraphApi';

// TODO: convert const below to environment variables or arg parameters
const apiPath = `v${version}`;
const apiPort = 4000;
const enableGraphiQL = true;

const app = express();
app.use('/' + apiPath, graphqlHTTP({
  schema, 
  rootValue: resolver,
  graphiql: enableGraphiQL
}));

const runningURL = `http://localhost:${apiPort}/${apiPath}/`;

app.listen(apiPort)
  .on('listening', () => console.log(`TodALL GraphAPI (version ${version}) running on ${runningURL}.`))
  .on('error', error => console.error(
    `Failure to initialize TodALL GraphAPI (version ${version}) on ${runningURL}:`
    , error
  ));