"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteModulo = exports.updateModulo = exports.createModulo = exports.getModulosId = exports.getModulos = exports.getPerfiles = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mssql = _interopRequireDefault(require("mssql"));

var _DB_Config_SGV = _interopRequireDefault(require("../database/DB_Config_SGV"));

var mssql = require('../database/mssql-connection-pooling');

//Obtener Perfiles
var getPerfiles = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var sqlPool1, request, perfiles;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return mssql.GetCreateIfNotExistPool(_DB_Config_SGV["default"]);

          case 3:
            sqlPool1 = _context.sent;
            request = new _mssql["default"].Request(sqlPool1);
            _context.next = 7;
            return request.query('SELECT * FROM SGV_MOE_Perfiles');

          case 7:
            perfiles = _context.sent;
            res.json(perfiles.recordsets[0]);

            _mssql["default"].close();

            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

            _mssql["default"].close();

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function getPerfiles(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //Crear Perfiles

/*
export const createPerfiles = async (req, res) => {
    try {

        //Conexion SGV
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request = new sql.Request(sqlPool1)
        let perfiles = await request
            .input('Perfil', sql.VarChar, Perfil)
            .query('INSERT INTO SGV_MOE_Perfiles (Perfil) VALUES (@Perfil) RETURNING id')

        const { id } = perfiles.rows[0];

        modulos.map( modulo => {
            let request2 = new sql.Request(sqlPool1)
            let perfilesModulo = await request2
            .input('IdPerfil', sql.VarChar, id)
            .input('IdModulo', sql.VarChar, modulo)
            .query('INSERT INTO SGV_MOE_ModulosPerfiles (IdPerfil, IdModulo) VALUES (@IdPerfil, @IdModulo)')
        })

        res.json({ message: `El perfil fue creado exitosamente!` });
        sql.close()
    }
    catch (error) {
        console.log(error);
        sql.close()
    }
}

//Crear editar
export const editPerfiles = async (req, res) => {
    try {

        //Conexion SGV
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request = new sql.Request(sqlPool1)
        let perfiles = await request
            .input('Perfil', sql.VarChar, Perfil)
            .query('INSERT INTO SGV_MOE_Perfiles (Perfil) VALUES (@Perfil) RETURNING id')

        const { id } = perfiles.rows[0];

        modulos.map( modulo => {
            let request2 = new sql.Request(sqlPool1)
            let perfilesModulo = await request2
            .input('IdPerfil', sql.VarChar, id)
            .input('IdModulo', sql.VarChar, modulo)
            .query('INSERT INTO SGV_MOE_ModulosPerfiles (IdPerfil, IdModulo) VALUES (@IdPerfil, @IdModulo)')
        })

        res.json({ message: `El perfil fue creado exitosamente!` });
        sql.close()
    }
    catch (error) {
        console.log(error);
        sql.close()
    }
}
*/
//Obtener Modulos


exports.getPerfiles = getPerfiles;

var getModulos = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var sqlPool1, request, modelos;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return mssql.GetCreateIfNotExistPool(_DB_Config_SGV["default"]);

          case 3:
            sqlPool1 = _context2.sent;
            request = new _mssql["default"].Request(sqlPool1);
            _context2.next = 7;
            return request.query('SELECT * FROM SGV_MOE_Modulos');

          case 7:
            modelos = _context2.sent;
            res.json({
              Modulos: modelos.recordsets[0]
            });

            _mssql["default"].close();

            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

            _mssql["default"].close();

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12]]);
  }));

  return function getModulos(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //Obtener la tabla comun de perfiles/modulos con un join


exports.getModulos = getModulos;

var getModulosId = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var data, sqlPool1, request, perfilsModelos, request2, modelos, results;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            data = req.query; //Conexion SGV

            _context3.next = 4;
            return mssql.GetCreateIfNotExistPool(_DB_Config_SGV["default"]);

          case 4:
            sqlPool1 = _context3.sent;
            request = new _mssql["default"].Request(sqlPool1);
            _context3.next = 8;
            return request.input('IdPerfil', _mssql["default"].VarChar, data.IdPerfil).query('SELECT * FROM SGV_MOE_ModulosPerfiles WHERE IdPerfil = @IdPerfil');

          case 8:
            perfilsModelos = _context3.sent;
            request2 = new _mssql["default"].Request(sqlPool1);
            _context3.next = 12;
            return request2.query('SELECT * FROM SGV_MOE_Modulos');

          case 12:
            modelos = _context3.sent;
            results = [];
            perfilsModelos.recordsets[0].map(function (item) {
              return results.push(Object.assign({}, item, modelos.recordsets[0].find(function (modelo) {
                return modelo.Id === item.IdModulo;
              })));
            });
            res.json(results);

            _mssql["default"].close();

            _context3.next = 23;
            break;

          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);

            _mssql["default"].close();

          case 23:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 19]]);
  }));

  return function getModulosId(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); //Crear Modulos


