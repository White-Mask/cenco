import axios from 'axios';

//Constantes
const dataInicial = {
    array: []
}

const ERROR = 'ERROR';
const OBTENER_NUMTRANSACCIONESLOCALESCDP = 'OBTENER_NUMTRANSACCIONESLOCALESCDP';

//Reducer
export const numTransaccionesLocalesCDPReducer = (state = dataInicial, action) => {
    switch (action.type) {
        case ERROR:
            return { ...dataInicial, message:{icon: "error", text: action.payload}}
        case OBTENER_NUMTRANSACCIONESLOCALESCDP:
            return { ...state, array: action.payload }
        default:
            return state
    }
}
//Acciones
export const numTransaccionesLocalesCDPAccion = (fecha) => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:4000/api/numero-transacciones-locales-cdp', { params: { ID: fecha } });
        dispatch({
            type: OBTENER_NUMTRANSACCIONESLOCALESCDP,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: "Se a producido un error, intente otra vez o vuelva más tarde."
        })
    }
}