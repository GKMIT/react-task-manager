import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SimpleReactValidator from 'simple-react-validator';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import MuiTextBox from './textbox'
import MuiCheckBox from './checkbox'
import MuiPassTextBox from './password'
import MuiSelectBox from './selectbox'
import MuiMultiSelectBox from './multiselectbox'
import MuiDatePicker from './date'
import MuiTimePicker from './time'


const styles = (theme) => ({
    button: {
        marginRight: theme.spacing(1),
    },
    stepWrapper: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    stepButtonWrapper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1),
    },
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
        this.state = {
            activeStep: 0,
            skipped: null
        }

        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            element: message => message
        });
    }

    setActiveStep = (value) => {
        this.setState({
            activeStep: value
        })
    }

    setSkipped = (value) => {
        this.setState({
            skipped: value
        })
    }

    isStepOptional = (step) => {
        const { steps } = this.props
        const optional = steps.findIndex(step => step.optional === true)
        return step === optional;
    };

    isStepSkipped = (step) => {
        const { skipped } = this.state
        return step === skipped;
    };

    handleNext = () => {
        const { activeStep } = this.state        
        const { steps } = this.props

        this.validator.hideMessages();

        let isValid = true
        if (steps) {
            steps.forEach((element, index) => {
                if (activeStep == index) {
                    if (element.formFields) {
                        element.formFields.forEach(formField => {
                            if (!this.validator.fieldValid(formField.name)) {
                                isValid = false
                            }
                        });
                    }
                }
            });
        }

        if (isValid) {
            this.isStepSkipped(activeStep)
            this.setActiveStep(activeStep + 1);
            this.setSkipped(activeStep + 1);
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    };

    handleBack = () => {
        const { activeStep } = this.state
        this.setActiveStep(activeStep - 1);
    };

    handleSkip = () => {
        const { activeStep } = this.state
        if (!this.isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        this.setActiveStep(activeStep + 1);
        this.setSkipped(activeStep);
    };

    handleReset = () => {
        this.setActiveStep(0);
    };

    confirmPanel = () => {
        const { classes, submitText, submitFullWidth } = this.props
        return (
            <React.Fragment>
                <Typography className={classes.stepWrapper}>
                    All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={this.handleReset} className={classes.button}>
                    Reset
                </Button>
                <Button
                    type="submit"
                    fullWidth={submitFullWidth}
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    {submitText}
                </Button>
            </React.Fragment>
        )
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
        const { activeStep } = this.state
        const { steps, classes, fullWidth } = this.props

        return (
            <React.Fragment>
                <form className={classes.form} noValidate onSubmit={this.handleSubmit}>

                    <Stepper activeStep={activeStep}>
                        {steps.map((step, index) => {
                            const stepProps = {};
                            const labelProps = {};

                            if (step.optional) {
                                labelProps.optional = <Typography variant="caption">Optional</Typography>;
                            }

                            if (this.isStepSkipped(index)) {
                                stepProps.completed = false;
                            }

                            return (
                                <Step key={step.label} {...stepProps}>
                                    <StepLabel {...labelProps}>{step.label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>


                    <div>
                        {activeStep === steps.length ? (
                            this.confirmPanel()
                        ) : (
                                <div>
                                    {/* start process form */}
                                    {steps.map((step, index) => {
                                        if (index === activeStep) {
                                            return (
                                                step.formFields.map((form, index) => {
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
                                                })
                                            )
                                        }
                                        return ''
                                    })}
                                    {/* end process form */}

                                    {/* process buttons */}
                                    <div className={classes.stepButtonWrapper}>
                                        <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>
                                            Back
                                        </Button>

                                        {this.isStepOptional(activeStep) && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleSkip}
                                                className={classes.button}
                                            >
                                                Skip
                                            </Button>
                                        )}

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                    {/* end process buttons */}
                                </div>
                            )}
                    </div>

                </form>
            </React.Fragment>
        )

    }
}


export default withStyles(styles)(MuiForm);