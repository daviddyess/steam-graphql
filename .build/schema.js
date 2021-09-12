"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _Stat = _interopRequireDefault(require("./schema/Stat"));

var _ServerStatus = _interopRequireDefault(require("./schema/ServerStatus"));

var QueryRoot = new _graphql.GraphQLObjectType({
  name: 'Query',
  description: 'GraphQL Queries',
  fields: {
    player: _Stat["default"].getPlayer,
    server: _ServerStatus["default"].get,
    players: _Stat["default"].getPlayers
  }
});
/* const MutationRoot = new GraphQLObjectType({
  name: 'Mutation',
  description: 'GraphQL Mutations',
  fields: {}
});*/

var schema = new _graphql.GraphQLSchema({
  /* mutation: MutationRoot,*/
  query: QueryRoot
});
var _default = schema;
exports["default"] = _default;