"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIpAddress = getIpAddress;
exports.getRequestIdentifier = getRequestIdentifier;
exports.Status = exports.futureTime = exports.timeStamp = exports.awsServer = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _md = _interopRequireDefault(require("md5"));

/**
 * AWS Storage URL
 */
var awsServer = "https://".concat(process.env.AWS_S3_BUCKET, ".s3-").concat(process.env.AWS_DEFAULT_REGION, ".amazonaws.com/");
/**
 * Get IP Address from Request
 * @param {} req
 * @returns
 */

exports.awsServer = awsServer;

function getIpAddress(req) {
  return (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
}
/**
 * Generate Identifier from Request
 * @param {*} req
 * @returns
 */


function getRequestIdentifier(req) {
  return (0, _md["default"])("".concat(getIpAddress(req), " + ").concat(req.headers['user-agent']));
}
/**
 * Current Time Stamp
 * @returns Date String
 */


var timeStamp = function timeStamp() {
  var date = new Date(Date.now());
  return date.toISOString();
};
/**
 * Future Time Stamp
 */


exports.timeStamp = timeStamp;

var futureTime = function futureTime(_ref) {
  var hours = _ref.hours;
  var date = new Date(Date.now() + hours * 60 * 60 * 1000);
  return date.toISOString();
};

exports.futureTime = futureTime;

var Status = /*#__PURE__*/function () {
  function Status() {
    (0, _classCallCheck2["default"])(this, Status);
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  (0, _createClass2["default"])(Status, [{
    key: "setSuccess",
    value: function setSuccess(statusCode, message, data) {
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
      this.type = 'success';
    }
  }, {
    key: "setError",
    value: function setError(statusCode, message) {
      this.statusCode = statusCode;
      this.message = message;
      this.type = 'error';
    }
  }, {
    key: "send",
    value: function send(res) {
      var result = {
        status: this.type,
        message: this.message,
        data: this.data
      };

      if (this.type === 'success') {
        return res.status(this.statusCode).json(result);
      }

      return res.status(this.statusCode).json({
        status: this.type,
        message: this.message
      });
    }
  }]);
  return Status;
}();

exports.Status = Status;