"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _severidades = require("../controllers/severidades.controller");

var router = (0, _express.Router)();
router.get("/", _severidades.getSeveridades);
var _default = router;
exports["default"] = _default;