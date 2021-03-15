"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConsultaTranxMEXS = void 0;

var _mssql = _interopRequireWildcard(require("mssql"));

var _DB_Config_SGV = _interopRequireDefault(require("../database/DB_Config_SGV"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mssql = require('../database/mssql-connection-pooling');

var getConsultaTranxMEXS = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var fechas, fechaCorta1, fecha1, FechaIni, fechaCorta2, fecha2, FechaFin, sqlPool1, request, tranxMEXS;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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