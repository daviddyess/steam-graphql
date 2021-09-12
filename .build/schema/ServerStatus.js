"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.get = exports.ServerStatusDef = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _gamedig = _interopRequireDefault(require("gamedig"));

var _graphql = require("graphql");

var _graphQLTypes = require("../modules/graphQLTypes");

var _logging = require("../modules/logging");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _fields = {
  name: _graphQLTypes.name,
  map: _graphQLTypes.String,
  password: _graphQLTypes.Boolean,
  maxplayers: _graphQLTypes.Int,
  connect: _graphQLTypes.String,
  ping: _graphQLTypes.Int
};
var log = (0, _logging.getLogger)('ServerStatus');
/**
 * Server Player Raw Definition
 */

var ServerPlayerRawDef = new _graphql.GraphQLObjectType({
  name: 'ServerPlayerRaw',
  description: 'Server Player Raw definition',
  fields: function fields() {
    return {
      score: _graphQLTypes.Int,
      time: _graphQLTypes.Float
    };
  }
});
/**
 * Server Player Definition
 */

var ServerPlayerDef = new _graphql.GraphQLObjectType({
  name: 'ServerPlayer',
  description: 'Server Player definition',
  fields: function fields() {
    return {
      name: _graphQLTypes.name,
      raw: {
        type: ServerPlayerRawDef
      }
    };
  }
});
/**
 * Server Rules Definition
 */

var ServerRulesDef = new _graphql.GraphQLObjectType({
  name: 'ServerRules',
  description: 'Server Rules definition',
  fields: function fields() {
    return {
      bot_quota: _graphQLTypes.Int,
      gungame_enabled: _graphQLTypes.Int,
      mp_friendlyfire: _graphQLTypes.Int,
      sm_nextmap: _graphQLTypes.String
    };
  }
});
/**
 * Server Tags Definition
 */

var ServerTagsDef = new _graphql.GraphQLObjectType({
  name: 'ServerTags',
  description: 'Server Tags definition',
  fields: function fields() {
    return {
      tag: _graphQLTypes.String
    };
  }
});
/**
 * Server Raw Definition
 */

var ServerRawDef = new _graphql.GraphQLObjectType({
  name: 'ServerRawStatus',
  description: 'Server Raw Status definition',
  fields: function fields() {
    return {
      game: _graphQLTypes.String,
      numplayers: _graphQLTypes.Int,
      numbots: _graphQLTypes.Int,
      secure: _graphQLTypes.Int,
      tags: {
        type: new _graphql.GraphQLList(ServerTagsDef)
      },
      rules: {
        type: ServerRulesDef
      }
    };
  }
});
/**
 * Server Status Definition
 */

var ServerStatusDef = new _graphql.GraphQLObjectType({
  name: 'ServerStatus',
  description: 'Server Status definition',
  fields: function fields() {
    return _objectSpread(_objectSpread({}, _fields), {}, {
      raw: {
        type: ServerRawDef
      },
      players: {
        type: new _graphql.GraphQLList(ServerPlayerDef)
      },
      bots: {
        type: new _graphql.GraphQLList(ServerPlayerDef)
      }
    });
  }
});
exports.ServerStatusDef = ServerStatusDef;
var get = {
  type: ServerStatusDef,
  args: {
    host: _graphQLTypes.String,
    type: _graphQLTypes.String
  },
  resolve: function () {
    var _resolve = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
      var host, type, _server, _server$raw, server, tags, _server2, _server2$raw, _server2$raw$tags;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              host = _ref.host, type = _ref.type;
              _context.prev = 1;
              server = {};
              _context.next = 5;
              return _gamedig["default"].query({
                type: type,
                host: host,
                requestRules: true
              }).then(function (state) {
                server = state;
              })["catch"](function (error) {
                throw error;
              });

            case 5:
              tags = [];

              if (((_server = server) === null || _server === void 0 ? void 0 : (_server$raw = _server.raw) === null || _server$raw === void 0 ? void 0 : _server$raw.tags.length) > 0) {
                (_server2 = server) === null || _server2 === void 0 ? void 0 : (_server2$raw = _server2.raw) === null || _server2$raw === void 0 ? void 0 : (_server2$raw$tags = _server2$raw.tags) === null || _server2$raw$tags === void 0 ? void 0 : _server2$raw$tags.forEach(function (tag) {
                  tags.push({
                    tag: tag
                  });
                });
              }

              if (tags.length > 0) {
                server.raw.tags = tags;
              }

              log.info(JSON.stringify(server));
              return _context.abrupt("return", server);

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](1);
              log.error(_context.t0.message);
              log.error(_context.t0.stack);

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 12]]);
    }));

    function resolve(_x, _x2) {
      return _resolve.apply(this, arguments);
    }

    return resolve;
  }()
};
exports.get = get;
var ServerStatus = {
  get: get,
  ServerStatusDef: ServerStatusDef
};
var _default = ServerStatus;
exports["default"] = _default;