import axios from 'axios';

//Constantes
const dataInicial = {
    Status: null
};


const ERROR = 'ERROR';
const EXCLUIR_LOCAL_ALARMA_EXITO = 'EXCLUIR_LOCAL_ALARMA_EXITO';

//Reducer
export const excluirLocalAlarmaReducer = (state = dataInicial, action) => {
    switch (action.type) {
        case ERROR:
            return { ...state, Status: false}
        case EXCLUIR_LOCAL_ALARMA_EXITO:
            return { ...state, Status: action.payload}
        default:
            return state
    }
}
//Acciones
export const excluirLocalAlarmaAccion = (tienda) => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:4000/api/excluye-local-alarma', { params: { Local: tienda } })
        dispatch({
            type: EXCLUIR_LOCAL_ALARMA_EXITO,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ERROR
        })
    }
}