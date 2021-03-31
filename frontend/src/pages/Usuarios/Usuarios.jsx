import React, { useEffect, useState } from 'react'

//css
import { makeStyles } from '@material-ui/core';

//material-ui widget
import { Typography, IconButton } from '@material-ui/core';

// Tabla de datos
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@material-ui/core';

//Efecto loading
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import WarningIcon from '@material-ui/icons/Warning';
import DeleteIcon from '@material-ui/icons/Delete';

//Importamos componentes.
import { ContainerBox } from '../../components/MainContainer';
import { DialogEdit } from '../../components/DialogEdit';
import { DialogConfirmar } from '../../components/DialogConfirmar';
import FormularioUsuario from '../../pages/Usuarios/FormularioUsuario';

// Conexion API
import { useDispatch, useSelector } from 'react-redux';
import { insertarLogsAccion } from '../../redux/logsDucks';
import {
    obtenerUsuariosAccion,
    crearUsuarioAccion,
    actualizarUsuarioAccion,
    eliminarUsuarioAccion
} from '../../redux/UsuariosDucks';

import { obtenerPerfilAccion } from '../../redux/perfilesDucks';

const useStyles = makeStyles((theme) => ({
    title: {
        color: 'black',
        padding: theme.spacing(2)
    },
    edit: {
        margin: theme.spacing(1),
        color: '#DE9B00',
    },
    delete: {
        margin: theme.spacing(1),
        color: '#D10000',
    },
    table: {
        minWidth: 650,
    },
    container: {
        maxHeight: 550,
    },
    items: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    },
    loading: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
    },
    itemLoading: {
        margin: theme.spacing(2)
    }
}));

const Head = ['Nombres', 'ApellidoP', 'ApellidoM', 'Email', 'Username', 'Perfil', 'Funciones']

export const Usuarios = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [IdTable, setIdTable] = useState(null);
    const [title, setTitle] = useState('');
    const [openDelete, setOpenDelete] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [Loading, setLoading] = useState(false);

    const User = useSelector(store => store.auth.user);
    const usuarios = useSelector(store => store.usuarios.array);
    const perfiles = useSelector(store => store.Perfiles.array);

    const handleOpenDialog = () => {
        setTitle("Crear usuario")
        setIdTable(null)
        setOpenDialog(true)
    };

    const handleClickOpenEdite = (idTable) => {
        setIdTable(idTable);
        setTitle("Editar usuario")
        setOpenDialog(true);
    };

    const handleClickOpenDelete = (idTable) => {
        setIdTable(idTable);
        setOpenDelete(true);
    };

    const createOrEdite = (Id, Nombres, ApellidoP, ApellidoM, Email, Username, perfil) => {
        setLoading(true)
        Id === 0 ?
            dispatch(crearUsuarioAccion(Nombres, ApellidoP, ApellidoM, Email, Username, perfil))
                .then(() => dispatch(insertarLogsAccion(User[0].Username, "Usuarios", 1, `Crear de usuario`)))
            :
            dispatch(actualizarUsuarioAccion(Id, Nombres, ApellidoP, ApellidoM, Email, Username, perfil))
                .then(() => dispatch(insertarLogsAccion(User[0].Username, "Usuarios", 1, `Editar de usuario`)))
                .then(() => dispatch(obtenerUsuariosAccion()))
                .then(() => setLoading(false))

        setIdTable(null)
        setOpenDialog(false)
    }

    const handleDelete = id => {
        setLoading(true)
        dispatch(eliminarUsuarioAccion(id))
            .then(() => dispatch(insertarLogsAccion(User[0].Username, "Usuarios", 1, `Eliminar Usuario`)))
            .then(() => dispatch(obtenerUsuariosAccion()))
            .then(() => setLoading(false))

        setIdTable(null)
        setOpenDelete(false)
    }

    // Cargamos la informacion cuando termina de "pintarse los componentes".
    useEffect(() => {
        setLoading(true)
        dispatch(obtenerUsuariosAccion())
        dispatch(obtenerPerfilAccion()).then(() => setLoading(false))
            .then(() => dispatch(insertarLogsAccion(User[0].Username, "Usuarios", 1, `Visualización de usuarios`)))
    }, [User, dispatch])

    console.log(usuarios)
    return (
        <ContainerBox>
            <Typography variant='h3' align='center' className={classes.title}>
                Usuarios
                </Typography>

            <TableContainer component={Paper} className={classes.container}>
                <Table className={classes.table} stickyHeader aria-label="sticky table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" >
                                <IconButton onClick={handleOpenDialog} > <AddIcon /> </IconButton>
                            </TableCell>
                            {
                                Head.map((item, Id) => (
                                    <TableCell key={Id} align="left" >{item}</TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>


                    <TableBody>
                        {
                            Loading === false ?
                                usuarios.length > 0 ?
                                    usuarios.map((item, id) => (
                                        <TableRow key={id} component="tr">
                                            <TableCell></TableCell>
                                            {
                                                Object.keys(item).map((oneKey, i) => (
                                                    (oneKey !== 'Id') && (oneKey !== 'IdPerfil') && (oneKey !== 'Password') ?
                                                        <TableCell key={i} align="left" >
                                                            {item[oneKey]}
                                                        </TableCell>
                                                        :
                                                        null
                                                ))
                                            }

                                            <TableCell component="td" align='left'>
                                                <IconButton variant="contained" size="small" className={classes.edit} onClick={() => handleClickOpenEdite(item)}> <EditIcon /> </IconButton>
                                                <IconButton variant="contained" size="small" className={classes.delete} onClick={() => handleClickOpenDelete(item.Id)} > <DeleteIcon /> </IconButton>
                                            </TableCell>

                                        </TableRow>
                                    ))
                                    :
                                    <TableRow>
                                        <TableCell align="center" colSpan={Head.length}>Sin registros</TableCell>
                                    </TableRow>
                                :
                                <TableRow>
                                    <TableCell align="center" colSpan={Head.length + 1}>
                                        <div className={classes.loading}>
                                            <CircularProgress className={classes.itemLoading} />
                                            <span>Cargando ...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <DialogEdit
                setOpen={setOpenDialog}
                open={openDialog}
                loading={Loading}
                title={title}
                maxWidth="sm"
            >
                <FormularioUsuario
                    data={IdTable}
                    perfiles={perfiles}
                    createOrEdite={createOrEdite}
                />
            </DialogEdit>

            <DialogConfirmar
                setOpen={setOpenDelete}
                open={openDelete}
                loading={Loading}
                Icon={WarningIcon}
                title="¿Desea eliminar este usuario?"
                subtitle="¿Esta seguro que desea eliminar de manera permanente a este usuario?"
                onClick={() => handleDelete(IdTable)}
                confirmar={"Sí, deseo eliminar este usuario"}
            />
        </ContainerBox>
    )
}