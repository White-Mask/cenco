import axios from 'axios';

//Constantes
const dataInicial = {
    array : [],
}

const ERROR = 'ERROR';
const OBTENER_TRANSACCIONESSGV_EXITO = 'OBTENER_TRANSACCIONESSGV_EXITO';

//Reducer
export const transaccionesSGVReducer = (state = dataInicial, action) => {
    switch(action.type){
        case ERROR:
            return {...dataInicial}
        case OBTENER_TRANSACCIONESSGV_EXITO:
            return {...state, array: action.payload.transacciones}
        default:
            return state
    }
}
//Acciones
export const transaccionesSGVAccion = (IdTLogHeader, IdTlogDetail, Terminal, NumTransaccion, Folio, selectedDate, Local, TipoDTE, CanalVTA) => async (dispatch) => {
    try {
        const res = await axios.get('http://172.18.148.14:4000/api/transacciones',{params: {IdTLogHeader, IdTlogDetail, Terminal, NumTransaccion, Folio, selectedDate, Local, TipoDTE, CanalVTA}});
        dispatch({
            type: OBTENER_TRANSACCIONESSGV_EXITO,
            payload: {
                transacciones: res.data.transacciones
            }
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}