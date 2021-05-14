import sql from 'mssql';
let mssql = require('../database/mssql-connection-pooling')
import config_SGV from '../database/DB_Config_SGV';


export const getInterfacesErrorTSAV = async (req, res) => {
    try {
        const data = req.query

        let fecha = ''
        if (req.query.ID !== '') {
            let short = data.ID.split(" ")
            let date = short[0].split("-")
            let today = new Date(date[2], date[1] - 1, date[0])
            fecha = today.toISOString().substring(0, 10).replace(/-/g, '')
        }

        //Conexion CDP
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request = new sql.Request(sqlPool1)
        let InterfazTSAV = await request
            .input('Fecha', sql.VarChar, fecha)
            .input('Tienda', sql.VarChar, data.Local)
            .input('InterfaceType', sql.VarChar, data.TipoInterfaz)
            .input('InterfaceStatus', sql.VarChar, data.Estado)
            .execute('SGVMOE_GetInterfacesReenvio')

        res.json({ InterfazTSAV: InterfazTSAV.recordsets[0] });

        sql.close()
    }
    catch (error) {
        console.log(error);
    }
}

export const getEnviarTSAV = async (req, res) => {
    try {
        const data = req.query

        let pool = await sql.connect(config_SGV);
        
        for (codigoInterface in data.selected) {
            let InterfazTSAV = await pool.request().input('InterfaceQueueID', sql.Int, codigoInterface).input('Estadofinal', sql.Int, 1).execute('SGVMOE_ReenvioGeneralInterfaz')
        }
        
        res.json(true);
        sql.close()
    }
    catch (error) {
        res.json(error);
    }
}