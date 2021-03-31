import React, { useEffect, useState } from 'react'

//Style
import { Grid, makeStyles, Box } from '@material-ui/core';

//Entradas
import { Controls } from '../../components/controls/Controls';

//select
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    items: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    },
    accion: {
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    progress: {
        textAlign: "center",
        margin: theme.spacing(2)
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const FormularioPerfil = props => {
    const classes = useStyles();

    const [Id, setId] = useState(0)
    const [nuevoPerfil, setNuevoPerfil] = useState('')
    const [seletedModulos, setModulos] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault()
        props.createOrEdite(Id, nuevoPerfil, seletedModulos)
    }

    useEffect(() => {
        if (props.data) {
            setId(props.data.Id)
            setNuevoPerfil(props.data.Perfil)

            let defaultModelos = []
            props.modulosOriginales.map((item) => (
                defaultModelos.push(item.Id)
            ))

            setModulos(defaultModelos)
        }
    }, [props.modulosOriginales,props.data])

    return (
        <form onSubmit={e => handleSubmit(e)}>

            <Grid container justify="flex-start" alignItems="flex-end" spacing={2}>

                <Grid item xl className={classes.items}>
                    <Controls.Input
                        autoFocus
                        id="Perfil"
                        margin="dense"
                        label="Perfil"
                        name="Perfil"
                        value={nuevoPerfil}
                        onChange={e => setNuevoPerfil(e.target.value)}
                    />
                </Grid>

                <Grid item xl className={classes.items}>
                    <Box>
                        <InputLabel id="demo-mutiple-name-label">Modulos</InputLabel>
                        <Select
                            labelId="demo-mutiple-name-label"
                            id="demo-mutiple-name"
                            multiple
                            value={seletedModulos}
                            onChange={event => setModulos(event.target.value)}
                            input={<Input />}
                            MenuProps={MenuProps}
                        >
                            {props.Modulos.map((item) => (
                                <MenuItem key={item.Modulo} value={item.Id}>
                                    {item.Modulo}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                </Grid>

            </Grid>

            {/* Accion */}
            <Grid container justify="flex-end" alignItems="flex-end" spacing={0}>
                <div>
                    <Controls.Button
                        type="submit"
                        onSubmit={handleSubmit}
                        text="Guardar"
                        className={classes.accion}
                    />
                </div>
            </Grid>

        </form>
    )
}

export default FormularioPerfil;