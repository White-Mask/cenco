import React, { useEffect, useState } from 'react'

//Style
import { Grid, makeStyles } from '@material-ui/core';

//Entradas
import { Controls } from '../../components/controls/Controls';

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

const FormularioModulos = props => {
    const classes = useStyles();

    const [Id, setId] = useState(0)
    const [Modulo, setModulo] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault()
        props.createOrEditeModulo(Id, Modulo)
    }

    useEffect(() => {
        if (props.data) {
            setId(props.data.Id)
            setModulo(props.data.Modulo)
        }
    }, [props.data])

    return (
        <form onSubmit={e => handleSubmit(e)}>

            <Grid container justify="flex-start" alignItems="flex-end" spacing={2}>

                <Grid item xl className={classes.items}>
                    <Controls.Input
                        autoFocus
                        id="Modulo"
                        margin="dense"
                        label="Modulo"
                        name="Modulo"
                        value={Modulo}
                        onChange={e => setModulo(e.target.value)}
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

export default FormularioModulos;