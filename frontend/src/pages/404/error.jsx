import React from 'react';

//css
import { makeStyles } from '@material-ui/core';

//material-ui widget
import { Typography, Grid } from '@material-ui/core';

//Imagen
import imagenError from '../../static/error.png';
import { Controls } from '../../components/controls/Controls';

//Redux
import { withRouter } from 'react-router-dom'; //redireccionar

const useStyles = makeStyles((theme) => ({
    img: {
        textAlign: "center"
    },
    volver: {
        color: 'black',
        margin: theme.spacing(4),
        backgroundColor: '#DE9B00',
        '&:hover': {
            backgroundColor: '#DE9B00 ',
        },
    }
}));

const Error = (props) => {
    const classes = useStyles();

    return (
        <div>
            <Grid container direction="row" justify="center" alignItems="center" className={classes.img}>
                <Grid item xl>
                    <img src={imagenError} alt="pagina no encontrada" />
                </Grid>
            </Grid>
            <Grid container direction="column" justify="center" alignItems="center" >
                <Grid item xl >
                    <Typography variant='h2' className={classes.img}>
                        Ups!
                        </Typography>
                    <Typography variant='h3' >
                        La página que buscas no existe
                    </Typography>
                </Grid>

                <Grid item xl >
                    <Controls.Button
                        size="large"
                        onClick={() => props.history.push('/')}
                        text="Volver"
                        className={classes.volver}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(Error);