import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import SimpleReactValidator from 'simple-react-validator';

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

    handleChange = (value, index) => {
        this.props.handleChange(value, index)
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

                        switch (form.type) {
                            case 'select':
                                return (
                                    <MuiSelectBox
                                        label={form.label}
                                        name={form.name}
                                        required={form.required}
                                        fullWidth={fullWidth}
                                        helperText={this.validator.message(form.name, form.value, form.validation)}
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
                                        helperText={this.validator.message(form.name, form.value, form.validation)}
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
                                        helperText={this.validator.message(form.name, form.value, form.validation)}
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
                                        helperText={this.validator.message(form.name, form.value, form.validation)}
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
                                        helperText={this.validator.message(form.name, form.value, form.validation)}
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
                                        helperText={this.validator.message(form.name, form.value, form.validation)}
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
                                        helperText={this.validator.message(form.name, form.value, form.validation)}
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
                                        helperText={this.validator.message(form.name, form.value, form.validation)}
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
                                        helperText={this.validator.message(form.name, form.value, form.validation)}
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


export default withStyles(styles)(MuiForm);