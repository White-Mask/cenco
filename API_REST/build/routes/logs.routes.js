"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _Logs = require("../controllers/Logs.controller");

var router = (0, _express.Router)();
router.get("/", _Logs.getLogs);
router.get("/insert", _Logs.insertLogs);
router.get("/verificar", _Logs.verificarInterfazVTA);
var _default = router;
exports["default"] = _default;