import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


class MuiAutocompleteBox extends React.Component {

    constructor() {
        super()
        this.state = {
            search: false,
            searchText: ''
        }
    }

    handleChange = (e, value, name, index) => {
        e.persist()
        if (value) {
            this.props.handleChange(value.id, name, index)
        } else {
            this.props.handleChange('', name, index)
        }

        this.setState({ search: false })
    }

    onInputChange = (e) => {
        e.persist()
        let { searchText } = this.state
        searchText = e.target.value ? e.target.value : ''
        this.setState({ searchText: searchText, search: true })
    }


    render() {
        const { name, value, label, required, fullWidth, options, helperText, index } = this.props
        const { searchText, search } = this.state

        let selected
        if (options && options.length) {
            selected = options.find(option => option.id === value)
        }

        return (
            <React.Fragment>
                <FormControl
                    error={helperText ? true : false}
                    fullWidth={fullWidth}
                >

                    <Autocomplete
                        options={options}
                        getOptionLabel={(option) => option.name}
                        onChange={(e, value) => this.handleChange(e, value, name, index)}
                        onInputChange={(e) => this.onInputChange(e, index)}
                        value={selected}
                        inputValue={search ? searchText : (selected ? selected.name : '')}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                name={name}
                                required={required}
                                label={label}
                            />}
                    />

                    {helperText && <FormHelperText>{helperText}</FormHelperText>}
                </FormControl>
            </React.Fragment>
        )

    }
}

export default MuiAutocompleteBox;