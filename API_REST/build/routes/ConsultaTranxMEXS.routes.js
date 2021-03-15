"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _ConsultaTranxMEXS = require("../controllers/ConsultaTranxMEXS.controller");

var router = (0, _express.Router)();
router.get("/", _ConsultaTranxMEXS.getConsultaTranxMEXS);
var _default = router;
exports["default"] = _default;