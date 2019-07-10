import React from 'react';
import TextField from '@material-ui/core/TextField';

interface Props {
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
    name: string;
    value?: string;
    className?: string;
}

export const FormTextField: React.FunctionComponent<Props> = ({
    name = '',
    value = '',
    className = '',
    onChange = () => { }
}) => (
            <TextField
                id={name}
                label={name}
                name={name}
                className={className}
                value={value}
                onChange={onChange}
                margin="normal"
                variant="outlined"
            />
        
    );

