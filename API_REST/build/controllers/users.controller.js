"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;

var _mssql = _interopRequireDefault(require("mssql"));

var _DB_Config_SGV = _interopRequireDefault(require("../database/DB_Config_SGV"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mssql = require('../database/mssql-connection-pooling');

//Coleccion de usuarios
var getUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var results, sqlPool1, request, users, request2, perfiles;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            results = [];
            _context.next = 4;
            return mssql.GetCreateIfNotExistPool(_DB_Config_SGV["default"]);

          case 4:
            sqlPool1 = _context.sent;
            request = new _mssql["default"].Request(sqlPool1);
            _context.next = 8;
            return request.query("select * from SGV_MOE_Usuarios");

          case 8:
            users = _context.sent;
            request2 = new _mssql["default"].Request(sqlPool1);
            _context.next = 12;
            return request2.query("SELECT * FROM SGV_MOE_Perfiles");

          case 12:
            perfiles = _context.sent;
            users.recordsets[0].map(function (item) {
              var perfil = perfiles.recordsets[0].find(function (rol) {
                return rol.Id === item.IdPerfil;
              });
              results.push(Object.assign(item, {
                perfil: perfil.Perfil
              }));
            });
            res.json(results);

            _mssql["default"].close();

            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 18]]);
  }));

  return function getUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //Crear Usuario


exports.getUsers = getUsers;

var createUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, Nombres, ApellidoP, ApellidoM, Email, Username, IdPerfil, sqlPool1, request, user;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, Nombres = _req$body.Nombres, ApellidoP = _req$body.ApellidoP, ApellidoM = _req$body.ApellidoM, Email = _req$body.Email, Username = _req$body.Username, IdPerfil = _req$body.IdPerfil;
            _context2.next = 4;
            return mssql.GetCreateIfNotExistPool(_DB_Config_SGV["default"]);

          case 4:
            sqlPool1 = _context2.sent;
            request = new _mssql["default"].Request(sqlPool1);
            _context2.next = 8;
            return request.input('Nombres', _mssql["default"].NVarChar, Nombres).input('ApellidoP', _mssql["default"].NVarChar, ApellidoP).input('ApellidoM', _mssql["default"].NVarChar, ApellidoM).input('Email', _mssql["default"].NVarChar, Email).input('Username', _mssql["default"].NVarChar, Username) //.input('Password', sql.NVarChar, Password)
            .input('IdPerfil', _mssql["default"].Int, IdPerfil).query('INSERT INTO SGV_MOE_Usuarios (Nombres, ApellidoP, ApellidoM, Email, Username, Password, IdPerfil) VALUES (@Nombres, @ApellidoP, @ApellidoM, @Email, @Username, \'\',  @IdPerfil)');

          case 8:
            user = _context2.sent;
            //@Password,
            res.json({
              message: "exitoso"
            });

            _mssql["default"].close();

            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));

  return function createUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //Actualizar Usuario


exports.createUser = createUser;

var updateUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body2, Id, Nombres, ApellidoP, ApellidoM, Email, Username, IdPerfil, sqlPool1, request, user;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body2 = req.body, Id = _req$body2.Id, Nombres = _req$body2.Nombres, ApellidoP = _req$body2.ApellidoP, ApellidoM = _req$body2.ApellidoM, Email = _req$body2.Email, Username = _req$body2.Username, IdPerfil = _req$body2.IdPerfil;
            _context3.next = 4;
            return mssql.GetCreateIfNotExistPool(_DB_Config_SGV["default"]);

          case 4:
            sqlPool1 = _context3.sent;
            request = new _mssql["default"].Request(sqlPool1);
            _context3.next = 8;
            return request.input('Id', _mssql["default"].Int, Id).input('Nombres', _mssql["default"].NVarChar, Nombres).input('ApellidoP', _mssql["default"].NVarChar, ApellidoP).input('ApellidoM', _mssql["default"].NVarChar, ApellidoM).input('Email', _mssql["default"].NVarChar, Email).input('Username', _mssql["default"].NVarChar, Username).input('IdPerfil', _mssql["default"].Int, IdPerfil).query('UPDATE SGV_MOE_Usuarios SET Nombres=@Nombres, ApellidoP=@ApellidoP, ApellidoM=@ApellidoM, Email=@Email, Username=@Username, IdPerfil=@IdPerfil  WHERE Id=@Id');

          case 8:
            user = _context3.sent;
            res.json({
              message: "exitoso"
            });

            _mssql["default"].close();

            _context3.next = 16;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 13]]);
  }));

  return function updateUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); //Eliminar Usuario


exports.updateUser = updateUser;

var deleteUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var Id, sqlPool1, request, users;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            Id = req.params.id;
            _context4.next = 4;
            return mssql.GetCreateIfNotExistPool(_DB_Config_SGV["default"]);

          case 4:
            sqlPool1 = _context4.sent;
            request = new _mssql["default"].Request(sqlPool1);
            _context4.next = 8;
            return request.input('Id', _mssql["default"].Int, Id).query('DELETE FROM SGV_MOE_Usuarios WHERE Id=@Id');

          case 8:
            users = _context4.sent;
            res.json(users.recordsets[0]);

            _mssql["default"].close();

            _context4.next = 16;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 13]]);
  }));

  return function deleteUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
/*Usuario especifico
export const getUser = async (req, res) => {
    try {
        const Id = req.params.id;
        let pool = await sql.connect(config);
        let user = await pool.request()
            .input('input_parameter', sql.Int, Id)
            .query('select * from SGV_MOE_Usuarios where Id = @input_parameter');
        res.json(user.recordsets[0]);
        sql.close();
    }
    catch (error) {
        console.log(error);
    }
}
*/


exports.deleteUser = deleteUser;