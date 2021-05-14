import axios from 'axios';

//Constantes
const dataInicial = {
    array: [],
    message: null,
}

const ERROR = 'ERROR';
const OBTENER_LOGS_EXITO = 'OBTENER_LOGS_EXITO';
const INSERTAR_LOGS_EXITO = "INSERTAR_LOGS_EXITO";

//Reducer
export const logsReducer = (state = dataInicial, action) => {
    switch (action.type) {
        case ERROR:
            return { ...dataInicial }
        case OBTENER_LOGS_EXITO:
            return { ...state, array: action.payload }
        case INSERTAR_LOGS_EXITO:
            return { ...state, ...action.payload }
        default:
            return state
    }
}
//Acciones
export const obtenerLogsAccion = (usuarios, fecha, accion, severidad, dataExtra) => async (dispatch) => {
    try {
        const res = await axios.get('http://172.18.148.14:4000/api/logs', { params: { usuarios, fecha, accion, severidad, dataExtra } });
        dispatch({
            type: OBTENER_LOGS_EXITO,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}

export const insertarLogsAccion = (usuarios, accion, severidad, dataExtra) => async (dispatch) => {
    try {
        const res = await axios.get('http://172.18.148.14:4000/api/logs/insert', { params: { usuarios, accion, severidad, dataExtra } });
        dispatch({
            type: INSERTAR_LOGS_EXITO,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}