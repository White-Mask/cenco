import axios from 'axios';

//Constantes
const dataInicial = {
    array: [],
    fecha: '',
    local: ''
}

const ERROR = 'ERROR';
const OBTENER_TOTALESCDP_EXITO = 'OBTENER_TOTALESCDP_EXITO';

//Reducer
export const totalesCDPReducer = (state = dataInicial, action) => {
    switch (action.type) {
        case ERROR:
            return { ...dataInicial }
        case OBTENER_TOTALESCDP_EXITO:
            return { ...state, loading: false, ...action.payload }
        default:
            return state
    }
}
//Acciones
export const totalesCDPAccion = (local, fecha) => async (dispatch) => {
    try {
        const res = await axios.get('http://172.18.148.14:4000/api/totales-cdp', { params: { ID: fecha, Local: local } });
        dispatch({
            type: OBTENER_TOTALESCDP_EXITO,
            payload: {
                array: res.data.array,
                fecha: res.data.fecha,
                local: res.data.local
            }
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}