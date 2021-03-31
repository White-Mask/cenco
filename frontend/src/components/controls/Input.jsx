import React from 'react'
import TextField from '@material-ui/core/TextField';

const Input = props => {
    return (
        <TextField  
            id={props.id}
            margin="dense"
            label={props.label} 
            type={props.type || "text"} 
            onChange={props.onChange} 
            value={props.value} 
        />
    )
}

export default Input;