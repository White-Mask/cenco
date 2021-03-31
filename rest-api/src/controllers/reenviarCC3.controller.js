import sql from 'mssql';
let mssql = require('../database/mssql-connection-pooling')
import config_CDP from '../database/DB_Config_CDP';

export const createReenviarCC3 = async (req, res) => {
    try {
        const data = req.query

        let short = data.ID.split(" ")
        let date = short[0].split("-")
        const today = new Date(date[2], date[1] - 1, date[0])
        const fecha = today.toISOString().substring(0, 10)

        //Conexion CDP
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_CDP)
        let request = new sql.Request(sqlPool1)
        let reenviarCC3 = await request
            .input('IdLocalSap', sql.VarChar, data.Local)
            .input('FechaFiscal', sql.VarChar, fecha.replace(/-/g, ''))
            .execute('SP_SMA_MOE_ReenviaInterfacesCC3')

        res.json(true);
        sql.close()

    }
    catch (error) {
        res.json(false);
        sql.close()
    }
}