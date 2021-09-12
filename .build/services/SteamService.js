"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _steamid = _interopRequireDefault(require("steamid"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var SteamService = /*#__PURE__*/function () {
  function SteamService() {
    (0, _classCallCheck2["default"])(this, SteamService);
  }

  (0, _createClass2["default"])(SteamService, null, [{
    key: "getSteamId",
    value: function () {
      var _getSteamId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
        var sid, steam;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sid = new _steamid["default"](id);
                steam = _objectSpread(_objectSpread({}, sid), {}, {
                  steam2Id: id,
                  steam3Id: sid.getSteam3RenderedID(),
                  steamId: sid.getSteamID64()
                });
                return _context.abrupt("return", steam);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getSteamId(_x) {
        return _getSteamId.apply(this, arguments);
      }

      return getSteamId;
    }()
  }]);
  return SteamService;
}();

var _default = SteamService;
exports["default"] = _default;