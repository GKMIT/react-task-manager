import React from 'react';
import MuiForm from '../../component/form'
import FormLayout from '../../theme/formLayout'

import { connect } from 'react-redux';
import { crudActions, alertActions } from '../../_actions';

class Form extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: 'Create user',
            submitText: 'Create',
            action: 'create',
            id: null,
            form: {
                email: '',
                password: ''
            },
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
            validation: 'required:email',
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

    componentDidMount() {
        const { id } = this.props.match.params
        if (id && id !== 'new') {
            this.props.getData('user', 'users', id)
        }
    }

    static getDerivedStateFromProps(props) {
        let newState = {};
        if (props.match.params.id !== 'new' && props.form !== null) {
            newState.title = 'Edit User'
            newState.btnText = 'Edit'
            newState.form = props.form
        }
        return newState
    }

    handleChange = (value, name) => {
        const { form } = this.state
        form[name] = value
        this.setState(form)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { action, id, form } = this.state
        if (form) {
            const formData = {
                email: form.email,
                password: form.password,
            }
            if (action === 'update') {
                this.props.updateData('user', 'users', id, formData)
            } else {
                this.props.createData('user', 'users', formData)
            }
            this.props.history.push('/users')
        }

    }

    render() {
        const { title, submitText } = this.state
        return (
            <FormLayout title={title} fullWidth={false}>
                <MuiForm
                    formFields={this.createForm()}
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
    const { user } = state;
    return {
        form: user,
    };
}

const actionCreators = {
    getData: crudActions._get,
    showError: alertActions.error,
    createData: crudActions._create,
    updateData: crudActions._update,
};

export default connect(mapState, actionCreators)(Form);
