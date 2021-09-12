import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import Statistics from 'schema/Stat';
import ServerStatus from 'schema/ServerStatus';

const QueryRoot = new GraphQLObjectType({
  name: 'Query',
  description: 'GraphQL Queries',
  fields: {
    player: Statistics.getPlayer,
    server: ServerStatus.get,
    players: Statistics.getPlayers
  }
});

/* const MutationRoot = new GraphQLObjectType({
  name: 'Mutation',
  description: 'GraphQL Mutations',
  fields: {}
});*/

const schema = new GraphQLSchema({
  /* mutation: MutationRoot,*/ query: QueryRoot
});

export default schema;
