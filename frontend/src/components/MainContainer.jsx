import React, { useState } from 'react'

//Importamos componentes.
import Navbar from './navbar';
import { Menu } from './Menu';
import clsx from 'clsx';

import { IsExpired } from "./isExpired";

import { makeStyles } from '@material-ui/core';

//API
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        backgroundColor: theme.palette.grey[50],
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -240,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    toolbar: theme.mixins.toolbar,
}));

export const ContainerBox = (props) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const User = useSelector(store => store.auth.user);

    return (
        <div className={classes.root}>
            <Navbar
                open={open}
                handleDrawerOpen={handleDrawerOpen}
                User={User[0]}
            />

            <Menu
                open={open}
                handleDrawerClose={handleDrawerClose}
            />

            <div className={clsx(classes.content, { [classes.contentShift]: open, })}>

                <div className={classes.toolbar}></div>
                {
                    props.children
                }


            </div>

            {User[1].exp < (Date.now() / 1000) ?
                <IsExpired
                    User={User[0]}
                />
                :
                null
            }
        </div>
    )
}