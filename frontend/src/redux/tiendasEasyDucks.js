import axios from 'axios';

//Constantes
const dataInicial = {
    array : [],
}

const OBTENER_TIENDASEASY_EXITO = 'OBTENER_TIENDASEASY_EXITO';

//Reducer
export const tiendasEasyReducer = (state = dataInicial, action) => {
    switch(action.type){
        case OBTENER_TIENDASEASY_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}
//Acciones
export const obtenerTiendasEasyAccion = () => async (dispatch, action) => {
    try {
        const res = await axios.get('http://172.18.148.14:4000/api/tiendasEasy');
        dispatch({
            type: OBTENER_TIENDASEASY_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
}