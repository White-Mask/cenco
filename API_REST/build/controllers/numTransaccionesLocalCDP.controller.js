"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNumTransaccionLocalCDP = void 0;

var _mssql = _interopRequireDefault(require("mssql"));

var _DB_Config_CDP = _interopRequireDefault(require("../database/DB_Config_CDP"));

var _DB_Config_SGV = _interopRequireDefault(require("../database/DB_Config_SGV"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mssql = require('../database/mssql-connection-pooling');

function merge(local, sgv, cdp, interfaces) {
  var trxLocal = {
    CodSAP: local.CodSAP,
    Local: local.Local,
    TotalSGV: sgv === undefined ? 0 : sgv.Total,
    TotalCDP: cdp === undefined ? 0 : cdp.Total,
    interfaces: interfaces === undefined ? 'Pendiente' : interfaces.Interfaz,
    LoteTeradata: cdp === undefined ? '' : cdp.LoteTeradata !== null ? cdp.LoteTeradata : "Pendiente"
  };
  return trxLocal;
} //Numero de transacciones por local (SGV).


var getNumTransaccionLocalCDP = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var dateIni, _short, date, today, fecha, result, sqlPool1, request, CDP_trx, sqlPool2, request2, interfaces, aux, sqlPool3, request3, SGV_trx, sqlPool4, request4, locales;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dateIni = req.query;
            _short = dateIni.ID.split(" ");
            date = _short[0].split("-");
            today = new Date(date[2], date[1] - 1, date[0]);
            fecha = today.toISOString().substring(0, 10);
            result = []; //Conexion CDP

            _context.next = 9;
            return mssql.GetCreateIfNotExistPool(_DB_Config_CDP["default"]);

          case 9:
            sqlPool1 = _context.sent;
            request = new _mssql["default"].Request(sqlPool1);
            _context.next = 13;
            return request.input('Fecha', _mssql["default"].VarChar, fecha.replace(/-/g, '')).execute('SP_SMA_MOE_GetCantidadTransaccionesLocal');

          case 13:
            CDP_trx = _context.sent;
            _context.next = 16;
            return mssql.GetCreateIfNotExistPool(_DB_Config_CDP["default"]);

          case 16:
            sqlPool2 = _context.sent;
            request2 = new _mssql["default"].Request(sqlPool2);
            _context.next = 20;
            return request2.input('Fecha', _mssql["default"].VarChar, fecha.replace(/-/g, '')).execute('SP_SMA_MOE_GetNombresInterfacesVentas');

          case 20:
            interfaces = _context.sent;
            aux = interfaces.recordsets[0]; //Conexion SGV

            _context.next = 24;
            return mssql.GetCreateIfNotExistPool(_DB_Config_SGV["default"]);

          case 24:
            sqlPool3 = _context.sent;
            request3 = new _mssql["default"].Request(sqlPool3);
            _context.next = 28;
            return request3.input('Fecha', _mssql["default"].VarChar, fecha.replace(/-/g, '')).execute('SGVMOEGetCantidadTransaccionesLocal');

          case 28:
            SGV_trx = _context.sent;
            _context.next = 31;
            return mssql.GetCreateIfNotExistPool(_DB_Config_SGV["default"]);

          case 31:
            sqlPool4 = _context.sent;
            request4 = new _mssql["default"].Request(sqlPool4);
            _context.next = 35;
            return request4.execute('SGVMOEGetTiendasEasy');

          case 35:
            locales = _context.sent;
            locales.recordsets[0].map(function (obj, i) {
              var x = CDP_trx.recordsets[0].find(function (c) {
                return c.Local === obj.CodSAP;
              });
              var y = SGV_trx.recordsets[0].find(function (c) {
                return c.Local.includes(obj.Local);
              });
              var z = interfaces.recordsets[0].find(function (c) {
                return c.Local === obj.CodSAP;
              });
              result.push(merge(obj, y, x, z));
            });
            res.json(result);

            _mssql["default"].close();

            _context.next = 45;
            break;

          case 41:
            _context.prev = 41;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

            _mssql["default"].close();

          case 45:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 41]]);
  }));

  return function getNumTransaccionLocalCDP(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getNumTransaccionLocalCDP = getNumTransaccionLocalCDP;