"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _EAMTRAN = require("../controllers/EAMTRAN.controller");

var router = (0, _express.Router)();
router.get("/", _EAMTRAN.getEAMTRAN);
router.put("/", _EAMTRAN.updateEAMTRAN);
var _default = router;
exports["default"] = _default;