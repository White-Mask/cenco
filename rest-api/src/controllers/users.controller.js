import sql from 'mssql';
let mssql = require('../database/mssql-connection-pooling')
import config_SGV from '../database/DB_Config_SGV';

//Coleccion de usuarios
export const getUsers = async (req, res) => {
    try {
        let results = []

        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request = new sql.Request(sqlPool1)
        let users = await request.query("select * from SGV_MOE_Usuarios");

        let request2 = new sql.Request(sqlPool1)
        let perfiles = await request2.query("SELECT * FROM SGV_MOE_Perfiles");


        users.recordsets[0].map(item => {
            let perfil = perfiles.recordsets[0].find(rol => rol.Id === item.IdPerfil)
            results.push(Object.assign(item, { perfil: perfil.Perfil }))
        })

        res.json(results);

        sql.close()
    }
    catch (error) {
        console.log(error);
    }
}

//Crear Usuario
export const createUser = async (req, res) => {
    try {
        const {Nombres, ApellidoP, ApellidoM, Email, Username, IdPerfil} = req.body;

        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request = new sql.Request(sqlPool1)
        let user = await request
            .input('Nombres', sql.NVarChar, Nombres)
            .input('ApellidoP', sql.NVarChar, ApellidoP)
            .input('ApellidoM', sql.NVarChar, ApellidoM)
            .input('Email', sql.NVarChar, Email)
            .input('Username', sql.NVarChar, Username)
            //.input('Password', sql.NVarChar, Password)
            .input('IdPerfil', sql.Int, IdPerfil)
            .query('INSERT INTO SGV_MOE_Usuarios (Nombres, ApellidoP, ApellidoM, Email, Username, Password, IdPerfil) VALUES (@Nombres, @ApellidoP, @ApellidoM, @Email, @Username, \'\',  @IdPerfil)');//@Password,

        res.json({message: "exitoso"})
        sql.close();
    }
    catch (error) {
        console.log(error);
    }
}

//Actualizar Usuario
export const updateUser = async (req, res) => {
    try {
        const { Id, Nombres, ApellidoP, ApellidoM, Email, Username, IdPerfil } = req.body;

        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request = new sql.Request(sqlPool1)
        let user = await request
            .input('Id', sql.Int, Id)
            .input('Nombres', sql.NVarChar, Nombres)
            .input('ApellidoP', sql.NVarChar, ApellidoP)
            .input('ApellidoM', sql.NVarChar, ApellidoM)
            .input('Email', sql.NVarChar, Email)
            .input('Username', sql.NVarChar, Username)
            .input('IdPerfil', sql.Int, IdPerfil)
            .query('UPDATE SGV_MOE_Usuarios SET Nombres=@Nombres, ApellidoP=@ApellidoP, ApellidoM=@ApellidoM, Email=@Email, Username=@Username, IdPerfil=@IdPerfil  WHERE Id=@Id');
        res.json({message: "exitoso"})
        sql.close();
    }
    catch (error) {
        console.log(error);
    }
}

//Eliminar Usuario
export const deleteUser = async (req, res) => {
    try {
        const Id = req.params.id;


        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request = new sql.Request(sqlPool1)
        let users = await request
            .input('Id', sql.Int, Id)
            .query('DELETE FROM SGV_MOE_Usuarios WHERE Id=@Id');

        res.json(users.recordsets[0])
        sql.close();
    }
    catch (error) {
        console.log(error);
    }
}

/*Usuario especifico
export const getUser = async (req, res) => {
    try {
        const Id = req.params.id;
        let pool = await sql.connect(config);
        let user = await pool.request()
            .input('input_parameter', sql.Int, Id)
            .query('select * from SGV_MOE_Usuarios where Id = @input_parameter');
        res.json(user.recordsets[0]);
        sql.close();
    }
    catch (error) {
        console.log(error);
    }
}
*/