import axios from 'axios';

//Constantes
const dataInicial = {
    array: [],
    title: '',
    text: '',
    existe: false,
    error: false,
}

const ERROR = 'ERROR';
const REGENERAR_INTERFAZ_VTA_EXITO = 'REGENERAR_INTERFAZ_VTA_EXITO';
const VERIFICAR_INTERFAZ_VTA_EXITO = 'VERIFICAR_INTERFAZ_VTA_EXITO';

//Reducer
export const regenerarInterfazVTAReducer = (state = dataInicial, action) => {
    switch (action.type) {
        case ERROR:
            return { ...dataInicial }
        case REGENERAR_INTERFAZ_VTA_EXITO:
            return { ...state, ...action.payload }
        case VERIFICAR_INTERFAZ_VTA_EXITO:
            return { ...state, ...action.payload }
        default:
            return state
    }
}
//Acciones
export const regenerarInterfazVTAAccion = (fecha, CodSap, bandera) => async (dispatch) => {
    try {
        const res = await axios.get('http://172.18.148.14:4000/api/interfaz-vta', { params: { ID: fecha, Local: CodSap, Flag: bandera } })
        dispatch({
            type: REGENERAR_INTERFAZ_VTA_EXITO,
            payload: {
                title: res.data.title,
                text: res.data.text
            }
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}

export const verificarInterfazVTAAccion = (fecha, CodSap) => async (dispatch) => {
    try {
        const res = await axios.get('http://172.18.148.14:4000/api/logs/verificar', { params: { ID: fecha, Local: CodSap } })
        dispatch({
            type: VERIFICAR_INTERFAZ_VTA_EXITO,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
        })
    }
}