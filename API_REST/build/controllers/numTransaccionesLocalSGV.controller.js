"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNumTransaccionLocalSGV = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mssql = _interopRequireDefault(require("mssql"));

var _DB_Config_SGV = _interopRequireDefault(require("../database/DB_Config_SGV"));

//Numero de transacciones por local (SGV).
var getNumTransaccionLocalSGV = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var fecha, pool, users;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            // const {fecha} = req.body;
            fecha = '20210205';
            _context.next = 4;
            return _mssql["default"].connect(_DB_Config_SGV["default"]);

          case 4:
            pool = _context.sent;
            _context.next = 7;
            return pool.request().input('Fecha', _mssql["default"].VarChar, fecha).query('exec SGVMOEGetCantidadTransaccionesLocal @Fecha');

          case 7:
            users = _context.sent;
            res.json(users.recordsets[0]);

            _mssql["default"].close();

            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function getNumTransaccionLocalSGV(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getNumTransaccionLocalSGV = getNumTransaccionLocalSGV;