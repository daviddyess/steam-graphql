"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _models = _interopRequireDefault(require("./../models"));

var StatService = /*#__PURE__*/function () {
  function StatService() {
    (0, _classCallCheck2["default"])(this, StatService);
  }

  (0, _createClass2["default"])(StatService, null, [{
    key: "getAllStats",
    value: function () {
      var _getAllStats = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _models["default"].Rankme.findAll();

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getAllStats() {
        return _getAllStats.apply(this, arguments);
      }

      return getAllStats;
    }()
  }, {
    key: "getAllPlayers",
    value: function () {
      var _getAllPlayers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(limit, offset) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _models["default"].Rankme.findAll({
                  attributes: ['id', 'steam', 'name', 'score', 'kills', 'deaths', 'connected'],
                  order: [['score', 'DESC']],
                  offset: offset,
                  limit: limit
                });

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getAllPlayers(_x, _x2) {
        return _getAllPlayers.apply(this, arguments);
      }

      return getAllPlayers;
    }()
  }, {
    key: "getAStat",
    value: function () {
      var _getAStat = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
        var theStat;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _models["default"].Rankme.findOne({
                  where: {
                    id: Number(id)
                  }
                });

              case 2:
                theStat = _context3.sent;
                return _context3.abrupt("return", theStat);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getAStat(_x3) {
        return _getAStat.apply(this, arguments);
      }

      return getAStat;
    }()
  }, {
    key: "count",
    value: function () {
      var _count = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _models["default"].Rankme.count();

              case 2:
                return _context4.abrupt("return", _context4.sent);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function count() {
        return _count.apply(this, arguments);
      }

      return count;
    }()
  }]);
  return StatService;
}();

var _default = StatService;
exports["default"] = _default;