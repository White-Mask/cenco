"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _user = _interopRequireDefault(require("./routes/user.routes"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

var _tiendaEasy = _interopRequireDefault(require("./routes/tiendaEasy.routes"));

var _transaccion = _interopRequireDefault(require("./routes/transaccion.routes"));

var _sucursalesStatus = _interopRequireDefault(require("./routes/sucursalesStatus.routes"));

var _numTransaccionesLocalSGV = _interopRequireDefault(require("./routes/numTransaccionesLocalSGV.routes"));

var _InterfacesErrorTSAV = _interopRequireDefault(require("./routes/InterfacesErrorTSAV.routes"));

var _numTransaccionesLocalCDP = _interopRequireDefault(require("./routes/numTransaccionesLocalCDP.routes"));

var _totalesCDP = _interopRequireDefault(require("./routes/totalesCDP.routes"));

var _EAMTRAN = _interopRequireDefault(require("./routes/EAMTRAN.routes"));

var _generarInterfazVTA = _interopRequireDefault(require("./routes/generarInterfazVTA.routes"));

var _reenviarCC = _interopRequireDefault(require("./routes/reenviarCC3.routes"));

var _tiposInterfaces = _interopRequireDefault(require("./routes/tiposInterfaces.routes"));

var _tiposEstados = _interopRequireDefault(require("./routes/tiposEstados.routes"));

var _perfiles = _interopRequireDefault(require("./routes/perfiles.routes"));

var _severidades = _interopRequireDefault(require("./routes/severidades.routes"));

var _logs = _interopRequireDefault(require("./routes/logs.routes"));

var _ExcluyeLocalAlarma = _interopRequireDefault(require("./routes/ExcluyeLocalAlarma.routes"));

var _ConsultaTranxSinFolio = _interopRequireDefault(require("./routes/ConsultaTranxSinFolio.routes"));

var _ConsultaTranxMEXS = _interopRequireDefault(require("./routes/ConsultaTranxMEXS.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var app = (0, _express["default"])();

var cors = require('cors'); //Importar rutas


//middlewares
app.use(cors());
app.use((0, _morgan["default"])('dev'));
app.use((0, _express.json)()); //routes

app.use('/api/users', _user["default"]);
app.use('/api/auth', _auth["default"]);
app.use('/api/tiendasEasy', _tiendaEasy["default"]);
app.use('/api/transacciones', _transaccion["default"]);
app.use('/api/sucursales-status', _sucursalesStatus["default"]);
app.use('/api/numero-transacciones-locales-sgv', _numTransaccionesLocalSGV["default"]);
app.use('/api/interfacesErrorTSAV', _InterfacesErrorTSAV["default"]);
app.use('/api/numero-transacciones-locales-cdp', _numTransaccionesLocalCDP["default"]);
app.use('/api/totales-cdp', _totalesCDP["default"]);
app.use('/api/eamtran', _EAMTRAN["default"]);
app.use('/api/interfaz-vta', _generarInterfazVTA["default"]);
app.use('/api/reenviar-cc3', _reenviarCC["default"]);
app.use('/api/tiposInterfaces', _tiposInterfaces["default"]);
app.use('/api/tiposEstados', _tiposEstados["default"]);
app.use('/api/perfiles', _perfiles["default"]);
app.use('/api/severidades', _severidades["default"]);
app.use('/api/logs', _logs["default"]);
app.use('/api/excluye-local-alarma', _ExcluyeLocalAlarma["default"]);
app.use('/api/consulta-tranx-sin-folio', _ConsultaTranxSinFolio["default"]);
app.use('/api/consulta-tranx-MEXS', _ConsultaTranxMEXS["default"]);
var _default = app;
exports["default"] = _default;