import React, { useState } from 'react'

//css
import { makeStyles } from '@material-ui/core';

//Icons
import TimerOffIcon from '@material-ui/icons/TimerOff';

//componentes
import { DialogAlert } from './DialogAlert';

//API
import { useDispatch } from 'react-redux';
import { logoutAccion } from '../redux/authDucks';
import { insertarLogsAccion } from '../redux/logsDucks';

const useStyles = makeStyles((theme) => ({
    timeOut: {
        fontSize: "200px",
        alignItems: "center",
        margin: theme.spacing(2)
    }
}));

export const IsExpired = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const [alert, setAlert] = useState(true); 

    return(
        <DialogAlert

            open={alert}
            loading={false}
            Icon={TimerOffIcon}
            IconColor={classes.timeOut}
            title={"El tiempo se acabo"}
            subtitle={"tu sesión expiro, vuelve a ingresar para utilizar el monitor."}
            onClick={() => {
                setAlert(false)
                dispatch(logoutAccion())
                    .then(() => dispatch(insertarLogsAccion(props.User.Username, "Logout", 1, "Expiración de token")))
            }}
        />
    )
}