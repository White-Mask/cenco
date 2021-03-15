"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _InterfacesErrorTSAV = require("../controllers/InterfacesErrorTSAV.controller");

var router = (0, _express.Router)();
router.get("/", _InterfacesErrorTSAV.getInterfacesErrorTSAV);
router.get("/enviar-tsav", _InterfacesErrorTSAV.getEnviarTSAV);
var _default = router;
exports["default"] = _default;