exports.getModulosId = getModulosId;

var createModulo = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var nombreModulo, sqlPool1, request, modulo;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            nombreModulo = req.query; //Conexion SGV

            _context4.next = 4;
            return mssql.GetCreateIfNotExistPool(_DB_Config_SGV["default"]);

          case 4:
            sqlPool1 = _context4.sent;
            request = new _mssql["default"].Request(sqlPool1);
            _context4.next = 8;
            return request.input('Modulo', _mssql["default"].VarChar, nombreModulo).query('INSERT INTO SGV_MOE_Modulos (Modulo) VALUES (@Modulo)');

          case 8:
            modulo = _context4.sent;
            res.json({
              message: "El modulo ".concat(nombreModulo, " fue creado exitosamente!")
            });

            _mssql["default"].close();

            _context4.next = 17;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              message: _context4.t0.message
            });

            _mssql["default"].close();

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 13]]);
  }));

  return function createModulo(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); //Actualizar Modulo


exports.createModulo = createModulo;

var updateModulo = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$query, Id, nombreModulo, sqlPool1, request, modulo;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$query = req.query, Id = _req$query.Id, nombreModulo = _req$query.nombreModulo; //Conexion SGV

            _context5.next = 4;
            return mssql.GetCreateIfNotExistPool(_DB_Config_SGV["default"]);

          case 4:
            sqlPool1 = _context5.sent;
            request = new _mssql["default"].Request(sqlPool1);
            _context5.next = 8;
            return request.input('Id', _mssql["default"].VarChar, Id).input('Modulo', _mssql["default"].VarChar, nombreModulo).query('UPDATE SGV_MOE_Modulos SET Modulo=@Modulo WHERE Id=@Id');

          case 8:
            modulo = _context5.sent;
            res.json({
              message: "El modulo ".concat(nombreModulo, " fue actualizado exitosamente!")
            });

            _mssql["default"].close();

            _context5.next = 17;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](0);
            res.status(500).json({
              message: _context5.t0.message
            });

            _mssql["default"].close();

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 13]]);
  }));

  return function updateModulo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); //Eliminar Modulo


exports.updateModulo = updateModulo;

var deleteModulo = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var Id, sqlPool1, request, moduloPerfil, request2, modulo;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            Id = req.query.Id; //Conexion SGV

            _context6.next = 4;
            return mssql.GetCreateIfNotExistPool(_DB_Config_SGV["default"]);

          case 4:
            sqlPool1 = _context6.sent;
            request = new _mssql["default"].Request(sqlPool1);
            _context6.next = 8;
            return request.input('Id', _mssql["default"].VarChar, Id).query('DELETE FROM SGV_MOE_ModulosPerfiles WHERE IdModulo=@Id');

          case 8:
            moduloPerfil = _context6.sent;
            request2 = new _mssql["default"].Request(sqlPool1);
            _context6.next = 12;
            return request2.input('Id', _mssql["default"].VarChar, Id).query('DELETE FROM SGV_MOE_Modulos WHERE Id=@Id');

          case 12:
            modulo = _context6.sent;
            res.json({
              message: "El modulo fue eliminado exitosamente!"
            });

            _mssql["default"].close();

            _context6.next = 21;
            break;

          case 17:
            _context6.prev = 17;
            _context6.t0 = _context6["catch"](0);
            res.status(500).json({
              message: _context6.t0.message
            });

            _mssql["default"].close();

          case 21:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 17]]);
  }));

  return function deleteModulo(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
/*
export const insertPerfil = async (req, res) => {
    try {
        const data = req.query
        //Conexion SGV
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request = new sql.Request(sqlPool1)
        let insertPerfil = await request
            .input('Modulo', sql.VarChar, data.Modulo) // nombre del modulo
            .query('INSERT INTO SGV_MOE_Modulos (Modulo) VALUES (@Modulo)')

        data.Perfiles.map(perfil => {
            let insertModuloPerfil = await request
                .input('IdModulo', sql.VarChar, data.modulos)
                .input('IdPerfil', sql.VarChar, perfil)
                .query('INSERT INTO SGV_MOE_ModulosPerfiles (Perfil) VALUES (@Perfil)')
        })

        res.json({ message: "La operación crear perfil fue realizada con exito." });
        sql.close()
    }
    catch (error) {
        console.log(error);
        sql.close()
    }
}
*/


exports.deleteModulo = deleteModulo;