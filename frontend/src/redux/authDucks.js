import axios from 'axios';

//Constantes
const dataInicial = {
    user: [],
    modulos: [],
    token: null,
    isLoggedIn: false,
}

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';
const ERROR = 'ERROR';
const GET_INFO_USER = 'GET_INFO_USER';
const ISNOTVALID = 'ISVALID';

//Reducer
export const authReducer = (state = dataInicial, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, ...action.payload, isLoggedIn: true}
        case LOGOUT:
            return { ...dataInicial }
        case ERROR:
            return { ...dataInicial, message: {icon: "error", text: "Se a producido un error"} }
        case GET_INFO_USER:
            return { ...state, ...action.payload }
        case ISNOTVALID:
            return { ...state, isLoggedIn: false}
        default:
            return state
    }
}

////////////////////////////////////Acciones////////////////////////////////////////////////

export const loginAccion = (username, password) => async (dispatch) => {
    try {
        let data = { username, password }
        const res = await axios.post('http://172.18.148.14:4000/api/auth/signin', data);
        if (res.data) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            localStorage.setItem('key', JSON.stringify(res.data.token))
            localStorage.setItem('user', JSON.stringify(res.data.user))
            localStorage.setItem('modulos_user', JSON.stringify(res.data.modulos))

        } else {
            dispatch({
                type: ERROR,
                payload: res.data
            })
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error
        })
    }
}

export const isAuthAccion = () => async (dispatch) => {
    if (localStorage.getItem('key')) {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                token: JSON.parse(localStorage.getItem('key')),
                user: JSON.parse(localStorage.getItem('user')),
                modulos: JSON.parse(localStorage.getItem('modulos_user'))
            }
        })
    }
}

export const logoutAccion = () => async (dispatch) => {
    if (localStorage.getItem('key')) {
        dispatch({
            type: LOGOUT,
        })
        localStorage.removeItem('key')
        localStorage.removeItem('user')
        localStorage.removeItem('modulos_user')
    }
}

export const isValidToken = () => async (dispatch) => {
    if (localStorage.getItem('key')) {
        try {
            const res = await axios.post('http://172.18.148.14:4000/api/auth/Verify', { headers: { 'x-access-token': JSON.parse(localStorage.getItem('key')) } });
            if (res.data.isValid === true) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: JSON.parse(localStorage.getItem('key'))
                })
            }
            else {
                dispatch({
                    type: ISNOTVALID,
                })
            }
        }
        catch (error) {
            dispatch({
                type: ERROR,
            })
            localStorage.removeItem('key')
            localStorage.removeItem('user')
            localStorage.removeItem('modulos_user')
        }
    }
}

export const obtenerInformacionUser = () => async (dispatch) => {
    if (localStorage.getItem('key')) {
        dispatch({
            type: GET_INFO_USER,
            payload: JSON.parse(localStorage.getItem('modulos_user'))
        })
    }
}

// Web que se uso para crear el login:
//https://dev.to/skd1993/creating-a-simple-login-function-with-redux-and-thunk-in-react-native-33ib

//Como guardar el usuario en el localStorage
//https://dev.to/skd1993/how-to-save-login-state-locally-using-asyncstorage-redux-in-react-native-31oo