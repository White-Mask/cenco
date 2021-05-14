import axios from 'axios';

//Constantes
const dataInicial = {
    Modulos: [],
    ModulosPerfil: []
}

const ERROR = 'ERROR';
const OBTENER_MODULOS_EXITO = 'OBTENER_MODULOS_EXITO';
const OBTENER_MODULOSID_EXITO = 'OBTENER_MODULOSID_EXITO';

//Reducer
export const ModuloReducer = (state = dataInicial, action) => {
    switch (action.type) {
        case ERROR:
            return { ...dataInicial }
        case OBTENER_MODULOS_EXITO:
            return { ...state, Modulos: action.payload }
        case OBTENER_MODULOSID_EXITO:
            return { ...state, ModulosPerfil: action.payload }
        default:
            return state
    }
}
//Acciones
export const obtenerModuloAccion = () => async (dispatch) => {
    try {
        const res = await axios.get('http://172.18.148.14:4000/api/perfiles/modulos');
        dispatch({
            type: OBTENER_MODULOS_EXITO,
            payload: res.data.Modulos
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}

export const obtenerModuloIdAccion = (IdPerfil) => async (dispatch) => {
    try {
        const res = await axios.get('http://172.18.148.14:4000/api/perfiles/modulosid', { params: { IdPerfil: IdPerfil } });
        dispatch({
            type: OBTENER_MODULOSID_EXITO,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}

export const crearModuloAccion = (Modulo) => async (dispatch) => {
    try {
        const res = await axios.get('http://172.18.148.14:4000/api/modulo', { params: { Modulo } });
        dispatch({
            type: OBTENER_MODULOSID_EXITO,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}

export const editarModuloAccion = (Id, Modulo) => async (dispatch) => {
    try {
        const res = await axios.get('http://172.18.148.14:4000/api/modulo', { params: { Id, Modulo } });
        dispatch({
            type: OBTENER_MODULOSID_EXITO,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}

export const eliminarModuloAccion = (Id) => async (dispatch) => {
    try {
        const res = await axios.get('http://172.18.148.14:4000/api/modulo', { params: { Id } });
        dispatch({
            type: OBTENER_MODULOSID_EXITO,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}