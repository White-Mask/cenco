"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _GeneraInterfazVta = require("../controllers/GeneraInterfazVta.controller");

var router = (0, _express.Router)();
router.get("/", _GeneraInterfazVta.createInterfazVTA);
var _default = router;
exports["default"] = _default;