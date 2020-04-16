import React from 'react';
import Button from '@material-ui/core/Button';
import MuiTextBox from './textbox'
import MuiCheckBox from './checkbox'
import MuiPassTextBox from './password'
import { withStyles } from '@material-ui/core/styles';
import SimpleReactValidator from 'simple-react-validator';

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
    constructor(props) {
        super(props)
        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            element: message => message
        });
    }

    handleChange = (value, index) => {
        this.props.handleChange(value, index)
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
        const { formFields, classes, submitText, submitFullWidth } = this.props
        return (
            <React.Fragment>
                <form className={classes.form} noValidate onSubmit={this.handleSubmit}>

                    {formFields.map((form, index) => {

                        switch (form.type) {
                            case 'password':
                                return (
                                    <MuiPassTextBox
                                        label={form.label}
                                        name={form.name}
                                        required={form.required}
                                        fullWidth
                                        helperText={this.validator.message(form.name, form.value, form.validation)}
                                        index={index}
                                        key={index}
                                        value={form.value}
                                        handleChange={this.handleChange}
                                    />
                                )
                            case 'checkbox':
                                return (
                                    <MuiCheckBox
                                        label={form.label}
                                        name={form.name}
                                        required={form.required}
                                        fullWidth
                                        helperText={this.validator.message(form.name, form.value, form.validation)}
                                        index={index}
                                        key={index}
                                        value={form.value}
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
                                        fullWidth
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