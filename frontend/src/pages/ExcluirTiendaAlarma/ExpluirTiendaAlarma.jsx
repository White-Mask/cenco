import React, { useEffect, useState } from 'react'

//css
import { makeStyles } from '@material-ui/core';

//material-ui widget
import { Typography, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';

//Icons
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

//Controls
import { Controls } from '../../components/controls/Controls';

//Importamos componentes.
import { ContainerBox } from '../../components/MainContainer';
import { DialogConfirmar } from '../../components/DialogConfirmar';
import { DialogAlert } from '../../components/DialogAlert';

// Conexion API
import { useDispatch, useSelector } from 'react-redux';
import { obtenerTiendasEasyAccion } from '../../redux/tiendasEasyDucks';
import { excluirLocalAlarmaAccion } from '../../redux/excluyeLocalAlarmaDucks';
import { insertarLogsAccion } from '../../redux/logsDucks';

const useStyles = makeStyles((theme) => ({
    title: {
        color: 'black',
        padding: theme.spacing(2),
    },
    table: {
        minWidth: 650,
    },
    items: {
        padding: theme.spacing(3),

    },
    container: {
        background: "white",
        border: '1px solid black',
    },
    button: {
        color: 'white',
        backgroundColor: '#7408A7',
        '&:hover': {
            backgroundColor: '#5F169B ',
        },
    },
    successful: {
        color: "green",
        fontSize: "200px",
        alignItems: "center"
    },
    error: {
        color: "red",
        fontSize: "200px",
        alignItems: "center"
    }
}));

export const ExpluirTiendaAlarma = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const [Local, setLocal] = useState('');
    const [open, setOpen] = useState(false);
    const [openAlert, setAlert] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

    const tiendasEasy = useSelector(store => store.tiendasEasy.array);
    const Status = useSelector(store => store.excluirLocalAlarma.Status);
    const User = useSelector(store => store.auth.user);

    const handleSubmit = (Local) => {
        setLoading(true)
        if (Local === '') {
            setNotify({
                isOpen: true,
                message: "Debe elegir un local",
                type: "error"
            })
            setLoading(false)
            return
        }

        dispatch(excluirLocalAlarmaAccion(Local))
            .then(() => dispatch(insertarLogsAccion(User[0].Username, "Excluir Tienda Alarma", 1, `Local ${Local}`)))
            .then(() => {
                setOpen(false)
                setAlert(true)
                setLoading(false)
            })
    }

    useEffect(() => {
        setLoading(true)
        dispatch(obtenerTiendasEasyAccion())
            .then(() => setLoading(false))
    }, [dispatch])

    return (
        <ContainerBox>
            <Typography variant='h3' align='center' className={classes.title}>
                Excluir Tienda Alarma
            </Typography>

            <Grid container alignItems="flex-end" className={classes.container}>

                <Grid item xl={5} className={classes.items}>
                    <Typography variant='h6'>
                        Excluir tienda de alarma CDP:
                    </Typography>
                </Grid>

                <Grid item xl={5} className={classes.items}>
                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                        Elija la tienda Easy
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-placeholder-label-label"
                        id="demo-simple-select-placeholder-label"
                        value={Local}
                        onChange={event => setLocal(event.target.value)}
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                        <MenuItem key={0} value="">Ninguno</MenuItem>
                        {tiendasEasy.map((item) => (
                            <MenuItem key={item.CodSAP} value={item.CodSAP}>{item.CodSAP + " - " + item.Local}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xl={2} className={classes.items}>
                    <Controls.Button
                        onClick={() => setOpen(true)}
                        text="Enviar"
                    />
                </Grid>
            </Grid>

            <DialogConfirmar
                setOpen={setOpen}
                open={open}
                loading={Loading}
                Icon={WarningIcon}

                title={"Confirmación"}
                subtitle={`¿Esta seguro que desea excluir la tienda ${Local} de la alarma CDP?`}
                onClick={() => handleSubmit(Local)}
                confirmar={`Sí, deseo excluir la tienda ${Local}`}
            />

            <DialogAlert
                setOpen={setAlert}
                open={openAlert}
                loading={Loading}
                Icon={Status === true ?
                    CheckCircleIcon
                    :
                    ErrorIcon
                }
                IconColor={Status === true ?
                    classes.successful
                    :
                    classes.error
                }
                title={Status === true ?
                    "Successful"
                    :
                    "Error"
                }
                subtitle={Status === true ?
                    `Se excluyó correctamente la tienda ${Local} de las alarmas CDP`
                    :
                    "Ocurrió un error en la exclusión."
                }
                onClick={() => {
                    setAlert(false);
                }}
            />

            {
                <Controls.Notification
                    notify={notify}
                    setNotify={setNotify}
                />
            }
        </ContainerBox>
    )
}