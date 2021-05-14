import sql from 'mssql';
let mssql = require('../database/mssql-connection-pooling')
import config_CDP from '../database/DB_Config_CDP';

export const getEAMTRAN = async (req,res) => {
    try {
        const data = req.query
        let short = data.ID.split(" ")
        let date = short[0].split("-")
        const today = new Date(date[2], date[1] - 1, date[0])
        const fecha = today.toISOString().substring(0, 10)

        //Conexion CDP
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_CDP)
        let request = new sql.Request(sqlPool1)
        let EAMTRAN = await request.input('IdLocalSap', sql.VarChar, data.Local).input('FechaFiscal', sql.VarChar, fecha.replace(/-/g, '')).execute('SP_SMA_MOE_GetDetalleEAMTRAN')

        res.json({array: EAMTRAN.recordsets[0], fecha: fecha});
        sql.close()
    }
    catch (error) {
        console.log(error);
        sql.close()
    }
}

export const updateEAMTRAN = async (req,res) => {
    try {
        const data = req.body
        let short = data.fechaUltimoLote.split(" ")
        let date = short[0].split("-")
        const today = new Date(date[2], date[1] - 1, date[0])
        fechaReset = today.setHours(8,0,0,0)

        //Conexion CDP
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_CDP)
        let request = new sql.Request(sqlPool1)
        let updateEAMTRAN = await request
            .input('Eamtran', sql.VarChar, data.eamtran)
            .input('UltimoLote', sql.VarChar, data.ultimoLote)
            .input('FechaUltimoLote', sql.VarChar,fechaReset)
            .input('IdLocalSAP', sql.VarChar, data.local)
            .input('FechaFiscal', sql.VarChar, data.fechaFiscal)
            .input('FechaUltimoLoteOrig', sql.VarChar, data.fechaUltimoLoteOrig)
            .input('Status', sql.VarChar, data.status)
            .execute('SP_SMA_MOE_UpdateDetalleEAMTRAN')

        res.json({array: updateEAMTRAN.recordsets[0]});
        sql.close()
    }
    catch (error) {
        console.log(error);
        sql.close()
    }
}