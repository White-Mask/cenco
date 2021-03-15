"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// SGV Testing

/*
const config = {
  user : 'sa',
  password : 'Cencosud123',
  server : 'G500603SV934\\sqlsgv',
  database : 'SGV',
  options : {
      encrypt: false,
      enableArithAbort: true
  }
};

*/
// SGV Proc.
var config = {
  user: '_SGVIntegra',
  password: '34u8zwg8r',
  server: 'G500603SV1081',
  database: 'SGV',
  requestTimeout: 60000,
  connectionTimeout: 3000,
  options: {
    encrypt: false,
    enableArithAbort: true
  }
};
var _default = config;
exports["default"] = _default;