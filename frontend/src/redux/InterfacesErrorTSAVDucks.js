import axios from 'axios';

//Constantes
const dataInicial = {
    datos: [],
}

const ERROR = 'ERROR';
const OBTENER_INTERFACES_ERRORTSAV_EXITO = 'OBTENER_INTERFACES_ERRORTSAV_EXITO';
const REENVIAR_INTERFACES_ERRORTSAV_EXITO = 'REENVIAR_INTERFACES_ERRORTSAV_EXITO';

//Reducer
export const interfacesErrorTSAVReducer = (state = dataInicial, action) => {
    switch (action.type) {
        case ERROR:
            return { ...dataInicial }
        case OBTENER_INTERFACES_ERRORTSAV_EXITO:
            return { ...state, datos: action.payload.InterfazTSAV }
        case REENVIAR_INTERFACES_ERRORTSAV_EXITO:
            return { ...state, message: action.payload }
        default:
            return state
    }
}
//Acciones
export const obtenerInterfacesErrorTSAVAccion = (selectedDate, Local, TipoInterfaz, Estado) => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:4000/api/interfacesErrorTSAV', { params: { ID: selectedDate, Local: Local, TipoInterfaz: TipoInterfaz, Estado: Estado } })
        dispatch({
            type: OBTENER_INTERFACES_ERRORTSAV_EXITO,
            payload: {
                InterfazTSAV: res.data.InterfazTSAV
            }
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}

export const reenviarInterfacesTSAVAccion = (selected) => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:4000/api/interfacesErrorTSAV/enviar-tsav', { params: { selected } })
        dispatch({
            type: REENVIAR_INTERFACES_ERRORTSAV_EXITO,
            payload: {
                InterfazTSAV: res.data
            }
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}