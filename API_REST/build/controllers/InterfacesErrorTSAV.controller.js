"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEnviarTSAV = exports.getInterfacesErrorTSAV = void 0;

var _mssql = _interopRequireDefault(require("mssql"));

var _DB_Config_SGV = _interopRequireDefault(require("../database/DB_Config_SGV"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mssql = require('../database/mssql-connection-pooling');

var getInterfacesErrorTSAV = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var data, fecha, _short, date, today, sqlPool1, request, InterfazTSAV;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            data = req.query;
            fecha = '';

            if (req.query.ID !== '') {
              _short = data.ID.split(" ");
              date = _short[0].split("-");
              today = new Date(date[2], date[1] - 1, date[0]);
              fecha = today.toISOString().substring(0, 10).replace(/-/g, '');
            } //Conexion CDP


            _context.next = 6;
            return mssql.GetCreateIfNotExistPool(_DB_Config_SGV["default"]);

          case 6:
            sqlPool1 = _context.sent;
            request = new _mssql["default"].Request(sqlPool1);
            _context.next = 10;
            return request.input('Fecha', _mssql["default"].VarChar, fecha).input('Tienda', _mssql["default"].VarChar, data.Local).input('InterfaceType', _mssql["default"].VarChar, data.TipoInterfaz).input('InterfaceStatus', _mssql["default"].VarChar, data.Estado).execute('SGVMOE_GetInterfacesReenvio');

          case 10:
            InterfazTSAV = _context.sent;
            res.json({
              InterfazTSAV: InterfazTSAV.recordsets[0]
            });

            _mssql["default"].close();

            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));

  return function getInterfacesErrorTSAV(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getInterfacesErrorTSAV = getInterfacesErrorTSAV;

var getEnviarTSAV = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var data, pool, InterfazTSAV;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            data = req.query;
            _context2.next = 4;
            return _mssql["default"].connect(_DB_Config_SGV["default"]);

          case 4:
            pool = _context2.sent;
            _context2.t0 = regeneratorRuntime.keys(data.selected);

          case 6:
            if ((_context2.t1 = _context2.t0()).done) {
              _context2.next = 13;
              break;
            }

            codigoInterface = _context2.t1.value;
            _context2.next = 10;
            return pool.request().input('InterfaceQueueID', _mssql["default"].Int, codigoInterface).input('Estadofinal', _mssql["default"].Int, 1).execute('SGVMOE_ReenvioGeneralInterfaz');

          case 10:
            InterfazTSAV = _context2.sent;
            _context2.next = 6;
            break;

          case 13:
            res.json(true);

            _mssql["default"].close();

            _context2.next = 20;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t2 = _context2["catch"](0);
            res.json(_context2.t2);

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 17]]);
  }));

  return function getEnviarTSAV(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getEnviarTSAV = getEnviarTSAV;