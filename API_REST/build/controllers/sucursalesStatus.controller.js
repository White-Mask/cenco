"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetDetalleErrorEstadoLocal = exports.getSucursalesStatus = void 0;

var _mssql = _interopRequireDefault(require("mssql"));

var _DB_Config_SGV = _interopRequireDefault(require("../database/DB_Config_SGV"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function CrearEstatusTiendaDias(data, tienda) {
  var estatusDias = {
    CodSAP: tienda.CodSAP,
    Local: tienda.Local,
    dia: [data[0].length > 0 && data[0] !== null ? data[0][0].Estado : null, data[1].length > 0 && data[1] !== null ? data[1][0].Estado : null, data[2].length > 0 && data[2] !== null ? data[2][0].Estado : null, data[3].length > 0 && data[3] !== null ? data[3][0].Estado : null, data[4].length > 0 && data[4] !== null ? data[4][0].Estado : null, data[5].length > 0 && data[5] !== null ? data[5][0].Estado : null, data[6].length > 0 && data[6] !== null ? data[6][0].Estado : null, data[7].length > 0 && data[7] !== null ? data[7][0].Estado : null, data[8].length > 0 && data[8] !== null ? data[8][0].Estado : null]
  };
  return estatusDias;
}

; //Coleccion estado de sucursales.

var getSucursalesStatus = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var dateIni, _short, date, today, conjuntoDeFechas, datosPorFecha, datos, pool, i, aux, fecha, tiendasEasy;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dateIni = req.query;
            _short = dateIni.ID.split(" ");
            date = _short[0].split("-");
            today = new Date(date[2], date[1] - 1, date[0]);
            conjuntoDeFechas = ["Local"]; //Cambiar NOmbre por Header o head o titulos

            datosPorFecha = [];
            datos = [];
            _context.next = 10;
            return _mssql["default"].connect(_DB_Config_SGV["default"]);

          case 10:
            pool = _context.sent;
            i = -6;

          case 12:
            if (!(i <= 2)) {
              _context.next = 22;
              break;
            }

            aux = today.addDays(i).toISOString().substring(0, 10);
            conjuntoDeFechas.push(aux);
            _context.next = 17;
            return pool.request().input('Fecha', _mssql["default"].VarChar, aux.replace(/-/g, '')).query("exec SGVMOE_GetSucursalesStatus @Fecha");

          case 17:
            fecha = _context.sent;
            datosPorFecha.push({
              Locales: fecha.recordsets[0]
            });

          case 19:
            i++;
            _context.next = 12;
            break;

          case 22:
            _context.next = 24;
            return pool.request().query("exec SGVMOEGetTiendasEasy");

          case 24:
            tiendasEasy = _context.sent;
            tiendasEasy.recordsets[0].map(function (tienda) {
              var data = datosPorFecha.map(function (dia) {
                return dia.Locales.filter(function (local) {
                  return local.CodSap === tienda.CodSAP;
                });
              });
              datos.push(CrearEstatusTiendaDias(data, tienda));
            });
            res.json({
              datos: datos,
              Fechas: conjuntoDeFechas
            });

            _mssql["default"].close();

            _context.next = 33;
            break;

          case 30:
            _context.prev = 30;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 30]]);
  }));

  return function getSucursalesStatus(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getSucursalesStatus = getSucursalesStatus;

var GetDetalleErrorEstadoLocal = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var data, _short2, date, fecha, pool, EstadoLocalDetalleError;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            data = req.query;
            _short2 = data.ID.split(" ");
            date = _short2[0].split("-");
            fecha = new Date(date[2], date[1] - 1, date[0]);
            console.log(data.codSAP);
            console.log(fecha.toISOString().substring(0, 10));
            _context2.next = 9;
            return _mssql["default"].connect(_DB_Config_SGV["default"]);

          case 9:
            pool = _context2.sent;
            _context2.next = 12;
            return pool.request().input('codSAP', _mssql["default"].VarChar, data.codSAP).input('fecha', _mssql["default"].VarChar, fecha.toISOString().substring(0, 10).replace(/-/g, '')).execute("SGVMOE_TLogErrorGetBySucursalFecha");

          case 12:
            EstadoLocalDetalleError = _context2.sent;
            console.log(EstadoLocalDetalleError);
            res.json({
              EstadoLocalDetalleError: EstadoLocalDetalleError
            });

            _mssql["default"].close();

            _context2.next = 21;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 18]]);
  }));

  return function GetDetalleErrorEstadoLocal(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.GetDetalleErrorEstadoLocal = GetDetalleErrorEstadoLocal;