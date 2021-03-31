import axios from 'axios';

//Constantes
const dataInicial = {
    array : [],
}

const OBTENER_TIPOSESTADOS_EXITO = 'OBTENER_TIPOSESTADOS_EXITO';

//Reducer
export const tiposEstadosReducer = (state = dataInicial, action) => {
    switch(action.type){
        case OBTENER_TIPOSESTADOS_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}
//Acciones
export const obtenerTiposEstadosAccion = () => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:4000/api/tiposEstados');
        dispatch({
            type: OBTENER_TIPOSESTADOS_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
}