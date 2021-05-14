import React, { useEffect, useState } from 'react'

//Style
import { Grid, makeStyles } from '@material-ui/core';

//Entradas
import {Controls} from '../../components/controls/Controls';

const useStyles = makeStyles((theme) => ({
    items: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    },
    accion: {
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}));

const FormularioUsuario = props => {
    const classes = useStyles();

    const [Id, setId] = useState(0)
    const [Nombres, setNombres] = useState('')
    const [ApellidoP, setApellidoP] = useState('')
    const [ApellidoM, setApellidoM] = useState('')
    const [Email, setEmail] = useState('')
    const [Username, setUsername] = useState('')
    const [perfil, setPerfil] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.createOrEdite(Id, Nombres, ApellidoP, ApellidoM, Email, Username, perfil)
    }

    useEffect(() => {
        if (props.data) {
            setId(props.data.Id)
            setNombres(props.data.Nombres)
            setApellidoP(props.data.ApellidoP)
            setApellidoM(props.data.ApellidoM)
            setEmail(props.data.Email)
            setUsername(props.data.Username)
            setPerfil(props.data.IdPerfil)
        }
    }, [props.data])

    console.log(props)

    return (
        <form onSubmit={e => handleSubmit(e)}>

            <Grid container justify="flex-start" alignItems="flex-end" spacing={2}>

                <Grid item xl className={classes.items}>
                    <Controls.Input
                        autoFocus
                        id="Nombre"
                        label="Nombre"
                        name="Nombre"
                        value={Nombres}
                        onChange={e => setNombres(e.target.value)}
                    />
                </Grid>

                <Grid item xl className={classes.items}>
                    <Controls.Input
                        autoFocus
                        id="ApellidoP"
                        label="Apellido Paterno"
                        name="ApellidoP"
                        value={ApellidoP}
                        onChange={e => setApellidoP(e.target.value)}
                    />
                </Grid>

                <Grid item xl className={classes.items}>
                    <Controls.Input
                        autoFocus
                        id="ApellidoM"
                        label="Apellido Materno"
                        name="ApellidoM"
                        value={ApellidoM}
                        onChange={e => setApellidoM(e.target.value)}
                    />
                </Grid>

                <Grid item xl className={classes.items}>
                    <Controls.Input
                        autoFocus
                        id="Email"
                        type="email"
                        label="Email"
                        name="Email"
                        value={Email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Grid>

                <Grid item xl className={classes.items}>
                    <Controls.Input
                        autoFocus
                        id="Usuario"
                        label="Usuario"
                        name="Usuario"
                        value={Username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </Grid>

                <Grid item xl className={classes.items}>
                    <Controls.Select
                        id="perfil"
                        label="Elija el tipo perfil"
                        value={perfil}
                        onChange={e => setPerfil(e.target.value)}
                        options={props.perfiles}
                    />
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

export default FormularioUsuario;