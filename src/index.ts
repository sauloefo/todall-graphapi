require('pkginfo')(module, 'version');
const { version } = module.exports;
console.log(`Initializing TodALL GrapAPI version ${version}...`);

import express from 'express';
import graphqlHTTP from 'express-graphql';
import { schema, resolver } from './GraphApi';

const apiPath = `v${version}`;
const apiPort = process.env.PORT || 4000;
const hostname = process.env.HOSTNAME || 'localhost';
const enableGraphiQL = Boolean(process.env.ENABLE_GRAPHIQL);

const app = express();
app.use('/' + apiPath, graphqlHTTP({
  schema, 
  rootValue: resolver,
  graphiql: enableGraphiQL
}));

const runningURL = `http://${hostname}:${apiPort}/${apiPath}/`;

app.listen(apiPort)
  .on('listening', () => console.log(`TodALL GraphAPI (version ${version}) running on ${runningURL}.`))
  .on('error', error => console.error(
    `Failure to initialize TodALL GraphAPI (version ${version}) on ${runningURL}:`
    , error
  ));