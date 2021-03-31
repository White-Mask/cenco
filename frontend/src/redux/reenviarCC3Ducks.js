import axios from 'axios';

//Constantes
const dataInicial = {
    Status: null
}

const reenviarCC3_EXITO = 'reenviarCC3_EXITO';

//Reducer
export const reenviarCC3Reducer = (state = dataInicial, action) => {
    switch(action.type){
        case reenviarCC3_EXITO:
            return {...state, Status: action.payload}
        default:
            return state
    }
}
//Acciones
export const reenviarCC3Accion = (fecha,CodSap) => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:4000/api/reenviar-cc3',{params:{ID:fecha, Local: CodSap}})
        dispatch({
            type: reenviarCC3_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
}