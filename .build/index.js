"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _expressGraphql = require("express-graphql");

var _schema = _interopRequireDefault(require("./schema"));

var _config = require("./modules/config");

var _logging = require("./modules/logging");

var app = (0, _express["default"])();
var log = (0, _logging.getLogger)('app');
app.use((0, _cors["default"])({
  exposedHeaders: 'x-auth-token'
}));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
/**
 * GraphQL Middleware
 */

app.use('/', (0, _expressGraphql.graphqlHTTP)( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", {
              schema: _schema["default"],
              context: {
                request: request,
                response: response
              },
              graphiql: {
                headerEditorEnabled: true
              }
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()));
/**
 * Start the Server
 */

app.listen(_config.api.port, function (err) {
  if (err) {
    log.error(err.message);
    log.error(err.stack);
  }

  log.info("Moody Crew GraphQL API Server listening on http://localhost:".concat(_config.api.port, "!"));
});