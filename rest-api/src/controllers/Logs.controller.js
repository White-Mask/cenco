import sql from 'mssql';
let mssql = require('../database/mssql-connection-pooling')
import config_SGV from '../database/DB_Config_SGV';

//Coleccion de logs
export const getLogs = async (req, res) => {
    try {

        const data = req.query
        let short = data.fecha.split(" ")
        let date = short[0].split("-")
        const today = new Date(date[2], date[1] - 1, date[0])
        const fecha = today.toISOString().substring(0, 10)

        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request = new sql.Request(sqlPool1)
        let logs = await request
            .input('Username', sql.VarChar, data.usuarios !== '' ? data.usuarios : null)
            .input('FechaHora', sql.VarChar, fecha.replace(/-/g, ''))
            .input('Accion', sql.VarChar, data.accion !== '' ? data.accion : null)
            .input('Extra', sql.VarChar, data.dataExtra !== '' ? data.dataExtra : null)
            .input('Severity', sql.Int, data.severidad !== '' ? data.severidad : null)
            .execute("SGVMOE_GetLogs")

        res.json(logs.recordsets[0]);
        sql.close()
    }
    catch (error) {
        console.log(error);
    }
}

export const insertLogs = async (req, res) => {
    try {
        const data = req.query
        console.log(data)
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request = new sql.Request(sqlPool1)
        let logs = await request
            .input('Username', sql.VarChar, data.usuarios)
            .input('Accion', sql.VarChar, data.accion)
            .input('Severity', sql.Int, data.severidad)
            .input('Extra', sql.VarChar, data.dataExtra)
            .execute("SGVMOE_RegistraLog")
        
        res.json(logs.recordsets[0]);
        res.json(true);
        sql.close()
    }
    catch (error) {
        console.log(error);
    }
}

export const verificarInterfazVTA = async (req, res) => {
    try {
        const data = req.query
        let short = data.ID.split(" ")
        let date = short[0].split("-")
        const today = new Date(date[2], date[1] - 1, date[0])
        const fecha = today.toISOString().substring(0, 10)

        //Conexion CDP
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request = new sql.Request(sqlPool1)
        let verificarInterfazVTA = await request.input('Fecha', sql.VarChar, fecha.replace(/-/g, '')).input('Local', sql.VarChar, data.Local).query('select * from SGV_MOE_Log where Accion = \'Reenvia Interface Venta\' AND CONVERT(VARCHAR(8),FechaHora,112) = CONVERT(VARCHAR(8),GETDATE(),112)  AND SUBSTRING(extra,1,4) =@Local AND SUBSTRING(Extra,6,10) =@Fecha')

        res.json({ array: verificarInterfazVTA.recordsets[0], existe: verificarInterfazVTA.recordsets[0].length > 0 ? true : false });
        sql.close()
    }
    catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
        sql.close()
    }
}