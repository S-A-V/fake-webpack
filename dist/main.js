(function (graph) {
  function require(moduleId) {
    function localRequire(relativePath) {
      return require(graph[moduleId].dependencyMap[relativePath]);
    }
    var exports = {};
    (function (require, exports, code) {
      eval(code);
    })(localRequire, exports, graph[moduleId].code);
    return exports;
  }
  require('./src/index.js');
})({
  './src/index.js': {
    dependencyMap: { './Message.js': './src\\Message.js', './hello.js': './src\\hello.js' },
    code:
      '"use strict";\n\nvar _Message = _interopRequireDefault(require("./Message.js"));\nvar _hello = require("./hello.js");\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\ndocument.write((0, _hello.say)(\'Webpack\'));\n_Message["default"].info(\'Ready.\');',
  },
  './src\\Message.js': {
    dependencyMap: {},
    code:
      '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports["default"] = void 0;\nfunction _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }\nvar Message = /*#__PURE__*/function () {\n  function Message() {\n    _classCallCheck(this, Message);\n  }\n  _createClass(Message, null, [{\n    key: "log",\n    value: function log(message) {\n      console.log(message);\n    }\n  }, {\n    key: "info",\n    value: function info(message) {\n      console.info(message);\n    }\n  }, {\n    key: "warning",\n    value: function warning(message) {\n      console.warn(message);\n    }\n  }, {\n    key: "clear",\n    value: function clear() {\n      console.clear();\n    }\n  }]);\n  return Message;\n}();\nexports["default"] = Message;',
  },
  './src\\hello.js': {
    dependencyMap: { './utils.js': './src\\utils.js' },
    code:
      '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.say = say;\nvar _utils = require("./utils.js");\nfunction say(name) {\n  (0, _utils.log)(\'Hello.\');\n  return "Hello, ".concat(name, ".");\n}',
  },
  './src\\utils.js': {
    dependencyMap: { './Message.js': './src\\Message.js' },
    code:
      '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.log = log;\nvar _Message = _interopRequireDefault(require("./Message.js"));\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\nfunction log(message) {\n  _Message["default"].log(message);\n}',
  },
});
