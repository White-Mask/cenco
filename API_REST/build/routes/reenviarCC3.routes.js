"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _reenviarCC = require("../controllers/reenviarCC3.controller");

var router = (0, _express.Router)();
router.get("/", _reenviarCC.createReenviarCC3);
var _default = router;
exports["default"] = _default;