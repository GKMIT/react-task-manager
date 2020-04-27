import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import TaskForm from './taskStepper/taskForm';
import TaskDetailForm from './taskStepper/taskDetailForm';
import TaskConfirmForm from './taskStepper/taskConfirmForm';

const styles = (theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
})


class StepperForm extends React.Component {

    constructor() {
        super()
        this.state = {
            steps: [
                {
                    label: 'Select User',
                    optional: false,
                    component: <TaskForm />
                },
                {
                    label: 'Select dd',
                    optional: false,
                    component: <TaskForm />
                },
                {
                    label: 'Create details',
                    optional: true,
                    component: <TaskDetailForm />
                },
                {
                    label: 'Confirm task',
                    optional: false,
                    component: <TaskConfirmForm />
                }
            ],
            activeStep: 0,
            skipped: null
        }
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
        const { steps } = this.state
        const optional = steps.findIndex(step => step.optional === true)
        return step === optional;
    };

    isStepSkipped = (step) => {
        const { skipped } = this.state
        return step === skipped;
    };

    handleNext = () => {
        const { activeStep } = this.state
        this.isStepSkipped(activeStep)
        this.setActiveStep(activeStep + 1);
        this.setSkipped(activeStep + 1);
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
        const { classes } = this.props
        return (
            <React.Fragment>
                <Typography className={classes.instructions}>
                    All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={this.handleReset} className={classes.button}>
                    Reset
                </Button>
            </React.Fragment>
        )
    }

    render() {
        const { activeStep, steps } = this.state
        const { classes } = this.props

        return (
            <React.Fragment>
                <div className={classes.root}>
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

                                    {steps.map((step, index) => {
                                        if (index === activeStep) {
                                            return (step.component)
                                        }
                                        return ''
                                    })}


                                    <div>
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
                                </div>
                            )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(StepperForm);
