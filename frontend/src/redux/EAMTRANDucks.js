import axios from 'axios';

//Constantes
const dataInicial = {
    array: [],
    fecha: ''
}

const ERROR = 'ERROR';
const OBTENER_EAMTRAN_EXITO = 'OBTENER_EAMTRAN_EXITO';
const UPDATE_EAMTRAN_EXITO = 'UPDATE_EAMTRAN_EXITO';

//Reducer
export const EAMTRANReducer = (state = dataInicial, action) => {
    switch (action.type) {
        case ERROR:
            return { ...dataInicial }
        case OBTENER_EAMTRAN_EXITO:
            return { ...state, loading: false, array: action.payload.array }
        case UPDATE_EAMTRAN_EXITO:
            return { ...state, loading: false, array: action.payload.array }
        default:
            return state
    }
}
//Acciones
export const EAMTRANAccion = (local, fecha) => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:4000/api/eamtran', { params: { ID: fecha, Local: local } });
        dispatch({
            type: OBTENER_EAMTRAN_EXITO,
            payload: {
                array: res.data.array,
                fecha: res.data.fecha
            }
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}

export const actualizarEAMTRANAccion = (eamtran, ultimoLote, fechaUltimoLote, local, fechaFiscal, fechaUltimoLoteOrig, status) => async (dispatch) => {
    try {
        let data = { eamtran, ultimoLote, fechaUltimoLote, local, fechaFiscal, fechaUltimoLoteOrig, status }
        const res = await axios.put('http://localhost:4000/api/eamtran', data);
        dispatch({
            type: UPDATE_EAMTRAN_EXITO,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}