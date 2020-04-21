import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Copyright from '../component/copyright'
import MuiForm from '../component/form'

import { connect } from 'react-redux';
import { userActions } from '../_actions';

const styles = (theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    }
});


class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: 'Sign in',
            submitText: 'Sign in',
            form: {
                email: '',
                password: '',
            }
        }
    }

    createForm = () => {
        const { form } = this.state
        let formFields = []

        formFields.push({
            name: 'email',
            label: 'Email',
            type: 'email',
            icon: 'mail',
            value: form.email,
            validation: 'required|email',
        })

        formFields.push({
            name: 'password',
            label: 'Password',
            type: 'password',
            value: form.password,
            validation: 'required',
        })

        return formFields
    }

    handleChange = (value, name) => {
        const { form } = this.state
        form[name] = value
        this.setState(form)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { form } = this.state
        this.props.login(form.email, form.password)
    }

    render() {
        const { classes } = this.props
        const { title, submitText } = this.state
        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {title}
                        </Typography>

                        <MuiForm
                            formFields={this.createForm()}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                            submitText={submitText}
                            submitFullWidth={true}
                            fullWidth={true}
                            noValidate={false}
                        />

                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

function mapState(state) {
    const { loggedIn } = state.authentication;
    return { loggedIn };
}

const actionCreators = {
    login: userActions.login,
};

export default withStyles(styles)(connect(mapState, actionCreators)(Login));
