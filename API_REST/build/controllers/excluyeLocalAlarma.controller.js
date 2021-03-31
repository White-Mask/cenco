"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExcluyeLocalAlarma = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mssql = _interopRequireDefault(require("mssql"));

var _DB_Config_CDP = _interopRequireDefault(require("../database/DB_Config_CDP"));

var mssql = require('../database/mssql-connection-pooling');

var getExcluyeLocalAlarma = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var data, sqlPool1, request, excluyeLocalAlarma;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            data = req.query; //Conexion CDP

            _context.next = 4;
            return mssql.GetCreateIfNotExistPool(_DB_Config_CDP["default"]);

          case 4:
            sqlPool1 = _context.sent;
            request = new _mssql["default"].Request(sqlPool1);
            _context.next = 8;
            return request.input('tienda', _mssql["default"].VarChar, data.Local).execute('SP_SMA_MOE_InsertTiendaExcluyeLocalAlarma');

          case 8:
            excluyeLocalAlarma = _context.sent;
            res.json(excluyeLocalAlarma > 0 ? true : false);

            _mssql["default"].close();

            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            res.json(false);

            _mssql["default"].close();

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));

  return function getExcluyeLocalAlarma(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getExcluyeLocalAlarma = getExcluyeLocalAlarma;