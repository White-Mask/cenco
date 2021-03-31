"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _readOnlyError2 = _interopRequireDefault(require("@babel/runtime/helpers/readOnlyError"));

var _require = require('mssql'),
    ConnectionPool = _require.ConnectionPool;

var POOLS = {}; // create a new connection pool

function CreatePool(config) {
  var key = JSON.stringify(config);
  if (GetPool(key)) throw new Error('Pool already exists');
  POOLS[key] = new ConnectionPool(config).connect();
  return POOLS[key];
} // get a connection pool from all POOLS


function GetPool(name) {
  if (POOLS[name]) return POOLS[name];else return null;
} // if pool already exists, return it, otherwise create it


function GetCreateIfNotExistPool(config) {
  var key = JSON.stringify(config);
  var pool = GetPool(key);
  if (pool) return pool;else return CreatePool(config);
} // close a single pool


function ClosePool(config) {
  var key = JSON.stringify(config);

  if (POOLS[key]) {
    var pool = POOLS[key];
    delete POOLS[key];
    pool.close();
    return true;
  }

  return false;
} // close all the POOLS


function CloseAllPools() {
  POOLS.forEach(function (pool) {
    pool.close();
  });
  POOLS = ((0, _readOnlyError2["default"])("POOLS"), {});
  return true;
}

module.exports = {
  ClosePool: ClosePool,
  CloseAllPools: CloseAllPools,
  CreatePool: CreatePool,
  GetPool: GetPool,
  GetCreateIfNotExistPool: GetCreateIfNotExistPool
};