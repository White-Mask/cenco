import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {estadoTiendaReducer} from './estadosTiendasDucks';
import {tiendasEasyReducer} from './tiendasEasyDucks';
import { authReducer, isAuthAccion } from './authDucks';
import { transaccionesSGVReducer } from './transaccionesSGVDucks';
import { numTransaccionesLocalesSGVReducer } from './numTransaccionesLocalesSGVDucks';
import { interfacesErrorTSAVReducer } from './InterfacesErrorTSAVDucks';
import {usuariosReducer} from './UsuariosDucks';
import { numTransaccionesLocalesCDPReducer } from './numTransaccionesLocalesCDPDucks';
import { totalesCDPReducer } from './totalCDPDucks';
import { EAMTRANReducer } from './EAMTRANDucks';
import { regenerarInterfazVTAReducer } from './generarInterfazVTADucks';
import { reenviarCC3Reducer } from './reenviarCC3Ducks';
import { tiposInterfacesReducer } from './tiposInterfacesDucks';
import { tiposEstadosReducer } from './tiposEstadosDucks';
import { PerfilesReducer } from './perfilesDucks';
import { ModuloReducer } from './modulosDucks';
import { severidadesReducer } from './severidadesDucks';
import { logsReducer } from './logsDucks';
import { excluirLocalAlarmaReducer } from './excluyeLocalAlarmaDucks';
import { consultaTranxSinFolioReducer } from './ConsultaTranxSinFolioDucks';
import { consultaTranxMEXSReducer } from './ConsultaTranxMEXSDucks';

const rootReduce = combineReducers({
    estadoTienda: estadoTiendaReducer,
    tiendasEasy: tiendasEasyReducer,
    auth: authReducer,
    transaccionesSGV: transaccionesSGVReducer,
    statusLocales: numTransaccionesLocalesSGVReducer,
    interfacesErrorTSAV: interfacesErrorTSAVReducer,
    usuarios: usuariosReducer,
    statusLocalesCDP: numTransaccionesLocalesCDPReducer,
    totalesCDP: totalesCDPReducer,
    EAMTRAN: EAMTRANReducer,
    regenerarInterfazVTA: regenerarInterfazVTAReducer,
    reenviarCC3: reenviarCC3Reducer,
    tiposInterfaces: tiposInterfacesReducer,
    tiposEstados: tiposEstadosReducer,
    Perfiles: PerfilesReducer,
    Modulo: ModuloReducer,
    severidades: severidadesReducer,
    logs: logsReducer,
    excluirLocalAlarma: excluirLocalAlarmaReducer,
    consultaTranxSinFolio: consultaTranxSinFolioReducer,
    consultaTranxMEXS: consultaTranxMEXSReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const generateStore = () => {
    const store = createStore(rootReduce, composeEnhancers(applyMiddleware(thunk)))
    isAuthAccion()(store.dispatch)
    return store;
}