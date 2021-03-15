"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _perfiles = require("../controllers/perfiles.controller");

var router = (0, _express.Router)();
router.get("/", _perfiles.getPerfiles);
router.get("/modulos", _perfiles.getModulos);
router.get("/modulosid", _perfiles.getModulosId);
var _default = router;
exports["default"] = _default;