"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExcluyeLocalAlarma = void 0;

var _mssql = _interopRequireDefault(require("mssql"));

var _DB_Config_CDP = _interopRequireDefault(require("../database/DB_Config_CDP"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mssql = require('../database/mssql-connection-pooling');

var getExcluyeLocalAlarma = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var data, sqlPool1, request, excluyeLocalAlarma;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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