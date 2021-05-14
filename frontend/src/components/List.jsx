import React, { useState } from 'react';

//css
import { makeStyles } from '@material-ui/core/styles';

//Lista
import ListaPaginas from './PageDataList';
import { Divider, List, ListItem, ListItemText, ListItemIcon, Collapse } from '@material-ui/core';

//Icons 
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import HomeIcon from '@material-ui/icons/Home';

//Componentes
import { NavLink } from 'react-router-dom';

//API
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export const Lista = () => {

    const classes = useStyles();

    const [activeIndex, setActiveIndex] = useState(null);
    const modulos = useSelector(store => store.auth.modulos);

    let menu = []

    modulos.forEach(modulo => {
        let item = ListaPaginas.find(moduloMenu => moduloMenu.primary === modulo.Modulo)
        if (item !== undefined) {
            menu.push(item)
        }
    })

    return (
        <div>
            <List disablePadding dense component="nav" aria-label="main mailbox folders">

                <ListItem button component={NavLink} to="/" activeClassName="active">
                    <ListItemIcon> <HomeIcon /> </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>

                <Divider />
                {
                    menu.map((item, Id) => (
                        <div key={Id}>
                            <ListItem button onClick={event => setActiveIndex(activeIndex === Id ? null : Id)}>
                                <ListItemText key={item.primary} primary={item.primary} />
                                {activeIndex === Id ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={activeIndex === Id} timeout="auto" unmountOnExit>
                                <List key={Id} component="div" disablePadding>
                                    {item.children.map((subItem, SubId) =>
                                        <ListItem 
                                            button 
                                            disabled={subItem.primary === "Perfiles"? true : false} 
                                            key={SubId} component={NavLink} 
                                            to={subItem.to} 
                                            className={classes.nested}
                                        >
                                            <ListItemText key={subItem.primary} primary={subItem.primary} />
                                        </ListItem>
                                    )}
                                </List>
                            </Collapse>
                        </div>

                    ))
                }
            </List>
        </div>
    )
}


/*
                <ListItem button onClick={handleSGVClick}>
                    <ListItemText primary="SGV" />
                    {openSGV ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openSGV} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem component={NavLink} to="/SGV/DetalleDocumentos" className={classes.nested}>
                            <ListItemText primary="Detalle documentos" />
                        </ListItem>

                        <ListItem component={NavLink} to="/SGV/ConsultaTranxSinFolio" className={classes.nested}>
                            <ListItemText primary="Consulta Tranx Sin Folio" />
                        </ListItem>
                    </List>
                </Collapse>


                <ListItem button onClick={handleCDPClick}>
                    <ListItemText primary="CDP" />
                    {openCDP ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openCDP} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem component={NavLink} to="/CDP/totales" className={classes.nested}>
                            <ListItemText primary="Totales CDP" />
                        </ListItem>

                        <ListItem component={NavLink} to="/CDP/excluir-tienda-alarma" className={classes.nested}>
                            <ListItemText primary="Excluir tienda alarma" />
                        </ListItem>

                        <ListItem component={NavLink} to="/CDP/eamtran" className={classes.nested}>
                            <ListItemText primary="Detalles EAMTRAN" />
                        </ListItem>
                    </List>
                </Collapse>


                <ListItem button onClick={handleTSAVClick}>
                    <ListItemText primary="TSAV" />
                    {openTSAV ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openTSAV} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem component={NavLink} to="/TSAV/interfaces-con-error" className={classes.nested}>
                            <ListItemText primary="Admin interfaces TSAV" />
                        </ListItem>
                    </List>
                </Collapse>


                <ListItem button onClick={handleInterfazClick}>
                    <ListItemText primary="Interfaces" />
                    {openInter ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openInter} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem component={NavLink} to="/Interfaces/regenerar-vta" className={classes.nested}>
                            <ListItemText primary="Regenerar VTA" />
                        </ListItem>
                        <ListItem component={NavLink} to="/Interfaces/reenviar-cc3" className={classes.nested}>
                            <ListItemText primary="Reenviar CC3" />
                        </ListItem>
                    </List>
                </Collapse>


                <ListItem button onClick={handleAdminClick}>
                    <ListItemText primary="Admin" />
                    {openAdmin ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openAdmin} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem component={NavLink} to="/Admin/Usuarios" className={classes.nested}>
                            <ListItemText primary="Usuarios" />
                        </ListItem>

                        <ListItem component={NavLink} to="/Admin/Perfiles" className={classes.nested}>
                            <ListItemText primary="Perfiles" />
                        </ListItem>

                        <ListItem component={NavLink} to="/Admin/Logs" className={classes.nested}>
                            <ListItemText primary="Logs" />
                        </ListItem>
                    </List>
                </Collapse>

*/