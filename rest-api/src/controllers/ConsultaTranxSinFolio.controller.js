import sql, { Int } from 'mssql';
let mssql = require('../database/mssql-connection-pooling')
import config_SGV from '../database/DB_Config_SGV';

export const getConsultaTranxSinFolio = async (req,res) => {
    try {
        const fechas = req.query
        let fechaCorta1 = fechas.FechaIni.split(" ")
        let fecha1 = fechaCorta1[0].split("-")
        const FechaIni = new Date(fecha1[2], fecha1[1] - 1, fecha1[0])

        let fechaCorta2 = fechas.FechaFin.split(" ")
        let fecha2 = fechaCorta2[0].split("-")
        const FechaFin = new Date(fecha2[2], fecha2[1] - 1, fecha2[0])

        //Conexion CDP
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request = new sql.Request(sqlPool1)
        let tranxSinFolio = await request
            .input('FechaIni', sql.VarChar, FechaIni.toISOString().substring(0, 10).replace(/-/g, ''))
            .input('FechaFin', sql.VarChar, FechaFin.toISOString().substring(0, 10).replace(/-/g, ''))
            .input('detalle', Int, 0)
            .execute('SGV_Consulta_TranxSinFolio')

        res.json({array: tranxSinFolio.recordsets[0]});
        sql.close()
    }
    catch (error) {
        console.log(error);
        res.json({ message: error.message });
        sql.close()
    }
}