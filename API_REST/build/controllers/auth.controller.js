"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuth = exports.Signin = void 0;

var _mssql = _interopRequireDefault(require("mssql"));

var _DB_Config_SGV = _interopRequireDefault(require("../database/DB_Config_SGV"));

var _auth = _interopRequireDefault(require("../config/auth.config"));

var _jsonwebtoken = _interopRequireWildcard(require("jsonwebtoken"));

var _activedirectory = _interopRequireDefault(require("activedirectory"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mssql = require('../database/mssql-connection-pooling');

var Signin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var config, ad, sqlPool1, request, usuario, results, users, thisUser, perfilsModelos, modelos, perfiles;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            config = {
              url: 'ldap://cencosud.corp',
              baseDN: 'dc=cencosud,dc=corp'
            };
            ad = new _activedirectory["default"](config);
            _context.next = 5;
            return mssql.GetCreateIfNotExistPool(_DB_Config_SGV["default"]);

          case 5:
            sqlPool1 = _context.sent;
            request = new _mssql["default"].Request(sqlPool1);
            usuario = [];
            results = []; //Obtener todos los usuarios desde la db.

            _context.next = 11;
            return request.query('select * from SGV_MOE_Usuarios');

          case 11:
            users = _context.sent;
            //Buscamos el usuario en la tabla.
            thisUser = users.recordsets[0].filter(function (usuario) {
              return usuario.Username === req.body.username;
            }); //Si no encuentra al usuario entonces de vuelve un 401.

            if (!(thisUser[0] === undefined)) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", res.status(401).send({
              error: "No se encuentra ese usuario."
            }));

          case 15:
            _context.next = 17;
            return request.input('IdPerfil', _mssql["default"].VarChar, thisUser[0].IdPerfil).query('SELECT * FROM SGV_MOE_ModulosPerfiles WHERE IdPerfil = @IdPerfil');

          case 17:
            perfilsModelos = _context.sent;
            _context.next = 20;
            return request.query('SELECT * FROM SGV_MOE_Modulos');

          case 20:
            modelos = _context.sent;
            _context.next = 23;
            return request.query("SELECT * FROM SGV_MOE_Perfiles");

          case 23:
            perfiles = _context.sent;
            //Hacemos join entre tablas.
            thisUser.map(function (item) {
              var perfil = perfiles.recordsets[0].find(function (rol) {
                return rol.Id === item.IdPerfil;
              });
              usuario.push(Object.assign(item, {
                perfil: perfil.Perfil
              }));
            });
            perfilsModelos.recordsets[0].map(function (item) {
              var modulo = Object.assign({}, item, modelos.recordsets[0].find(function (modelo) {
                return modelo.Id === item.IdModulo;
              }));
              results.push({
                Modulo: modulo.Modulo
              });
            });
            ad.authenticate(thisUser[0].Email, req.body.password, function (err, auth) {
              if (err) {
                return res.status(403).send({
                  error: "La contraseña con coinside."
                });
              }

              if (auth) {
                var token = _jsonwebtoken["default"].sign({
                  id: thisUser.Id
                }, _auth["default"].SECRET, {
                  expiresIn: '16h'
                });

                var times = _jsonwebtoken["default"].verify(token, _auth["default"].SECRET);

                res.json({
                  token: token,
                  modulos: results,
                  user: [usuario[0], {
                    exp: times.exp
                  }]
                });
              }
            });
            _context.next = 32;
            break;

          case 29:
            _context.prev = 29;
            _context.t0 = _context["catch"](0);
            res.status(403).send({
              error: "Se aproducido un error, intente más tarde."
            });

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 29]]);
  }));

  return function Signin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.Signin = Signin;

var isAuth = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var token;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            token = req.body.headers['x-access-token'];
            console.log(req.body.headers['x-access-token']);

            if (!(token == null)) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(401).json({
              isValid: false
            }));

          case 5:
            if (token) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(403).json({
              isValid: false
            }));

          case 7:
            _jsonwebtoken["default"].verify(token, _auth["default"].SECRET, function (err, decoded) {
              if (err) {
                return res.status(403).json({
                  isValid: false
                });
              } else {
                //res.json({iat: decoded.iat, exp: decoded.exp});
                res.json({
                  isValid: true
                });
              }
            });

            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(403).json({
              isValid: false
            }));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function isAuth(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.isAuth = isAuth;