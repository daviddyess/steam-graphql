/* eslint-disable camelcase */
import Gamedig from 'gamedig';
import { GraphQLList, GraphQLObjectType } from 'graphql';
/* Import Types as Fields */
import {
  name,
  String as map,
  Boolean as password,
  String as game,
  Int as numplayers,
  Int as numbots,
  Int as secure,
  String as tag,
  Int as bot_quota,
  Int as gungame_enabled,
  Int as mp_friendlyfire,
  Int as maxplayers,
  Int as score,
  Float as time,
  String as connect,
  Int as ping,
  String as sm_nextmap,
  String as host,
  String as type
} from 'modules/graphQLTypes';
import { getLogger } from 'modules/logging';

const fields = {
  name,
  map,
  password,
  maxplayers,
  connect,
  ping
};

const log = getLogger('ServerStatus');
/**
 * Server Player Raw Definition
 */
const ServerPlayerRawDef = new GraphQLObjectType({
  name: 'ServerPlayerRaw',
  description: 'Server Player Raw definition',
  fields: () => ({
    score,
    time
  })
});
/**
 * Server Player Definition
 */
const ServerPlayerDef = new GraphQLObjectType({
  name: 'ServerPlayer',
  description: 'Server Player definition',
  fields: () => ({
    name,
    raw: { type: ServerPlayerRawDef }
  })
});
/**
 * Server Rules Definition
 */
const ServerRulesDef = new GraphQLObjectType({
  name: 'ServerRules',
  description: 'Server Rules definition',
  fields: () => ({
    bot_quota,
    gungame_enabled,
    mp_friendlyfire,
    sm_nextmap
  })
});
/**
 * Server Tags Definition
 */
const ServerTagsDef = new GraphQLObjectType({
  name: 'ServerTags',
  description: 'Server Tags definition',
  fields: () => ({
    tag
  })
});
/**
 * Server Raw Definition
 */
const ServerRawDef = new GraphQLObjectType({
  name: 'ServerRawStatus',
  description: 'Server Raw Status definition',
  fields: () => ({
    game,
    numplayers,
    numbots,
    secure,
    tags: { type: new GraphQLList(ServerTagsDef) },
    rules: { type: ServerRulesDef }
  })
});
/**
 * Server Status Definition
 */

export const ServerStatusDef = new GraphQLObjectType({
  name: 'ServerStatus',
  description: 'Server Status definition',
  fields: () => ({
    ...fields,
    raw: { type: ServerRawDef },
    players: { type: new GraphQLList(ServerPlayerDef) },
    bots: { type: new GraphQLList(ServerPlayerDef) }
  })
});
export const get = {
  type: ServerStatusDef,
  args: {
    host,
    type
  },
  resolve: async (_, { host, type }) => {
    try {
      let server = {};

      await Gamedig.query({
        type,
        host,
        requestRules: true
      })
        .then((state) => {
          server = state;
        })
        .catch((error) => {
          throw error;
        });

      const tags = [];

      if (server?.raw?.tags.length > 0) {
        server?.raw?.tags?.forEach((tag) => {
          tags.push({ tag });
        });
      }
      if (tags.length > 0) {
        server.raw.tags = tags;
      }
      log.info(JSON.stringify(server));
      return server;
    } catch (error) {
      log.error(error.message);
      log.error(error.stack);
    }
  }
};

const ServerStatus = {
  get,
  ServerStatusDef
};

export default ServerStatus;
