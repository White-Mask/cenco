"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNumTransaccionLocalSGV = void 0;

var _mssql = _interopRequireDefault(require("mssql"));

var _DB_Config_SGV = _interopRequireDefault(require("../database/DB_Config_SGV"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//Numero de transacciones por local (SGV).
var getNumTransaccionLocalSGV = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var fecha, pool, users;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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