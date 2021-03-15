"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _users = require("../controllers/users.controller");

var router = (0, _express.Router)();
//Crear usuario
router.post('/', _users.createUser); //Obtener usuarios

router.get('/', _users.getUsers); //Actualizar usuario

router.put('/:id', _users.updateUser); //Eliminar usuario

router["delete"]('/:id', _users.deleteUser);
/*Obtener usuario
router.get('/:id', getUser);
*/

var _default = router;
exports["default"] = _default;