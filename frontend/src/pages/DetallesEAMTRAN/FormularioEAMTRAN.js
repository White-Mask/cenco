import React, { useEffect, useState } from 'react'

//Style
import { Grid, makeStyles } from '@material-ui/core';

//Entradas
import { Controls } from '../../components/controls/Controls';

//select
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

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

const optionsEamtran = ["A", "B", "C"]

const FormularioEAMTRAN = props => {
    const classes = useStyles();

    const [Tienda, setTienda] = useState('')
    const [FechaFiscal, setFechaFiscal] = useState('')
    const [Eamtran, setEamtran] = useState([]);
    const [UltimoLote, setUltimoLote] = useState('')
    const [FechaUltimoLote, setFechaUltimoLote] = useState('')
    const [Status, setStatus] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.EditeEamtran(Eamtran, UltimoLote, FechaUltimoLote, Tienda, FechaFiscal, props.data.FechaUltimoLote, Status)
    }

    useEffect(() => {

        setTienda(props.data.IdLocalSAP)
        setFechaFiscal(props.data.FechaFiscal)
        setEamtran(props.data.Eamtran)
        setUltimoLote(props.data.UltimoLote)
        setFechaUltimoLote(props.data.FechaUltimoLote)
        setStatus(props.data.Status)

    }, [props.data])

    return (
        <form onSubmit={e => handleSubmit(e)}>

            <Grid container justify="flex-start" alignItems="flex-end" spacing={2}>

                <Grid item xl className={classes.items}>
                    <Controls.Input
                        autoFocus
                        margin="dense"
                        id="Tienda"
                        label="Tienda"
                        onChange={e => setTienda(e.target.value)}
                        value={Tienda}
                    />
                </Grid>

                <Grid item xl className={classes.items}>
                    <Controls.Input
                        autoFocus
                        margin="dense"
                        id="FechaFiscal"
                        label="Fecha Fiscal"
                        onChange={e => setFechaFiscal(e.target.value)}
                        value={FechaFiscal}
                    />
                </Grid>

                <Grid item xl className={classes.items}>
                    <Controls.Input
                        autoFocus
                        margin="dense"
                        id="UltimoLote"
                        label="UltimoLote"
                        onChange={e => setUltimoLote(e.target.value)}
                        value={UltimoLote}
                    />
                </Grid>

                <Grid item xl className={classes.items}>
                    <Controls.Input
                        autoFocus
                        margin="dense"
                        id="FechaUltimoLote"
                        label="FechaUltimoLote"
                        onChange={e => setFechaUltimoLote(e.target.value)}
                        value={FechaUltimoLote}
                    />
                </Grid>

                <Grid item xl className={classes.items}>
                    <Controls.Input
                        autoFocus
                        margin="dense"
                        id="Status"
                        label="Status"
                        onChange={e => setStatus(e.target.value)}
                        value={Status}
                    />
                </Grid>

                <Grid item xl className={classes.items}>
                    <FormControl>
                        <InputLabel shrink>Eamtran</InputLabel>
                        <Select
                            id="Eamtran"
                            label="Eamtran"
                            value={Eamtran}
                            onChange={event => setEamtran(event.target.value)}
                            displayEmpty
                        >
                            {
                                optionsEamtran.map((item, id) => (
                                    <MenuItem key={id} value={item}>{item}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
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

export default FormularioEAMTRAN;