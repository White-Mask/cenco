"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransaccion = void 0;

var _mssql = _interopRequireDefault(require("mssql"));

var _DB_Config_SGV = _interopRequireDefault(require("../database/DB_Config_SGV"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mssql = require('../database/mssql-connection-pooling');

//Coleccion de Transacciones
var getTransaccion = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var data, fechaCorta1, fecha1, FechaIni, fecha, sqlPool1, request, transacciones;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            data = req.query;
            fechaCorta1 = data.selectedDate.split(" ");
            fecha1 = fechaCorta1[0].split("-");
            FechaIni = new Date(fecha1[2], fecha1[1] - 1, fecha1[0]);
            fecha = FechaIni.toISOString().substring(0, 10); //Conexion CDP

            _context.next = 8;
            return mssql.GetCreateIfNotExistPool(_DB_Config_SGV["default"]);

          case 8:
            sqlPool1 = _context.sent;
            request = new _mssql["default"].Request(sqlPool1);
            _context.next = 12;
            return request.input('IdTLogHeader', _mssql["default"].VarChar, data.IdTLogHeader === '' ? null : data.IdTLogHeader).input('IdTlogDetail', _mssql["default"].VarChar, data.IdTlogDetail === '' ? null : data.IdTlogDetail).input('Fecha', _mssql["default"].VarChar, fecha.replace(/-/g, '')).input('CodSAP', _mssql["default"].VarChar, data.Local).input('Terminal', _mssql["default"].VarChar, data.Terminal === '' ? null : data.Terminal).input('Transnunm', _mssql["default"].VarChar, data.NumTransaccion === '' ? null : data.NumTransaccion).input('Folio', _mssql["default"].VarChar, data.Folio === '' ? null : data.Folio).input('TipoDTE', _mssql["default"].Int, data.TipoDTE === '' ? null : data.TipoDTE).input('CanalVenta', _mssql["default"].Int, data.CanalVTA === '' ? null : data.CanalVTA).execute('SGVMOEGetTransaccion');

          case 12:
            transacciones = _context.sent;
            res.json({
              transacciones: transacciones.recordsets[0]
            });

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

  return function getTransaccion(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getTransaccion = getTransaccion;