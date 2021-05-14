import axios from 'axios';

//Constantes
const dataInicial = {
    array : [],
}

const OBTENER_SEVERIDADES_EXITO = 'OBTENER_SEVERIDADES_EXITO';

//Reducer
export const severidadesReducer = (state = dataInicial, action) => {
    switch(action.type){
        case OBTENER_SEVERIDADES_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}
//Acciones
export const obtenerSeveridadesAccion = () => async (dispatch) => {
    try {
        const res = await axios.get('http://172.18.148.14:4000/api/severidades');
        dispatch({
            type: OBTENER_SEVERIDADES_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
}