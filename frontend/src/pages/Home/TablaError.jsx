import React from 'react';

import { makeStyles } from '@material-ui/core';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    container: {
        maxHeight: 550,
    }
}));

export const TablaError = (props) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} className={classes.container}>
            <Table className={classes.table} stickyHeader aria-label="sticky table" size='small'>
                <TableHead>
                    <TableRow>
                        {
                            props.Head.map((item, id) => (
                                <TableCell key={id}>
                                    {item}
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        props.Body.map((item, id) => (
                            <TableRow component="tr" key={id}>

                                {
                                    Object.keys(item).map((oneKey, i) => (

                                        <TableCell key={i} align="left" >
                                            {item[oneKey]}
                                        </TableCell>
                                    ))
                                }

                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}
