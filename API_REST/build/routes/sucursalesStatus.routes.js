"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _sucursalesStatus = require("../controllers/sucursalesStatus.controller");

var router = (0, _express.Router)();
router.get("/", _sucursalesStatus.getSucursalesStatus);
router.get("/DetalleErrorEstadoLocal", _sucursalesStatus.GetDetalleErrorEstadoLocal);
var _default = router;
exports["default"] = _default;