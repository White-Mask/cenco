"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTotalesCDP = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mssql = _interopRequireDefault(require("mssql"));

var _DB_Config_CDP = _interopRequireDefault(require("../database/DB_Config_CDP"));

var mssql = require('../database/mssql-connection-pooling');

var getTotalesCDP = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var data, _short, date, today, fecha, sqlPool1, request, totalCDP;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            data = req.query;
            _short = data.ID.split(" ");
            date = _short[0].split("-");
            today = new Date(date[2], date[1] - 1, date[0]);
            fecha = today.toISOString().substring(0, 10); //Conexion CDP

            _context.next = 8;
            return mssql.GetCreateIfNotExistPool(_DB_Config_CDP["default"]);

          case 8:
            sqlPool1 = _context.sent;
            request = new _mssql["default"].Request(sqlPool1);
            _context.next = 12;
            return request.input('IdLocalSap', _mssql["default"].VarChar, data.Local).input('FechaFiscal', _mssql["default"].VarChar, fecha.replace(/-/g, '')).execute('SP_SMA_MOE_Totales_CDP');

          case 12:
            totalCDP = _context.sent;
            res.json({
              array: totalCDP.recordsets[0],
              fecha: fecha,
              local: data.Local
            });

            _mssql["default"].close();

            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

            _mssql["default"].close();

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 17]]);
  }));

  return function getTotalesCDP(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getTotalesCDP = getTotalesCDP;