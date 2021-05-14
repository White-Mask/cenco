import sql from 'mssql';
let mssql = require('../database/mssql-connection-pooling')
import config_CDP from '../database/DB_Config_CDP';
import config_SGV from '../database/DB_Config_SGV';

function merge(local, sgv, cdp, interfaces) {

    let trxLocal = {

        CodSAP: local.CodSAP,

        Local: local.Local,

        TotalSGV: sgv === undefined ? 0 : sgv.Total,

        TotalCDP: cdp === undefined ? 0 : cdp.Total,

        interfaces: interfaces === undefined ? 'Pendiente' : interfaces.Interfaz,

        LoteTeradata: cdp === undefined ? '' : (cdp.LoteTeradata !== null ? cdp.LoteTeradata : "Pendiente")
    }
    return trxLocal
}

//Numero de transacciones por local (SGV).
export const getNumTransaccionLocalCDP = async (req, res) => {
    try {
        const dateIni = req.query

        let short = dateIni.ID.split(" ")
        let date = short[0].split("-")
        const today = new Date(date[2], date[1] - 1, date[0])

        const fecha = today.toISOString().substring(0, 10)

        let result = []

        //Conexion CDP
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_CDP)
        let request = new sql.Request(sqlPool1)
        let CDP_trx = await request.input('Fecha', sql.VarChar, fecha.replace(/-/g, '')).execute('SP_SMA_MOE_GetCantidadTransaccionesLocal')

        let sqlPool2 = await mssql.GetCreateIfNotExistPool(config_CDP)
        let request2 = new sql.Request(sqlPool2)
        let interfaces = await request2.input('Fecha', sql.VarChar, fecha.replace(/-/g, '')).execute('SP_SMA_MOE_GetNombresInterfacesVentas')
        let aux = interfaces.recordsets[0]

        //Conexion SGV
        let sqlPool3 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request3 = new sql.Request(sqlPool3)
        let SGV_trx = await request3.input('Fecha', sql.VarChar, fecha.replace(/-/g, '')).execute('SGVMOEGetCantidadTransaccionesLocal')

        let sqlPool4 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request4 = new sql.Request(sqlPool4)
        let locales = await request4.execute('SGVMOEGetTiendasEasy')

        locales.recordsets[0].map((obj, i) => {
            let x = CDP_trx.recordsets[0].find(c => c.Local === obj.CodSAP)
            let y = SGV_trx.recordsets[0].find(c => c.Local.includes(obj.Local))
            let z = interfaces.recordsets[0].find(c => c.Local === obj.CodSAP)

            result.push(merge(obj, y, x, z))
        })

        res.json(result);
        sql.close()
    }
    catch (error) {
        console.log(error);
        sql.close()
    }
}