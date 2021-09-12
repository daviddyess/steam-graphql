"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getPlayers = exports.getPlayer = exports.StatNode = exports.StatDef = exports.PlayerDef = exports.PlayerStatsDef = exports.SteamPlayerDef = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _steamWebAsync = _interopRequireDefault(require("steam-web-async"));

var _steamid = _interopRequireDefault(require("steamid"));

var _graphql = require("graphql");

var _StatService = _interopRequireDefault(require("../services/StatService"));

var _config = _interopRequireDefault(require("../modules/config"));

var _logging = require("../modules/logging");

var _graphQLTypes = require("../modules/graphQLTypes");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _fields = {
  id: _graphQLTypes.id,
  name: _graphQLTypes.name,
  steam: _graphQLTypes.steam,
  lastip: _graphQLTypes.lastip,
  connected: _graphQLTypes.connected,
  lastconnect: _graphQLTypes.lastconnect,
  deaths: _graphQLTypes.deaths,
  score: _graphQLTypes.score,
  kills: _graphQLTypes.kills,
  shots: _graphQLTypes.shots,
  hits: _graphQLTypes.hits,
  headshots: _graphQLTypes.headshots,
  suicides: _graphQLTypes.suicides,
  tk: _graphQLTypes.tk,
  rounds_tr: _graphQLTypes.rounds_tr,
  rounds_ct: _graphQLTypes.rounds_ct,
  knife: _graphQLTypes.knife,
  glock: _graphQLTypes.glock,
  usp: _graphQLTypes.usp,
  p228: _graphQLTypes.p228,
  deagle: _graphQLTypes.deagle,
  elite: _graphQLTypes.elite,
  fiveseven: _graphQLTypes.fiveseven,
  m3: _graphQLTypes.m3,
  xm1014: _graphQLTypes.xm1014,
  mac10: _graphQLTypes.mac10,
  tmp: _graphQLTypes.tmp,
  mp5navy: _graphQLTypes.mp5navy,
  ump45: _graphQLTypes.ump45,
  p90: _graphQLTypes.p90,
  galil: _graphQLTypes.galil,
  ak47: _graphQLTypes.ak47,
  sg550: _graphQLTypes.sg550,
  famas: _graphQLTypes.famas,
  m4a1: _graphQLTypes.m4a1,
  aug: _graphQLTypes.aug,
  scout: _graphQLTypes.scout,
  sg552: _graphQLTypes.sg552,
  awp: _graphQLTypes.awp,
  g3sg1: _graphQLTypes.g3sg1,
  m249: _graphQLTypes.m249,
  hegrenade: _graphQLTypes.hegrenade,
  flashbang: _graphQLTypes.flashbang,
  smokegrenade: _graphQLTypes.smokegrenade,
  head: _graphQLTypes.head,
  chest: _graphQLTypes.chest,
  stomach: _graphQLTypes.stomach,
  left_arm: _graphQLTypes.left_arm,
  right_arm: _graphQLTypes.right_arm,
  left_leg: _graphQLTypes.left_leg,
  right_leg: _graphQLTypes.right_leg,
  c4_planted: _graphQLTypes.c4_planted,
  c4_exploded: _graphQLTypes.c4_exploded,
  c4_defused: _graphQLTypes.c4_defused,
  ct_win: _graphQLTypes.ct_win,
  tr_win: _graphQLTypes.tr_win,
  hostages_rescued: _graphQLTypes.hostages_rescued
};
var log = (0, _logging.getLogger)('Statistics');
/**
 * Steam Definition
 */

var SteamPlayerDef = new _graphql.GraphQLObjectType({
  name: 'SteamPlayer',
  description: 'Steam Player definition',
  fields: function fields() {
    return {
      steamid: _graphQLTypes.String,
      personaname: _graphQLTypes.String,
      profileurl: _graphQLTypes.String,
      avatar: _graphQLTypes.String,
      avatarmedium: _graphQLTypes.String,
      lastlogoff: _graphQLTypes.Int,
      realname: _graphQLTypes.String,
      primaryclanid: _graphQLTypes.String,
      timecreated: _graphQLTypes.Int,
      loccountrycode: _graphQLTypes.String,
      locstatecode: _graphQLTypes.String
    };
  }
});
/**
 * Player Stats Definition
 */

exports.SteamPlayerDef = SteamPlayerDef;
var PlayerStatsDef = new _graphql.GraphQLObjectType({
  name: 'PlayerStats',
  description: 'Player Stats definition',
  fields: function fields() {
    return _objectSpread({}, _fields);
  }
});
/**
 * Player Definition
 */

exports.PlayerStatsDef = PlayerStatsDef;
var PlayerDef = new _graphql.GraphQLObjectType({
  name: 'PlayerStatistics',
  description: 'Player Statistics definition',
  fields: function fields() {
    return {
      steam: {
        type: SteamPlayerDef
      },
      stats: {
        type: PlayerStatsDef
      }
    };
  }
});
/**
 * Statistics Definition
 */

