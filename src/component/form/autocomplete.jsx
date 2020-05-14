import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { crudService } from '../../_services';


class MuiAutocompleteBox extends React.Component {

    constructor() {
        super()
        this.state = {
            search: false,
            searchText: '',
            options: []
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        const { url } = this.props
        const { searchText } = this.state
        const query = {
            search: searchText
        }
        crudService._getAllData(url, query)
            .then(
                result => {
                    if (result.status === 200) {
                        this.setState({
                            options: result.data.data,
                        })
                    }
                }
            );
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
        this.fetchData()
    }


    render() {
        const { name, value, label, required, fullWidth, helperText, index,getOptionLabel } = this.props
        const { searchText, search, options } = this.state

        let selected
        if (options) {
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
                        getOptionLabel={getOptionLabel}
                        onChange={(e, value) => this.handleChange(e, value, name, index)}
                        onInputChange={(e) => this.onInputChange(e, index)}
                        value={selected}
                        inputValue={search ? searchText : (selected ? selected.name : '')}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                key={name}
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

MuiAutocompleteBox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    options: PropTypes.any.isRequired
};

MuiAutocompleteBox.defaultProps = {
    name: "",
    label: "",
    value: "",
    options: []
}


export default MuiAutocompleteBox;