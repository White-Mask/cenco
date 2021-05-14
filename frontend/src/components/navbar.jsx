import React, { useState } from 'react'
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';



import clsx from 'clsx';

//css
import { deepPurple } from '@material-ui/core/colors';

//Menu
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

//Icons
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import {ExpandMore} from '@material-ui/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


//API
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom'; //redireccionar
import { logoutAccion } from '../redux/authDucks';
import { insertarLogsAccion } from '../redux/logsDucks';

const useStyles = makeStyles((theme) => ({
    nav: {
        background: 'red',
        //boxShadow: 'none',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    firstNameColor: {
        color: 'yellow',
        fontSize: 30
    },
    SecondNameColor: {
        fontSize: 18
    },
    hide: {
        display: 'none',
    },
    appBarShift: {
        width: `calc(100% - ${240}px)`,
        marginLeft: 240,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    transparent: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: "transparent",
        margin: theme.spacing(2)
    },
    Icon: {
        alignItems: "center"
    },
    usuario:{
        fontSize: "18px",
    }
}));

const Navbar = (props) => {
    const classes = useStyles()

    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <div>
            <AppBar position="fixed" className={clsx(classes.nav, { [classes.appBarShift]: props.open, })}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => props.handleDrawerOpen()}
                        edge="start"
                        className={clsx(classes.menuButton, props.open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" className={classes.title}>
                        <span className={classes.firstNameColor}>Easy</span> <span className={classes.SecondNameColor}>Monitor de operaciones</span>
                    </Typography>



                    <Divider orientation="vertical" flexItem />


                    <Avatar className={classes.transparent} />
                    {props.User ? <span className={classes.usuario}> {props.User.Nombres+' '+props.User.ApellidoP}  </span>: null}

                    <IconButton onClick={handleClick} className={classes.Icon}>
                        <ExpandMore />
                    </IconButton>


                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem onClick={() => setAnchorEl(null)} disabled>{props.User ? props.User.perfil : null}</MenuItem>
                        <MenuItem onClick={() => {
                            dispatch(logoutAccion())
                                .then(() => dispatch(insertarLogsAccion(props.User.Username, "Logout", 1, "Cerrar sesión")))
                            props.history.push('/signin')
                        }}>
                            <ExitToAppIcon/>
                            Logout
                        </MenuItem>
                    </Menu>

                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withRouter(Navbar);