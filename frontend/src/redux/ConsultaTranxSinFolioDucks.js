import axios from 'axios';

//Constantes
const dataInicial = {
    array: []
}

const ERROR = 'ERROR';
const CONSULTA_TRANX_SIN_FOLIO_EXITO = 'CONSULTA_TRANX_SIN_FOLIO_EXITO';

//Reducer
export const consultaTranxSinFolioReducer = (state = dataInicial, action) => {
    switch (action.type) {
        case ERROR:
            return { ...dataInicial }
        case CONSULTA_TRANX_SIN_FOLIO_EXITO:
            return { ...state, array: action.payload.array }
        default:
            return state
    }
}
//Acciones
export const consultaTranxSinFolioAccion = (FechaIni, FechaFin) => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:4000/api/consulta-tranx-sin-folio', { params: { FechaIni, FechaFin } })
        dispatch({
            type: CONSULTA_TRANX_SIN_FOLIO_EXITO,
            payload: {
                array: res.data.array
            }
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}