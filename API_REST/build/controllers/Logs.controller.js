"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verificarInterfazVTA = exports.insertLogs = exports.getLogs = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mssql = _interopRequireDefault(require("mssql"));

var _DB_Config_SGV = _interopRequireDefault(require("../database/DB_Config_SGV"));

var mssql = require('../database/mssql-connection-pooling');

//Coleccion de logs
var getLogs = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var data, _short, date, today, fecha, sqlPool1, request, logs;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            data = req.query;
            _short = data.fecha.split(" ");
            date = _short[0].split("-");
            today = new Date(date[2], date[1] - 1, date[0]);
            fecha = today.toISOString().substring(0, 10);
            _context.next = 8;
            return mssql.GetCreateIfNotExistPool(_DB_Config_SGV["default"]);

          case 8:
            sqlPool1 = _context.sent;
            request = new _mssql["default"].Request(sqlPool1);
            _context.next = 12;
            return request.input('Username', _mssql["default"].VarChar, data.usuarios !== '' ? data.usuarios : null).input('FechaHora', _mssql["default"].VarChar, fecha.replace(/-/g, '')).input('Accion', _mssql["default"].VarChar, data.accion !== '' ? data.accion : null).input('Extra', _mssql["default"].VarChar, data.dataExtra !== '' ? data.dataExtra : null).input('Severity', _mssql["default"].Int, data.severidad !== '' ? data.severidad : null).execute("SGVMOE_GetLogs");

          case 12:
            logs = _context.sent;
            res.json(logs.recordsets[0]);

            _mssql["default"].close();

            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 17]]);
  }));

  return function getLogs(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getLogs = getLogs;

var insertLogs = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            try {
              data = req.query;
              console.log(data); //let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
              //let request = new sql.Request(sqlPool1)
              //let logs = await request
              //    .input('Username', sql.VarChar, data.usuarios)
              //    .input('Accion', sql.VarChar, data.accion)
              //    .input('Severity', sql.Int, data.severidad)
              //    .input('Extra', sql.VarChar, data.dataExtra)
              //    .execute("SGVMOE_RegistraLog")
              //
              //res.json(logs.recordsets[0]);

              res.json(true);

              _mssql["default"].close();
            } catch (error) {
              console.log(error);
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function insertLogs(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.insertLogs = insertLogs;

var verificarInterfazVTA = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var data, _short2, date, today, fecha, sqlPool1, request, _verificarInterfazVTA;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            data = req.query;
            _short2 = data.ID.split(" ");
            date = _short2[0].split("-");
            today = new Date(date[2], date[1] - 1, date[0]);
            fecha = today.toISOString().substring(0, 10); //Conexion CDP

            _context3.next = 8;
            return mssql.GetCreateIfNotExistPool(_DB_Config_SGV["default"]);

          case 8:
            sqlPool1 = _context3.sent;
            request = new _mssql["default"].Request(sqlPool1);
            _context3.next = 12;
            return request.input('Fecha', _mssql["default"].VarChar, fecha.replace(/-/g, '')).input('Local', _mssql["default"].VarChar, data.Local).query('select * from SGV_MOE_Log where Accion = \'Reenvia Interface Venta\' AND CONVERT(VARCHAR(8),FechaHora,112) = CONVERT(VARCHAR(8),GETDATE(),112)  AND SUBSTRING(extra,1,4) =@Local AND SUBSTRING(Extra,6,10) =@Fecha');

          case 12:
            _verificarInterfazVTA = _context3.sent;
            res.json({
              array: _verificarInterfazVTA.recordsets[0],
              existe: _verificarInterfazVTA.recordsets[0].length > 0 ? true : false
            });

            _mssql["default"].close();

            _context3.next = 22;
            break;

          case 17:
            _context3.prev = 17;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0.message);
            res.json({
              message: _context3.t0.message
            });

            _mssql["default"].close();

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 17]]);
  }));

  return function verificarInterfazVTA(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.verificarInterfazVTA = verificarInterfazVTA;