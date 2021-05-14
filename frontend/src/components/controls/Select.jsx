import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem } from '@material-ui/core';

const Select = (props) => {
    return (
        <FormControl>
            <InputLabel shrink>{props.label}</InputLabel>
            <MuiSelect
                id={props.id}
                label={props.label}
                value={props.value}
                onChange={props.onChange}
                displayEmpty
            >
                <MenuItem key={0} value={''}>Ninguno</MenuItem>
            {
                props.options.map( (item, id) => (
                    <MenuItem key={id} value={item.Id}>{item.Perfil}</MenuItem>
                ))        
            }
            </MuiSelect>
        </FormControl>
    )
}

export default Select;