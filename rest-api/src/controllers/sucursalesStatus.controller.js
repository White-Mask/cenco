import sql from 'mssql';
import config from '../database/DB_Config_SGV';

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

function CrearEstatusTiendaDias(data, tienda) {
    let estatusDias = {
        CodSAP: tienda.CodSAP,
        Local: tienda.Local,
        dia: [
            (data[0].length > 0 && data[0] !== null) ? data[0][0].Estado : null,
            (data[1].length > 0 && data[1] !== null) ? data[1][0].Estado : null,
            (data[2].length > 0 && data[2] !== null) ? data[2][0].Estado : null,
            (data[3].length > 0 && data[3] !== null) ? data[3][0].Estado : null,
            (data[4].length > 0 && data[4] !== null) ? data[4][0].Estado : null,
            (data[5].length > 0 && data[5] !== null) ? data[5][0].Estado : null,
            (data[6].length > 0 && data[6] !== null) ? data[6][0].Estado : null,
            (data[7].length > 0 && data[7] !== null) ? data[7][0].Estado : null,
            (data[8].length > 0 && data[8] !== null) ? data[8][0].Estado : null,
        ]
    }
    return estatusDias
};

//Coleccion estado de sucursales.
export const getSucursalesStatus = async (req, res) => {
    try {
        const dateIni = req.query

        let short = dateIni.ID.split(" ")
        let date = short[0].split("-")
        const today = new Date(date[2], date[1] - 1, date[0])

        let conjuntoDeFechas = ["Local"] //Cambiar NOmbre por Header o head o titulos
        let datosPorFecha = []
        let datos = []


        let pool = await sql.connect(config);

        for (let i = -6; i <= 2; i++) {
            let aux = today.addDays(i).toISOString().substring(0, 10)
            conjuntoDeFechas.push(aux)
            let fecha = await pool.request().input('Fecha', sql.VarChar, aux.replace(/-/g, '')).query("exec SGVMOE_GetSucursalesStatus @Fecha");
            datosPorFecha.push({ Locales: fecha.recordsets[0] });
        }

        let tiendasEasy = await pool.request().query("exec SGVMOEGetTiendasEasy");

        tiendasEasy.recordsets[0].map(tienda => {
            let data = datosPorFecha.map(dia => dia.Locales.filter(local => local.CodSap === tienda.CodSAP))
            datos.push(CrearEstatusTiendaDias(data, tienda))
        })

        res.json({ datos: datos, Fechas: conjuntoDeFechas });
        sql.close();
    }
    catch (error) {
        console.log(error);
    }
}



export const GetDetalleErrorEstadoLocal = async (req, res) => {
    try {
        const data = req.query

        let pool = await sql.connect(config);

        let EstadoLocalDetalleError = await pool.request()
            .input('codSAP', sql.VarChar, data.codSAP)
            .input('fecha', sql.VarChar, data.ID.replace(/-/g, ''))
            .execute("SGVMOE_TLogErrorGetBySucursalFecha");

        res.json({EstadoLocalDetalleError: EstadoLocalDetalleError.recordsets[0]});
        sql.close();
    }
    catch (error) {
        console.log(error);
    }
}