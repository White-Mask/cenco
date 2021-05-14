import sql from 'mssql';
let mssql = require('../database/mssql-connection-pooling')
import config_SGV from '../database/DB_Config_SGV';

//Coleccion de Transacciones
export const getTransaccion = async (req, res) => {
    try {

        const data = req.query
        let fechaCorta1 = data.selectedDate.split(" ")
        let fecha1 = fechaCorta1[0].split("-")
        const FechaIni = new Date(fecha1[2], fecha1[1] - 1, fecha1[0])

        const fecha = FechaIni.toISOString().substring(0, 10)

        //Conexion CDP
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request = new sql.Request(sqlPool1)
        let transacciones = await request
            .input('IdTLogHeader', sql.VarChar, data.IdTLogHeader === '' ? null : data.IdTLogHeader)
            .input('IdTlogDetail', sql.VarChar, data.IdTlogDetail === '' ? null : data.IdTlogDetail)
            .input('Fecha', sql.VarChar, fecha.replace(/-/g, ''))
            .input('CodSAP', sql.VarChar, data.Local)
            .input('Terminal', sql.VarChar, data.Terminal === '' ? null : data.Terminal)
            .input('Transnunm', sql.VarChar, data.NumTransaccion === '' ? null : data.NumTransaccion)
            .input('Folio', sql.VarChar, data.Folio === '' ? null : data.Folio)
            .input('TipoDTE', sql.Int, data.TipoDTE === '' ? null : data.TipoDTE)
            .input('CanalVenta', sql.Int, data.CanalVTA === '' ? null : data.CanalVTA)
            .execute('SGVMOEGetTransaccion')

        res.json({transacciones: transacciones.recordsets[0]})
        sql.close()
    }
    catch (error) {
        console.log(error);
    }
}