import sql from 'mssql';
let mssql = require('../database/mssql-connection-pooling')
import config_SGV from '../database/DB_Config_SGV';

//Coleccion de los tipos de estados.
export const getTiposEstados = async (req,res) => {
    try {
        //Conexion sgv
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request = new sql.Request(sqlPool1)
        let tiposEstados = await request.execute('SGVMOE_GetInterfacesStatus')

        res.json(tiposEstados.recordsets[0]);
        sql.close()
    }
    catch (error) {
        console.log(error);
        sql.close()
    }
}