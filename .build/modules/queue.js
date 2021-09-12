"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Queue = /*#__PURE__*/function () {
  function Queue() {
    (0, _classCallCheck2["default"])(this, Queue);
    this.list = [];
    this.task = {
      current: 0,
      name: null
    };
    this.start = false;
    this.complete = false;
  }

  (0, _createClass2["default"])(Queue, [{
    key: "add",
    value: function add() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Array.isArray(options)) {
        options.forEach(function (option) {
          _this.list.push(option);
        });
      } else {
        this.list.push(options);
      }
    }
  }, {
    key: "next",
    value: function next() {
      return ++this.task.current;
    }
  }, {
    key: "start",
    value: function start() {
      this.start = true;
      return this.task.current;
    }
  }, {
    key: "jump",
    value: function jump(task) {
      this.task.current = task;
    }
  }]);
  return Queue;
}();

exports["default"] = Queue;