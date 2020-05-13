import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import SimpleReactValidator from 'simple-react-validator';
import { connect } from 'react-redux';
import { crudActions } from '../../_actions';


import MuiTextBox from './textbox'
import MuiCheckBox from './checkbox'
import MuiPassTextBox from './password'
import MuiSelectBox from './selectbox'
import MuiMultiSelectBox from './multiselectbox'
import MuiDatePicker from './date'
import MuiTimePicker from './time'
import FileField from './file'
import MuiDateTimePicker from './datetime'


const styles = (theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class MuiForm extends React.Component {
    constructor() {
        super()
        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            element: message => message
        });
    }

    clearFieldError = () => {
        this.props.clearData('formError')
    }

    getFieldError = (field) => {
        const { formError } = this.props
        let error
        if (formError) {
            formError.forEach(element => {
                if (element.field === field) {
                    error = element.message
                }
            });
        }
        return error
    }

    handleChange = (value, index) => {
        this.props.handleChange(value, index)
        this.clearFieldError()
    }

    fileUpload = (file) => {
        this.props.fileUpload(file)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
            this.props.handleSubmit(event)
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        const { formFields, classes, submitText, submitFullWidth, fullWidth } = this.props
        return (
            <React.Fragment>
                <form className={classes.form} noValidate onSubmit={this.handleSubmit}>

                    {formFields.map((form, index) => {

                        let helperText
                        if (form.validation) {
                            helperText = this.validator.message(form.name, form.value, form.validation)
                        }

                        if (this.getFieldError(form.name)) {
                            helperText = this.getFieldError(form.name)
                        }

                        switch (form.type) {
                            case 'select':
                                return (
                                    <MuiSelectBox
                                        label={form.label}
                                        name={form.name}
                                        required={form.required}
                                        fullWidth={fullWidth}
                                        helperText={helperText}
                                        index={index}
                                        key={index}
                                        value={form.value}
                                        options={form.options}
                                        handleChange={this.handleChange}
                                    />
                                )
                            case 'multiselect':
                                return (
                                    <MuiMultiSelectBox
                                        label={form.label}
                                        name={form.name}
                                        required={form.required}
                                        fullWidth={fullWidth}
                                        helperText={helperText}
                                        index={index}
                                        key={index}
                                        value={form.value}
                                        options={form.options}
                                        handleChange={this.handleChange}
                                    />
                                )
                            case 'password':
                                return (
                                    <MuiPassTextBox
                                        label={form.label}
                                        name={form.name}
                                        required={form.required}
                                        fullWidth={fullWidth}
                                        helperText={helperText}
                                        index={index}
                                        key={index}
                                        value={form.value}
                                        handleChange={this.handleChange}
                                    />
                                )

                            case 'file':
                                return (
                                    <FileField
                                        label={form.label}
                                        name={form.name}
                                        type={form.type}
                                        icon={form.icon}
                                        fullWidth={fullWidth}
                                        helperText={helperText}
                                        index={index}
                                        key={index}
                                        value={form.value}
                                        editable={form.editable}
                                        accept={form.accept}
                                        handleChange={this.handleChange}
                                        fileUpload={this.fileUpload}
                                    />
                                )
                            case 'checkbox':
                                return (
                                    <MuiCheckBox
                                        label={form.label}
                                        name={form.name}
                                        required={form.required}
                                        fullWidth={fullWidth}
                                        helperText={helperText}
                                        index={index}
                                        key={index}
                                        value={form.value}
                                        handleChange={this.handleChange}
                                    />
                                )

                            case 'date':
                                return (
                                    <MuiDatePicker
                                        label={form.label}
                                        name={form.name}
                                        required={form.required}
                                        fullWidth={fullWidth}
                                        helperText={helperText}
                                        index={index}
                                        key={index}
                                        value={form.value}
                                        variant={form.variant}
                                        format={form.format}
                                        handleChange={this.handleChange}
                                    />
                                )
                            case 'datetime':
                                return (
                                    <MuiDateTimePicker
                                        label={form.label}
                                        name={form.name}
                                        required={form.required}
                                        fullWidth={fullWidth}
                                        helperText={helperText}
                                        index={index}
                                        key={index}
                                        value={form.value}
                                        variant={form.variant}
                                        format={form.format}
                                        handleChange={this.handleChange}
                                    />
                                )
                            case 'time':
                                return (
                                    <MuiTimePicker
                                        label={form.label}
                                        name={form.name}
                                        required={form.required}
                                        fullWidth={fullWidth}
                                        helperText={helperText}
                                        index={index}
                                        key={index}
                                        value={form.value}
                                        variant={form.variant}
                                        format={form.format}
                                        handleChange={this.handleChange}
                                    />
                                )

                            default:
                                return (
                                    <MuiTextBox
                                        label={form.label}
                                        name={form.name}
                                        type={form.type}
                                        icon={form.icon}
                                        multiline={form.multiline}
                                        rowsMax={form.rowsMax}
                                        fullWidth={fullWidth}
                                        helperText={helperText}
                                        index={index}
                                        key={index}
                                        value={form.value}
                                        handleChange={this.handleChange}
                                    />
                                )
                        }
                    })}


                    <Button
                        type="submit"
                        fullWidth={submitFullWidth}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {submitText}
                    </Button>

                </form>
            </React.Fragment>
        )

    }
}

function mapState(state) {
    const { formError } = state;
    return {
        formError
    };
}

const actionCreators = {
    clearData: crudActions._clear,
};

export default connect(mapState, actionCreators)(withStyles(styles)(MuiForm));
