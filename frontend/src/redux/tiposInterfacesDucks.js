import axios from 'axios';

//Constantes
const dataInicial = {
    array : [],
}

const OBTENER_TIPOSINTERFACES_EXITO = 'OBTENER_TIPOSINTERFACES_EXITO';

//Reducer
export const tiposInterfacesReducer = (state = dataInicial, action) => {
    switch(action.type){
        case OBTENER_TIPOSINTERFACES_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}
//Acciones
export const obtenerTiposInterfacesAccion = () => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:4000/api/tiposInterfaces');
        dispatch({
            type: OBTENER_TIPOSINTERFACES_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
}