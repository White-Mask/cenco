const { ConnectionPool } = require('mssql')
const POOLS = {}

// create a new connection pool
function CreatePool(config) {
    let key = JSON.stringify(config)

    if (GetPool(key))
        throw new Error('Pool already exists')

    POOLS[key] = (new ConnectionPool(config)).connect()
    return POOLS[key]
}

// get a connection pool from all POOLS
function GetPool(name) {
    if (POOLS[name])
        return POOLS[name]
    else
        return null
}

// if pool already exists, return it, otherwise create it
function GetCreateIfNotExistPool(config) {
    let key = JSON.stringify(config)

    let pool = GetPool(key)
    if (pool)
        return pool
    else
        return CreatePool(config)
}

// close a single pool
function ClosePool(config) {
    let key = JSON.stringify(config)

    if (POOLS[key]) {
        const pool = POOLS[key];
        delete POOLS[key];
        pool.close()
        return true
    }
    return false
}

// close all the POOLS
function CloseAllPools() {
    POOLS.forEach(pool => {
        pool.close()
    })
    POOLS = {}
    return true
}

module.exports = {
    ClosePool,
    CloseAllPools,
    CreatePool,
    GetPool,
    GetCreateIfNotExistPool
}