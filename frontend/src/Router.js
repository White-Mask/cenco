import React from 'react';

//Routes
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

//Importamos paginas.
import SignIn from './pages/Login/login';
//Inicio
import { Home } from './pages/Home/Home';
//Status
import { StatusTienda } from './pages/StatusTienda/statusTienda';
//SGV
import { DetalleDocSGV } from './pages/DetalleDocumentosSGV/DetalleDocSGV';
import { ConsultaTranxSinFolio } from './pages/ConsultasTranxSinFolio/ConsultaTranxSinFolio';
import { ConsultaTranxMEXS } from './pages/ConsultasTranxMEXS/ConsultaTranxMEXS';
//CDP
import { TotalesCDP } from './pages/TotalesCDP/TotalesCDP';
import { ExpluirTiendaAlarma } from './pages/ExcluirTiendaAlarma/ExpluirTiendaAlarma';
import { EAMTRAN } from './pages/DetallesEAMTRAN/EAMTRAN';
//TSAV
import { InterfacesTSAV } from './pages/AdministracionInterfacesTSAV/InterfacesTSAV';
//Interfaces
import { RegenerarInterfaces } from './pages/RegenerarInterfacesVTA/RegenerarVTA';
import { ReenviarCC3 } from './pages/ReenviarInterfazCC3/ReenviarCC3';
//Admin
import { Usuarios } from './pages/Usuarios/Usuarios';
import { Perfiles } from './pages/Perfiles/Perfiles';
import { Logs } from './pages/BusquedaLogs/logs';
//404
import  Error  from './pages/404/error';

//API
import { useSelector } from 'react-redux';

export const Router = () => {

    const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
    const modulos =  useSelector(store => store.auth.modulos);



    const RutaComun = ({ component, path, ...rest }) => {
        if (localStorage.getItem('key') && isLoggedIn === true) {
            return <Route component={component} path={path} {...rest} />

        } else {
            return <Redirect to="/signin" {...rest} />
        }
    }

    const RutaProtegida = ({ component, path, ...rest }) => {
        if (localStorage.getItem('key') && isLoggedIn === true) {

            let access = modulos.find(moduloUsuario => path.includes(moduloUsuario.Modulo))
            if (access) {
                return <Route component={component} path={path} {...rest} />
            }
            else {
                return <Redirect to="/" {...rest} />
            }
        } else {
            return <Redirect to="/signin" {...rest} />
        }
    }

    return (
        <BrowserRouter>
            <Switch>

                <Route path="/signin" component={SignIn} />

                <RutaComun exact path="/" component={Home} />

                <RutaProtegida path="/Status/Tienda" component={StatusTienda} />

                <RutaProtegida path="/SGV/DetalleDocumentos" component={DetalleDocSGV} />
                <RutaProtegida path="/SGV/ConsultaTranxSinFolio" component={ConsultaTranxSinFolio} />
                <RutaProtegida path="/SGV/ConsultaTranxMEXS" component={ConsultaTranxMEXS} />

                <RutaProtegida path="/CDP/totales" component={TotalesCDP} />
                <RutaProtegida path="/CDP/excluir-tienda-alarma" component={ExpluirTiendaAlarma} />
                <RutaProtegida path="/CDP/eamtran" component={EAMTRAN} />

                <RutaProtegida path="/TSAV/interfaces-con-error" component={InterfacesTSAV} />

                <RutaProtegida path="/Interfaces/regenerar-vta" component={RegenerarInterfaces} />
                <RutaProtegida path="/Interfaces/reenviar-cc3" component={ReenviarCC3} />

                <RutaProtegida path="/Admin/Usuarios" component={Usuarios} />
                <RutaProtegida path="/Admin/Perfiles" component={Perfiles} />
                <RutaProtegida path="/Admin/logs" component={Logs} />

                <Route component={Error} />

            </Switch>
        </BrowserRouter>
    )
}