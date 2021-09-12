"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogger = void 0;

var _winston = require("winston");

var colorize = _winston.format.colorize,
    combine = _winston.format.combine,
    label = _winston.format.label,
    prettyPrint = _winston.format.prettyPrint,
    printf = _winston.format.printf,
    timestamp = _winston.format.timestamp;
var loggers = {};
var container = new _winston.Container();

var createLogger = function createLogger(category, categoryLabel) {
  var formatter = function formatter(data) {
    return "[".concat(data.level, "][").concat(data.label, "] ").concat(data.message);
  };

  var formatters = [colorize(), label({
    label: categoryLabel
  })];
  formatters.push(timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }));

  formatter = function formatter(data) {
    return "".concat(data.timestamp, " [").concat(data.level, "][").concat(data.label, "] ").concat(data.message);
  };

  formatters.push(prettyPrint(), printf(formatter));
  container.add(category, {
    transports: [new _winston.transports.Console({
      level: 'info',
      format: combine.apply(null, formatters)
    })]
  });
  return container.get(category);
};

var getLogger = function getLogger(category) {
  var categoryLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : category;

  if (!loggers[category]) {
    loggers[category] = createLogger(category, categoryLabel);
  }

  return loggers[category];
};

exports.getLogger = getLogger;