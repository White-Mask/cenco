"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _transaccion = require("../controllers/transaccion.controller");

var router = (0, _express.Router)();
router.get("/", _transaccion.getTransaccion);
var _default = router;
exports["default"] = _default;