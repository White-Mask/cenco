import express, {json} from 'express';
import morgan from 'morgan';

const app = express();

const cors = require('cors')

//Importar rutas
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import tiendasEasyRoutes from './routes/tiendaEasy.routes';
import transaccionRoutes from './routes/transaccion.routes';
import sucursalesStatusRoutes from './routes/sucursalesStatus.routes';
import getNumTransaccionLocalSGVRoutes from './routes/numTransaccionesLocalSGV.routes';
import getInterfacesErrorTSAV from './routes/InterfacesErrorTSAV.routes'
import getNumTransaccionLocalCDPRoutes from './routes/numTransaccionesLocalCDP.routes'
import getTotalesCDPRoutes from './routes/totalesCDP.routes'
import getEAMTRANRoutes from './routes/EAMTRAN.routes';
import createInterfazVTARoutes from './routes/generarInterfazVTA.routes';
import createReenvioCC3Routes from './routes/reenviarCC3.routes';
import tiposInterfacesRoutes from './routes/tiposInterfaces.routes';
import tiposEstadosRoutes from './routes/tiposEstados.routes';
import perfilesRoutes from './routes/perfiles.routes';
import severidadesRoutes from './routes/severidades.routes';
import logsRoutes from './routes/logs.routes';
import ExcluyeLocalAlarmaRoutes from './routes/ExcluyeLocalAlarma.routes';
import ConsultaTranxSinFolioRoutes from './routes/ConsultaTranxSinFolio.routes';
import ConsultaTranxMEXSRoutes from './routes/ConsultaTranxMEXS.routes';

//middlewares
app.use(cors())
app.use(morgan('dev'));
app.use(json());

//routes
app.use('/api/users' ,userRoutes);
app.use('/api/auth' ,authRoutes);
app.use('/api/tiendasEasy' ,tiendasEasyRoutes);
app.use('/api/transacciones' ,transaccionRoutes);
app.use('/api/sucursales-status' ,sucursalesStatusRoutes);
app.use('/api/numero-transacciones-locales-sgv' ,getNumTransaccionLocalSGVRoutes);
app.use('/api/interfacesErrorTSAV' ,getInterfacesErrorTSAV);
app.use('/api/numero-transacciones-locales-cdp' ,getNumTransaccionLocalCDPRoutes);
app.use('/api/totales-cdp' ,getTotalesCDPRoutes);
app.use('/api/eamtran',getEAMTRANRoutes);
app.use('/api/interfaz-vta',createInterfazVTARoutes);
app.use('/api/reenviar-cc3',createReenvioCC3Routes);
app.use('/api/tiposInterfaces',tiposInterfacesRoutes);
app.use('/api/tiposEstados',tiposEstadosRoutes);
app.use('/api/perfiles',perfilesRoutes);
app.use('/api/severidades',severidadesRoutes);
app.use('/api/logs',logsRoutes);
app.use('/api/excluye-local-alarma',ExcluyeLocalAlarmaRoutes);
app.use('/api/consulta-tranx-sin-folio',ConsultaTranxSinFolioRoutes);
app.use('/api/consulta-tranx-MEXS',ConsultaTranxMEXSRoutes);

export default app;