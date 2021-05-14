import axios from 'axios';

//Constantes
const dataInicial = {
    Fechas: [],
    datos: [],
    EstadoLocalDetalleError: []
}

const ERROR = 'ERROR';
const OBTENER_ESTADOSTIENDA_EXITO = 'OBTENER_ESTADOSTIENDA_EXITO';
const OBTENER_ERROR_EXITO = 'OBTENER_ERROR_EXITO';

//Reducer
export const estadoTiendaReducer = (state = dataInicial, action) => {
    switch (action.type) {
        case ERROR:
            return { ...dataInicial }
        case OBTENER_ESTADOSTIENDA_EXITO:
            return { ...state, loading: false, ...action.payload }
        case OBTENER_ERROR_EXITO:
            return { ...state, EstadoLocalDetalleError: action.payload.EstadoLocalDetalleError }
        default:
            return state
    }
}
//Acciones
export const obtenerEStadoTiendaAccion = (fecha) => async (dispatch) => {
    try {
        const res = await axios.get('http://172.18.148.14:4000/api/sucursales-status', { params: { ID: fecha } })
        dispatch({
            type: OBTENER_ESTADOSTIENDA_EXITO,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}

export const obtenerEstadoLocalDetalleErrorAccion = (codSAP, fecha) => async (dispatch) => {
    try {
        const res = await axios.get('http://172.18.148.14:4000/api/sucursales-status/DetalleErrorEstadoLocal', { params: { ID: fecha, codSAP: codSAP } })
        dispatch({
            type: OBTENER_ERROR_EXITO,
            payload: {
                EstadoLocalDetalleError: res.data.EstadoLocalDetalleError
            }
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}