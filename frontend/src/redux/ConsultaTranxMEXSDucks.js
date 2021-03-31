import axios from 'axios';

//Constantes
const dataInicial = {
    array: []
}

const ERROR = 'ERROR';
const CONSULTA_TRANX_MEXS_EXITO = 'CONSULTA_TRANX_MEXS_EXITO';

//Reducer
export const consultaTranxMEXSReducer = (state = dataInicial, action) => {
    switch (action.type) {
        case ERROR:
            return {...dataInicial}
        case CONSULTA_TRANX_MEXS_EXITO:
            return {...state, loading: false, array: action.payload.MEXS}
        default:
            return state
    }
}
//Acciones
export const consultaTranxMEXSAccion = (FechaIni, FechaFin) => async (dispatch) => {
    try {

        const res = await axios.get('http://localhost:4000/api/consulta-tranx-MEXS', { params: { FechaIni, FechaFin } })
        
        dispatch({
            type: CONSULTA_TRANX_MEXS_EXITO,
            payload: {
                MEXS: res.data.MEXS
            }
        })

    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}