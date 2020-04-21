import React from 'react';
import MuiForm from '../../component/form'
import FormLayout from '../../theme/formLayout'

import { connect } from 'react-redux';
import { userActions } from '../../_actions';

class Form extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: 'User form',
            submitText: 'Save',
            form: [
                {
                    name: 'email',
                    label: 'Email',
                    type: 'email',
                    icon: 'mail',
                    value: '',
                    validation: 'required|email',
                },
                {
                    name: 'password',
                    label: 'Password',
                    type: 'password',
                    icon: 'password',
                    value: '',
                    validation: 'required',
                }
            ]
        }
    }

    handleChange = (value, index) => {
        const { form } = this.state
        form[index].value = value
        this.setState(form)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { form } = this.state
        this.props.login(form[0].value, form[1].value)
    }

    render() {    
        const { title, submitText } = this.state

        return (
            <FormLayout title={title} fullWidth={false}>
                <MuiForm
                    formFields={this.state.form}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    submitText={submitText}
                    submitFullWidth={true}
                    fullWidth={true}
                    noValidate={false}
                />
            </FormLayout >
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

export default connect(mapState, actionCreators)(Form);
