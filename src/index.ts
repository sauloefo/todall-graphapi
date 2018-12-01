require('pkginfo')(module, 'version');
const { version } = module.exports;
console.log(`Initializing TodALL GrapAPI version ${version}...`);

import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './relay-api';

const apiPath = `/v${version}`;
const apiPort = process.env.PORT || 4000;
const hostname = process.env.HOSTNAME || 'localhost';
const enableGraphiQL = Boolean(process.env.ENABLE_GRAPHIQL);

const enableCORS = function(req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};

const app = express()
  .use(enableCORS)
  .use(apiPath, graphqlHTTP({
    schema,
    graphiql: enableGraphiQL
  }));

const entryURL = `http://${hostname}:${apiPort}${apiPath}/`;

app.listen(apiPort)
  .on('listening', () => console.log(`TodALL GraphAPI (version ${version}) running on ${entryURL}.`))
  .on('error', error => console.error(
    `Failure to initialize TodALL GraphAPI (version ${version}) on ${entryURL}:`
    , error
  ));