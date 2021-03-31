"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConsultaTranxMEXS = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mssql = _interopRequireWildcard(require("mssql"));

var _DB_Config_SGV = _interopRequireDefault(require("../database/DB_Config_SGV"));

var mssql = require('../database/mssql-connection-pooling');

var getConsultaTranxMEXS = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var fechas, fechaCorta1, fecha1, FechaIni, fechaCorta2, fecha2, FechaFin, sqlPool1, request, tranxMEXS;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            fechas = req.query;
            fechaCorta1 = fechas.FechaIni.split(" ");
            fecha1 = fechaCorta1[0].split("-");
            FechaIni = new Date(fecha1[2], fecha1[1] - 1, fecha1[0]);
            fechaCorta2 = fechas.FechaFin.split(" ");
            fecha2 = fechaCorta2[0].split("-");
            FechaFin = new Date(fecha2[2], fecha2[1] - 1, fecha2[0]); //Conexion SGV

            _context.next = 10;
            return mssql.GetCreateIfNotExistPool(_DB_Config_SGV["default"]);

          case 10:
            sqlPool1 = _context.sent;
            request = new _mssql["default"].Request(sqlPool1);
            _context.next = 14;
            return request.input('FechaIni', _mssql["default"].VarChar, FechaIni.toISOString().substring(0, 10).replace(/-/g, '')).input('FechaFin', _mssql["default"].VarChar, FechaFin.toISOString().substring(0, 10).replace(/-/g, '')).execute('SGV_Consulta_Transac_MEXS');

          case 14:
            tranxMEXS = _context.sent;
            res.json({
              MEXS: tranxMEXS.recordsets[0]
            });

            _mssql["default"].close();

            _context.next = 24;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.json({
              message: _context.t0.message
            });

            _mssql["default"].close();

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 19]]);
  }));

  return function getConsultaTranxMEXS(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getConsultaTranxMEXS = getConsultaTranxMEXS;