import axios from 'axios';

//Constantes
const dataInicial = {
    array: [],
    message: null
}

const ERROR = 'ERROR';
const OBTENER_USUARIOS_EXITO = 'OBTENER_USUARIOS_EXITO';
const CREAR_USUARIO_EXITO = 'CREAR_USUARIO_EXITO';
const ACTUALIZAR_USUARIO_EXITO = 'ACTUALIZAR_USUARIO_EXITO';
const ELIMINAR_USUARIO_EXITO = 'ELIMINAR_USUARIO_EXITO';

//Reducer
export const usuariosReducer = (state = dataInicial, action) => {
    switch (action.type) {
        case ERROR:
            return {...dataInicial}
        case OBTENER_USUARIOS_EXITO:
            return { ...state, loading: false, array: action.payload }
        case CREAR_USUARIO_EXITO:
            return { ...state, loading: false, message: action.payload }
        case ACTUALIZAR_USUARIO_EXITO:
            return { ...state, loading: false, message: action.payload }
        case ELIMINAR_USUARIO_EXITO:
            return { ...state, loading: false, message: action.payload }
        default:
            return state
    }
}
//Acciones

//Traer todos los usuarios.
export const obtenerUsuariosAccion = () => async (dispatch) => {
    try {
        const res = await axios.get('http://172.18.148.14:4000/api/users');
        dispatch({
            type: OBTENER_USUARIOS_EXITO,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}

//Crear un usuario.
export const crearUsuarioAccion = (Nombres, ApellidoP, ApellidoM, Email, Username, IdPerfil) => async (dispatch) => {
    try {
        let data = { Nombres, ApellidoP, ApellidoM, Email, Username, IdPerfil }
        const res = await axios.post('http://172.18.148.14:4000/api/users/', data);
        dispatch({
            type: CREAR_USUARIO_EXITO,
            payload: res.data.message
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}

//Actualizar un usuario.
export const actualizarUsuarioAccion = (Id, Nombres, ApellidoP, ApellidoM, Email, Username, IdPerfil) => async (dispatch) => {
    try {
        let data = { Id, Nombres, ApellidoP, ApellidoM, Email, Username, IdPerfil }
        const res = await axios.put(`http://172.18.148.14:4000/api/users/${Id}`, data);
        dispatch({
            type: ACTUALIZAR_USUARIO_EXITO,
            payload: res.data.message
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}

//Eliminar un usuario
export const eliminarUsuarioAccion = (Id) => async (dispatch) => {
    try {
        const res = await axios.delete(`http://172.18.148.14:4000/api/users/${Id}`, { Id });
        dispatch({
            type: ELIMINAR_USUARIO_EXITO,
            payload: res.data.message
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}