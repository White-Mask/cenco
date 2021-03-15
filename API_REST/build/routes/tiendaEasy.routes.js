"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _tiendasEasy = require("../controllers/tiendasEasy.controller");

var router = (0, _express.Router)();
router.get("/", _tiendasEasy.getTiendas);
var _default = router;
exports["default"] = _default;