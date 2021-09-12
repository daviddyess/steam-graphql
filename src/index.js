import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';
import { api } from 'modules/config';
import { getLogger } from 'modules/logging';

const app = express();
const log = getLogger('app');

app.use(cors({ exposedHeaders: 'x-auth-token' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * GraphQL Middleware
 */
app.use(
  '/',
  graphqlHTTP(async (request, response) => ({
    schema: schema,
    context: {
      request,
      response
    },
    graphiql: { headerEditorEnabled: true }
  }))
);

/**
 * Start the Server
 */
app.listen(api.port, (err) => {
  if (err) {
    log.error(err.message);
    log.error(err.stack);
  }
  log.info(
    `Moody Crew GraphQL API Server listening on http://localhost:${api.port}!`
  );
});
