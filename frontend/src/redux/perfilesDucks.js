import axios from 'axios';

//Constantes
const dataInicial = {
    array: [],
}

const ERROR = 'ERROR';
const OBTENER_PERFILES_EXITO = 'OBTENER_PERFILES_EXITO';

//Reducer
export const PerfilesReducer = (state = dataInicial, action) => {
    switch (action.type) {
        case ERROR:
            return { ...dataInicial }
        case OBTENER_PERFILES_EXITO:
            return { ...state, array: action.payload }
        default:
            return state
    }
}
//Acciones
export const obtenerPerfilAccion = () => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:4000/api/perfiles');
        dispatch({
            type: OBTENER_PERFILES_EXITO,
            payload: res.data
        })
        localStorage.setItem('modulos', JSON.stringify(res.data.modulos))
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}

export const crearPerfilAccion = (Perfil, Modulos) => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:4000/api/perfiles');
        dispatch({
            type: OBTENER_PERFILES_EXITO,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}

export const editarPerfilAccion = (Id, Perfil, Modulos) => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:4000/api/perfiles');
        dispatch({
            type: OBTENER_PERFILES_EXITO,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}

export const eliminarPerfilAccion = (Id) => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:4000/api/perfiles');
        dispatch({
            type: OBTENER_PERFILES_EXITO,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}