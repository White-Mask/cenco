import sql from 'mssql';
let mssql = require('../database/mssql-connection-pooling')
import config_CDP from '../database/DB_Config_CDP';

export const createInterfazVTA = async (req, res) => {
    try {
        const data = req.query
        let short = data.ID.split(" ")
        let date = short[0].split("-")
        const today = new Date(date[2], date[1] - 1, date[0])
        const fecha = today.toISOString().substring(0, 10)

        //Conexion CDP
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_CDP)
        let request = new sql.Request(sqlPool1)
        let interfazVTA = await request
            .input('fecha', sql.VarChar, fecha.replace(/-/g, ''))
            .input('local', sql.VarChar, data.Local)
            .input('bandera', sql.Int, data.Flag === 'true' ? 1 : 0)
            .execute('SP_SMA_MOE_GeneraInterfazVenta')

        let n = interfazVTA.recordsets.length

        res.json({
            title: interfazVTA.recordsets[n - 1][0].Mensaje,
            text: interfazVTA.recordsets[n - 1][0].Ruta
        });
        sql.close()
    }
    catch (error) {
        console.log(error.message);
        res.json({ title: "ERROR", text: error.message });
        sql.close()
    }
}