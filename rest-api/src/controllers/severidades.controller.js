import sql from 'mssql';
let mssql = require('../database/mssql-connection-pooling')
import config_SGV from '../database/DB_Config_SGV';

//Coleccion de usuarios
export const getSeveridades = async (req, res) => {
    try {

        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request = new sql.Request(sqlPool1)
        let severidades = await request.query("SELECT * FROM SGV_MOE_LogSeverity");

        res.json(severidades.recordsets[0]);

        sql.close()
    }
    catch (error) {
        console.log(error);
    }
}