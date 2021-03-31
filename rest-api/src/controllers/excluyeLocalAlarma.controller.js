import sql from 'mssql';
let mssql = require('../database/mssql-connection-pooling')
import config_CDP from '../database/DB_Config_CDP';

export const getExcluyeLocalAlarma = async (req, res) => {
    try {
        const data = req.query

        //Conexion CDP
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_CDP)
        let request = new sql.Request(sqlPool1)
        let excluyeLocalAlarma = await request
            .input('tienda', sql.VarChar, data.Local)
            .execute('SP_SMA_MOE_InsertTiendaExcluyeLocalAlarma')

        res.json(
            excluyeLocalAlarma > 0 ?
                true
            :
                false

        );
        sql.close()
    }
    catch (error) {
        res.json(false);
        sql.close()
    }
}