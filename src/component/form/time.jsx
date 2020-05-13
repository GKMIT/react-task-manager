import React from 'react';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

class MuiTimePicker extends React.Component {

    handleChange = (value, name, index) => {
        this.props.handleChange(value, name, index)
    }

    render() {
        const { name, label, value, required, fullWidth, helperText, index, variant, format } = this.props
        return (
            <React.Fragment>
                <FormControl
                    error={helperText ? true : false}
                    fullWidth={fullWidth}
                >

                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardTimePicker
                            clearable
                            autoOk
                            variant={variant}
                            format={format}
                            margin="normal"
                            required={required}
                            label={label}
                            value={value}
                            name={name}
                            onChange={e => this.handleChange(e, name, index)}
                        />
                    </MuiPickersUtilsProvider>

                    {helperText && <FormHelperText>{helperText}</FormHelperText>}
                </FormControl>
            </React.Fragment>
        )

    }
}

export default MuiTimePicker;