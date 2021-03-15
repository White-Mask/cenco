"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _tiposEstados = require("../controllers/tiposEstados.controller");

var router = (0, _express.Router)();
router.get("/", _tiposEstados.getTiposEstados);
var _default = router;
exports["default"] = _default;