exports.PlayerDef = PlayerDef;
var StatDef = new _graphql.GraphQLObjectType({
  name: 'Statistics',
  description: 'Statistics definition',
  fields: function fields() {
    return {
      id: _graphQLTypes.id,
      steam: _graphQLTypes.steam,
      name: _graphQLTypes.name,
      score: _graphQLTypes.score,
      kills: _graphQLTypes.kills,
      deaths: _graphQLTypes.deaths,
      connected: _graphQLTypes.connected
    };
  }
});
/**
 * Statistics Node
 *
 * List definition for requesting Statisticss
 */

exports.StatDef = StatDef;
var StatNode = new _graphql.GraphQLObjectType({
  name: 'StatNode',
  description: 'Statistics Node',
  fields: function fields() {
    return {
      storage: _graphQLTypes.storage,
      totalCount: _graphQLTypes.totalCount,
      count: _graphQLTypes.count,
      nodes: {
        type: new _graphql.GraphQLList(StatDef)
      }
    };
  }
});
/**
 * Statistics Filter [Input]
 */

exports.StatNode = StatNode;
var StatFilter = new _graphql.GraphQLInputObjectType({
  name: 'StatFilter',
  description: 'Statistic Filters',
  fields: function fields() {
    return {
      search: _graphQLTypes.search
    };
  }
});
/**
 * Statistic Sort [Input]
 */

var StatSort = new _graphql.GraphQLInputObjectType({
  name: 'StatSort',
  description: 'Statistic Sort',
  fields: function fields() {
    return {
      field: _graphQLTypes.field,
      order: _graphQLTypes.order
    };
  }
});
/**
 * Get a Player's Stats [Query]
 */

var getPlayer = {
  type: PlayerDef,
  args: {
    id: _graphQLTypes.id
  },
  resolve: function () {
    var _resolve = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
      var id, s, stats, _steam$response, sid, _steam;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = _ref.id;

              if (Number(id)) {
                _context.next = 3;
                break;
              }

              throw new Error('Please input a valid numeric value');

            case 3:
              _context.prev = 3;
              s = new _steamWebAsync["default"]({
                apiKey: _config["default"].steam.steamAPIKey,
                format: 'json' // optional ['json', 'xml', 'vdf']

              });
              _context.next = 7;
              return _StatService["default"].getAStat(id);

            case 7:
              stats = _context.sent;

              if (stats) {
                _context.next = 12;
                break;
              }

              throw new Error('Player ID Not Found');

            case 12:
              sid = new _steamid["default"](stats.steam);
              _context.next = 15;
              return s.getPlayerSummaries({
                steamids: [sid.getSteamID64()]
              });

            case 15:
              _steam = _context.sent;
              log.info(JSON.stringify({
                steam: _steam,
                stats: stats
              }));
              _context.next = 19;
              return {
                steam: _steam === null || _steam === void 0 ? void 0 : (_steam$response = _steam.response) === null || _steam$response === void 0 ? void 0 : _steam$response.players[0],
                stats: stats
              };

            case 19:
              return _context.abrupt("return", _context.sent);

            case 20:
              _context.next = 26;
              break;

            case 22:
              _context.prev = 22;
              _context.t0 = _context["catch"](3);
              log.error(_context.t0.message);
              log.error(_context.t0.stack);

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 22]]);
    }));

    function resolve(_x, _x2) {
      return _resolve.apply(this, arguments);
    }

    return resolve;
  }()
};
/**
 * Get Stats [Query]
 */

exports.getPlayer = getPlayer;
var getPlayers = {
  type: StatNode,
  args: {
    count: _graphQLTypes.count,
    page: _graphQLTypes.Int,
    filter: {
      type: StatFilter
    },
    // Input Type
    sort: {
      type: StatSort
    } // Input Type

  },
  resolve: function () {
    var _resolve2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_, _ref2) {
      var count, page, nodes;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              count = _ref2.count, page = _ref2.page;
              _context2.prev = 1;

              if (!count || Number(count) > 20) {
                count = 20;
              } else {
                count = Number(count);
              }

              if (!page) {
                page = 1;
              } else {
                page = Number(page);
              }

              _context2.next = 6;
              return _StatService["default"].getAllPlayers(count, (page - 1) * count);

            case 6:
              nodes = _context2.sent;
              _context2.next = 9;
              return _StatService["default"].count();

            case 9:
              _context2.t0 = _context2.sent;
              _context2.t1 = count;
              _context2.t2 = nodes;
              return _context2.abrupt("return", {
                totalCount: _context2.t0,
                count: _context2.t1,
                nodes: _context2.t2
              });

            case 15:
              _context2.prev = 15;
              _context2.t3 = _context2["catch"](1);
              log.error(_context2.t3.message);
              log.error(_context2.t3.stack);

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 15]]);
    }));

    function resolve(_x3, _x4) {
      return _resolve2.apply(this, arguments);
    }

    return resolve;
  }()
};
exports.getPlayers = getPlayers;
var Statistics = {
  getPlayer: getPlayer,
  getPlayers: getPlayers,
  StatDef: StatDef,
  StatNode: StatNode
};
var _default = Statistics;
exports["default"] = _default;