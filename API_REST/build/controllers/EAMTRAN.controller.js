"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateEAMTRAN = exports.getEAMTRAN = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mssql = _interopRequireDefault(require("mssql"));

var _DB_Config_CDP = _interopRequireDefault(require("../database/DB_Config_CDP"));

var mssql = require('../database/mssql-connection-pooling');

var getEAMTRAN = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var data, _short, date, today, fecha, sqlPool1, request, EAMTRAN;

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
            return request.input('IdLocalSap', _mssql["default"].VarChar, data.Local).input('FechaFiscal', _mssql["default"].VarChar, fecha.replace(/-/g, '')).execute('SP_SMA_MOE_GetDetalleEAMTRAN');

          case 12:
            EAMTRAN = _context.sent;
            res.json({
              array: EAMTRAN.recordsets[0],
              fecha: fecha
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

  return function getEAMTRAN(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getEAMTRAN = getEAMTRAN;

var updateEAMTRAN = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var data, _short2, date, today, sqlPool1, request, _updateEAMTRAN;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            data = req.body;
            _short2 = data.fechaUltimoLote.split(" ");
            date = _short2[0].split("-");
            today = new Date(date[2], date[1] - 1, date[0]);
            fechaReset = today.setHours(8, 0, 0, 0); //Conexion CDP

            _context2.next = 8;
            return mssql.GetCreateIfNotExistPool(_DB_Config_CDP["default"]);

          case 8:
            sqlPool1 = _context2.sent;
            request = new _mssql["default"].Request(sqlPool1);
            _context2.next = 12;
            return request.input('Eamtran', _mssql["default"].VarChar, data.eamtran).input('UltimoLote', _mssql["default"].VarChar, data.ultimoLote).input('FechaUltimoLote', _mssql["default"].VarChar, fechaReset).input('IdLocalSAP', _mssql["default"].VarChar, data.local).input('FechaFiscal', _mssql["default"].VarChar, data.fechaFiscal).input('FechaUltimoLoteOrig', _mssql["default"].VarChar, data.fechaUltimoLoteOrig).input('Status', _mssql["default"].VarChar, data.status).execute('SP_SMA_MOE_UpdateDetalleEAMTRAN');

          case 12:
            _updateEAMTRAN = _context2.sent;
            res.json({
              array: _updateEAMTRAN.recordsets[0]
            });

            _mssql["default"].close();

            _context2.next = 21;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

            _mssql["default"].close();

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 17]]);
  }));

  return function updateEAMTRAN(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateEAMTRAN = updateEAMTRAN;