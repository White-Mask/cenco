"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _numTransaccionesLocalCDP = require("../controllers/numTransaccionesLocalCDP.controller");

var router = (0, _express.Router)();
router.get("/", _numTransaccionesLocalCDP.getNumTransaccionLocalCDP);
var _default = router;
exports["default"] = _default;