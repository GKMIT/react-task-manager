import React from 'react';
import MuiForm from '../../component/form'
import FormLayout from '../../theme/formLayout'

import { connect } from 'react-redux';
import { crudActions, alertActions } from '../../_actions';

class Form extends React.Component {

    constructor() {
        super()
        this.state = {
            title: 'Create user',
            submitText: 'Create',
            action: 'create',
            id: null,
            form: {
                role_id: '',
                name: '',
                mobile: '',
                email: '',
                dob: ''
            },
        }
    }

    createForm = () => {
        const { form } = this.state
        const { roles } = this.props
        let formFields = []

        formFields.push({
            name: 'role_id',
            label: 'Role',
            type: 'select',
            icon: '',
            value: form.role_id,
            options: roles,
            validation: 'required',
        })

        formFields.push({
            name: 'name',
            label: 'Name',
            type: 'text',
            icon: 'person',
            value: form.name,
            validation: 'required',
        })
        formFields.push({
            name: 'mobile',
            label: 'mobile',
            type: 'text',
            icon: 'call',
            value: form.mobile,
            validation: 'required',
        })

        formFields.push({
            name: 'email',
            label: 'Email',
            type: 'email',
            icon: 'mail',
            value: form.email,
            validation: 'required|email',
        })
        formFields.push({
            name: 'dob',
            label: 'Dob',
            type: 'date',
            variant: 'inline',
            format: 'DD-MM-YYYY',
            value: form.dob,
            validation: 'required',
        })

        return formFields
    }

    componentDidMount() {
        const { id } = this.props.match.params
        if (id && id !== 'new') {
            this.props.getData('user', 'users', id)
        }
        this.props.getAll('roles', 'roles')
    }

    static getDerivedStateFromProps(props) {
        let newState = {};
        if (props.match.params.id !== 'new' && props.form !== null) {
            newState.id = props.match.params.id
            newState.title = 'Edit User'
            newState.submitText = 'Edit'
            newState.action = 'update'
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
                role_id: form.role_id,
                name: form.name,
                mobile: form.mobile,
                email: form.email,
                dob: form.dob,
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
    const { user, roles } = state;
    return {
        form: user,
        roles
    };
}

const actionCreators = {
    getData: crudActions._get,
    getAll: crudActions._getAll,
    showError: alertActions.error,
    createData: crudActions._create,
    updateData: crudActions._update,
};

export default connect(mapState, actionCreators)(Form);
