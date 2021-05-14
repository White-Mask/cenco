import sql from 'mssql';
let mssql = require('../database/mssql-connection-pooling')
import config_SGV from '../database/DB_Config_SGV';

import key from '../config/auth.config';
import jwt, { decode } from "jsonwebtoken";

import ActiveDirectory from 'activedirectory';

export const Signin = async (req, res) => {
    try {
        const config = {
            url: 'ldap://cencosud.corp',
            baseDN: 'dc=cencosud,dc=corp'
        }
        let ad = new ActiveDirectory(config);

        let sqlPool1 = await mssql.GetCreateIfNotExistPool(config_SGV)
        let request = new sql.Request(sqlPool1)

        let usuario = []
        let results = []

        //Obtener todos los usuarios desde la db.
        let users = await request.query('select * from SGV_MOE_Usuarios')

        //Buscamos el usuario en la tabla.
        const thisUser = users.recordsets[0].filter(usuario => usuario.Username === req.body.username)

        //Si no encuentra al usuario entonces de vuelve un 401.
        if (thisUser[0] === undefined) return res.status(401).send({ error: "No se encuentra ese usuario." })

        //Pedimos mas informacion del usuario como modulos, perfiles.
        let perfilsModelos = await request.input('IdPerfil', sql.VarChar, thisUser[0].IdPerfil).query('SELECT * FROM SGV_MOE_ModulosPerfiles WHERE IdPerfil = @IdPerfil');
        let modelos = await request.query('SELECT * FROM SGV_MOE_Modulos');
        let perfiles = await request.query("SELECT * FROM SGV_MOE_Perfiles");


        //Hacemos join entre tablas.
        thisUser.map(item => {
            let perfil = perfiles.recordsets[0].find(rol => rol.Id === item.IdPerfil)
            usuario.push(Object.assign(item, { perfil: perfil.Perfil }))
        })

        perfilsModelos.recordsets[0].map(item => {
            let modulo = Object.assign({}, item, modelos.recordsets[0].find(modelo => modelo.Id === item.IdModulo))
            results.push({ Modulo: modulo.Modulo })
        })

        ad.authenticate(thisUser[0].Email, req.body.password, (err, auth) => {
            if (err) {
                return res.status(403).send({ error: "La contraseña con coinside." });
            }
            if (auth) {
                const token = jwt.sign({ id: thisUser.Id }, key.SECRET, { expiresIn: '16h' })
                const times = jwt.verify(token, key.SECRET)
                res.json({ token: token, modulos: results, user: [usuario[0], { exp: times.exp }] });
            }
        });
    }
    catch (error) {
        res.status(403).send({ error: "Se aproducido un error, intente más tarde." });
    }
};


export const isAuth = async (req, res) => {
    try {
        const token = req.body.headers['x-access-token'];
        console.log(req.body.headers['x-access-token'])

        if (token == null) return res.status(401).json({ isValid: false })
        if (!token) return res.status(403).json({ isValid: false })


        jwt.verify(token, key.SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ isValid: false })
            }
            else {
                //res.json({iat: decoded.iat, exp: decoded.exp});
                res.json({ isValid: true })
            }
        })

    }
    catch (error) {
        return res.status(403).json({ isValid: false })
    }
};