"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// CDP Proc.
var config2 = {
  user: 'sma_appl',
  password: 'aplic321',
  server: 'spmacdp01\\cdp',
  database: 'RETAIL',
  requestTimeout: 180000,
  connectionTimeout: 20000,
  options: {
    encrypt: false,
    enableArithAbort: true,
    tdsVersion: '7_1'
  }
};
var _default = config2;
exports["default"] = _default;