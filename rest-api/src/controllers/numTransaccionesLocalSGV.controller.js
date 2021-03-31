import sql from 'mssql';
import config from '../database/DB_Config_SGV';

//Numero de transacciones por local (SGV).
export const getNumTransaccionLocalSGV = async (req,res) => {
    try {
        // const {fecha} = req.body;
        const fecha = '20210205';

        let pool = await sql.connect(config);
        // let users = await pool.request().input('Fecha', sql.VarChar, fecha).query('exec SGVMOEGetCantidadTransaccionesLocal @Fecha');
        let users = await pool.request().input('Fecha', sql.VarChar, fecha).query('exec SGVMOEGetCantidadTransaccionesLocal @Fecha');
        res.json( users.recordsets[0]);
        sql.close()
    }
    catch (error) {
        console.log(error);
    }
}