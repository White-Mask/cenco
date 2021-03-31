import React from 'react'

import { Button, makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import WarningIcon from '@material-ui/icons/Warning';

// Alerta
import Swal from 'sweetalert2';

import { useDispatch } from 'react-redux';

//Dialog
import DialogContentText from '@material-ui/core/DialogContentText'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { eliminarUsuarioAccion, obtenerUsuariosAccion } from '../redux/UsuariosDucks';

const useStyles = makeStyles((theme) => ({
    progress: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
    warning: {
        backgroundColor: '#ffc107',
        '&:hover': {
            backgroundColor: '#ffc107 ',
        },
    }
}));

export const DialogDelete = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const handleSubmit = (id) => {
        try {
            dispatch(eliminarUsuarioAccion(id))
                .then(() => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: "La operación eliminar usuario resulto exitosa",
                        showConfirmButton: false,
                        timer: 2500
                    })
                    handleCancel()
                    dispatch(obtenerUsuariosAccion())
                })
        } catch (error) {
            console.log(error)
        }
    }

    const handleCancel = () => {
        props.setOpenDelete(false);
        props.setIdUser(null);
    }

    return props.data ? (

        <Dialog open={props.openDelete} onClose={() => handleCancel()} aria-labelledby="form-dialog-title">


            <DialogTitle id="form-dialog-title">Eliminar al usuario: 
                {props.data.Nombres} {props.data.ApellidoP} {props.data.ApellidoM}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Esta seguro que desea eliminar de manera permanente a este usuario?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleCancel()} color="secondary">Cancelar</Button>
                <Button onClick={() => handleSubmit(props.Id)} className={classes.warning}> <WarningIcon/> Sí, deseo eliminar a este usuario</Button>
            </DialogActions>

        </Dialog>
    )
        :
        <div className={classes.progress}>
            <CircularProgress />
        </div>
}