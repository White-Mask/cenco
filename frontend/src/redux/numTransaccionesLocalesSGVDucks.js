import axios from 'axios';

//Constantes
const dataInicial = {
    array : [],
}

const OBTENER_NUMTRANSACCIONESLOCALESSGV = 'OBTENER_NUMTRANSACCIONESLOCALESSGV';

//Reducer
export const numTransaccionesLocalesSGVReducer = (state = dataInicial, action) => {
    switch(action.type){
        case OBTENER_NUMTRANSACCIONESLOCALESSGV:
            return {...state, array: action.payload}
        default:
            return state
    }
}
//Acciones
export const numTransaccionesLocalesSGVAccion = () => async (dispatch, action) => {
    try {
        const res = await axios.get('http://localhost:4000/api/numero-transacciones-locales-sgv');
        dispatch({
            type: OBTENER_NUMTRANSACCIONESLOCALESSGV,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
}