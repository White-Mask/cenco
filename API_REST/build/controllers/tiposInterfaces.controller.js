"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTipoInterfaces = void 0;

var _mssql = _interopRequireDefault(require("mssql"));

var _DB_Config_SGV = _interopRequireDefault(require("../database/DB_Config_SGV"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mssql = require('../database/mssql-connection-pooling');

//Coleccion de los tipos de interfaces.
var getTipoInterfaces = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var sqlPool1, request, tipoInterfaces;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return mssql.GetCreateIfNotExistPool(_DB_Config_SGV["default"]);

          case 3:
            sqlPool1 = _context.sent;
            request = new _mssql["default"].Request(sqlPool1);
            _context.next = 7;
            return request.execute('SGVMOE_GetInterfacesTipo');

          case 7:
            tipoInterfaces = _context.sent;
            res.json(tipoInterfaces.recordsets[0]);

            _mssql["default"].close();

            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

            _mssql["default"].close();

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function getTipoInterfaces(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getTipoInterfaces = getTipoInterfaces;