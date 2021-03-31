"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTipoInterfaces = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mssql = _interopRequireDefault(require("mssql"));

var _DB_Config_SGV = _interopRequireDefault(require("../database/DB_Config_SGV"));

var mssql = require('../database/mssql-connection-pooling');

//Coleccion de los tipos de interfaces.
var getTipoInterfaces = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var sqlPool1, request, tipoInterfaces;
    return _regenerator["default"].wrap(function _callee$(_context) {
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