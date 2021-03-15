"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _totalesCDP = require("../controllers/totalesCDP.controller");

var router = (0, _express.Router)();
router.get("/", _totalesCDP.getTotalesCDP);
var _default = router;
exports["default"] = _default;