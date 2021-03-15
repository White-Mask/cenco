"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _excluyeLocalAlarma = require("../controllers/excluyeLocalAlarma.controller");

var router = (0, _express.Router)();
router.get("/", _excluyeLocalAlarma.getExcluyeLocalAlarma);
var _default = router;
exports["default"] = _default;