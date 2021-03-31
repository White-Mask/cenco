import sql from 'mssql';
let mssql = require('../database/mssql-connection-pooling')
import config_SGV from '../database/DB_Config_SGV';

//Obtener Perfiles
export const getPerfiles = async (req, res) => {
    try {

        //Conexion SGV
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request = new sql.Request(sqlPool1)
        let perfiles = await request.query('SELECT * FROM SGV_MOE_Perfiles')
        res.json(perfiles.recordsets[0]);
        sql.close()
    }
    catch (error) {
        console.log(error);
        sql.close()
    }
}

//Crear Perfiles
/*
export const createPerfiles = async (req, res) => {
    try {

        //Conexion SGV
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request = new sql.Request(sqlPool1)
        let perfiles = await request
            .input('Perfil', sql.VarChar, Perfil)
            .query('INSERT INTO SGV_MOE_Perfiles (Perfil) VALUES (@Perfil) RETURNING id')

        const { id } = perfiles.rows[0];

        modulos.map( modulo => {
            let request2 = new sql.Request(sqlPool1)
            let perfilesModulo = await request2
            .input('IdPerfil', sql.VarChar, id)
            .input('IdModulo', sql.VarChar, modulo)
            .query('INSERT INTO SGV_MOE_ModulosPerfiles (IdPerfil, IdModulo) VALUES (@IdPerfil, @IdModulo)')
        })

        res.json({ message: `El perfil fue creado exitosamente!` });
        sql.close()
    }
    catch (error) {
        console.log(error);
        sql.close()
    }
}

//Crear editar
export const editPerfiles = async (req, res) => {
    try {

        //Conexion SGV
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request = new sql.Request(sqlPool1)
        let perfiles = await request
            .input('Perfil', sql.VarChar, Perfil)
            .query('INSERT INTO SGV_MOE_Perfiles (Perfil) VALUES (@Perfil) RETURNING id')

        const { id } = perfiles.rows[0];

        modulos.map( modulo => {
            let request2 = new sql.Request(sqlPool1)
            let perfilesModulo = await request2
            .input('IdPerfil', sql.VarChar, id)
            .input('IdModulo', sql.VarChar, modulo)
            .query('INSERT INTO SGV_MOE_ModulosPerfiles (IdPerfil, IdModulo) VALUES (@IdPerfil, @IdModulo)')
        })

        res.json({ message: `El perfil fue creado exitosamente!` });
        sql.close()
    }
    catch (error) {
        console.log(error);
        sql.close()
    }
}
*/
//Obtener Modulos
export const getModulos = async (req, res) => {
    try {

        //Conexion SGV
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request = new sql.Request(sqlPool1)
        let modelos = await request
            .query('SELECT * FROM SGV_MOE_Modulos')

        res.json({ Modulos: modelos.recordsets[0] });
        sql.close()
    }
    catch (error) {
        console.log(error);
        sql.close()
    }
}

//Obtener la tabla comun de perfiles/modulos con un join
export const getModulosId = async (req, res) => {
    try {
        const data = req.query;

        //Conexion SGV
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)

        let request = new sql.Request(sqlPool1)
        let perfilsModelos = await request
            .input('IdPerfil', sql.VarChar, data.IdPerfil)
            .query('SELECT * FROM SGV_MOE_ModulosPerfiles WHERE IdPerfil = @IdPerfil')


        let request2 = new sql.Request(sqlPool1)
        let modelos = await request2
            .query('SELECT * FROM SGV_MOE_Modulos')

        let results = []

        perfilsModelos.recordsets[0].map(item => (
            results.push(Object.assign({}, item, modelos.recordsets[0].find(modelo => modelo.Id === item.IdModulo)))
        ))

        res.json(results);
        sql.close()
    }
    catch (error) {
        console.log(error);
        sql.close()
    }
}

//Crear Modulos
export const createModulo = async (req, res) => {
    try {

        let nombreModulo = req.query

        //Conexion SGV
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request = new sql.Request(sqlPool1)
        let modulo = await request
            .input('Modulo', sql.VarChar, nombreModulo)
            .query('INSERT INTO SGV_MOE_Modulos (Modulo) VALUES (@Modulo)');

        res.json({ message: `El modulo ${nombreModulo} fue creado exitosamente!` });
        sql.close()
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        sql.close()
    }
}

//Actualizar Modulo
export const updateModulo = async (req, res) => {
    try {

        let { Id, nombreModulo } = req.query

        //Conexion SGV
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request = new sql.Request(sqlPool1)
        let modulo = await request
            .input('Id', sql.VarChar, Id)
            .input('Modulo', sql.VarChar, nombreModulo)
            .query('UPDATE SGV_MOE_Modulos SET Modulo=@Modulo WHERE Id=@Id');

        res.json({ message: `El modulo ${nombreModulo} fue actualizado exitosamente!` });
        sql.close()
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        sql.close()
    }
}

//Eliminar Modulo
export const deleteModulo = async (req, res) => {
    try {

        let { Id } = req.query

        //Conexion SGV
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)

        let request = new sql.Request(sqlPool1)
        let moduloPerfil = await request
            .input('Id', sql.VarChar, Id)
            .query('DELETE FROM SGV_MOE_ModulosPerfiles WHERE IdModulo=@Id');

        let request2 = new sql.Request(sqlPool1)
        let modulo = await request2
            .input('Id', sql.VarChar, Id)
            .query('DELETE FROM SGV_MOE_Modulos WHERE Id=@Id');

        res.json({ message: `El modulo fue eliminado exitosamente!` });
        sql.close()
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        sql.close()
    }
}

/*
export const insertPerfil = async (req, res) => {
    try {
        const data = req.query
        //Conexion SGV
        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request = new sql.Request(sqlPool1)
        let insertPerfil = await request
            .input('Modulo', sql.VarChar, data.Modulo) // nombre del modulo
            .query('INSERT INTO SGV_MOE_Modulos (Modulo) VALUES (@Modulo)')

        data.Perfiles.map(perfil => {
            let insertModuloPerfil = await request
                .input('IdModulo', sql.VarChar, data.modulos)
                .input('IdPerfil', sql.VarChar, perfil)
                .query('INSERT INTO SGV_MOE_ModulosPerfiles (Perfil) VALUES (@Perfil)')
        })

        res.json({ message: "La operación crear perfil fue realizada con exito." });
        sql.close()
    }
    catch (error) {
        console.log(error);
        sql.close()
    }
}
*/