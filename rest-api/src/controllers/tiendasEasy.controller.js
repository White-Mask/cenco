import sql from 'mssql';
import config from '../database/DB_Config_SGV';

//Coleccion de Tiendas Easy
export const getTiendas = async (req,res) => {
    try {
        let pool = await sql.connect(config);
        let tiendas = await pool.request().query("exec SGVMOEGetTiendasEasy");
        res.json( tiendas.recordsets[0]);
        sql.close()
    }
    catch (error) {
        console.log(error);
    }
}