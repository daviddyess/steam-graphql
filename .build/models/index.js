"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _config = _interopRequireDefault(require("../modules/config"));

var _logging = require("../modules/logging");

/* eslint-disable no-sync */
var log = (0, _logging.getLogger)('Sequelize');

var basename = _path["default"].basename(__filename); // const env = process.env.NODE_ENV || 'development';


var db = {};
var _config$mysql = _config["default"].mysql,
    database = _config$mysql.database,
    username = _config$mysql.username,
    password = _config$mysql.password,
    host = _config$mysql.host,
    dialect = _config$mysql.dialect;
var sequelize = new _sequelize["default"](database, username, password, {
  host: host,
  dialect: dialect
});
sequelize.authenticate().then(function () {
  log.info('Database connection has been established successfully.');
})["catch"](function (err) {
  log.error('Unable to connect to the database:', err);
});

_fs["default"].readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = require(_path["default"].join(__dirname, file))(sequelize, _sequelize["default"]);

  db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
var _default = db;
exports["default"] = _default;