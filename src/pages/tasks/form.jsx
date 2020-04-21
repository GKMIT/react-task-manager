import React from 'react';
import MuiForm from '../../component/form'
import FormLayout from '../../theme/formLayout'

import { connect } from 'react-redux';
import { crudActions, alertActions } from '../../_actions';

class Form extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: 'Create task',
            submitText: 'Create',
            action: 'create',
            id: null,
            form: {
                user_id: '',
                name: '',
                details: ''
            },
        }
    }

    createForm = () => {
        const { form } = this.state
        const { users } = this.props
        let formFields = []
        formFields.push({
            name: 'user_id',
            label: 'User',
            type: 'select',
            icon: '',
            value: form.user_id,
            options: users,
            validation: 'required',
        })

        formFields.push({
            name: 'name',
            label: 'Name',
            type: 'text',
            icon: '',
            value: form.name,
            validation: 'required',
        })

        formFields.push({
            name: 'details',
            label: 'Details',
            type: 'text',
            icon: '',
            value: form.details,
            validation: 'required',
        })

        return formFields
    }

    componentDidMount() {
        const { id } = this.props.match.params
        this.props.getAll('users', 'users')
        if (id && id !== 'new') {
            this.props.getData('task', 'tasks', id)            
        }
    }

    static getDerivedStateFromProps(props) {
        let newState = {};
        if (props.match.params.id !== 'new' && props.form !== null) {
            newState.title = 'Edit Task'
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
                user_id: form.user_id,
                name: form.name,
                details: form.details,
            }
            if (action === 'update') {
                this.props.updateData('task', 'tasks', id, formData)
            } else {
                this.props.createData('task', 'tasks', formData)
            }
            this.props.history.push('/tasks')
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
    const { task, users } = state;
    return {
        form: task,
        users
    };
}

const actionCreators = {
    getAll: crudActions._getAll,
    getData: crudActions._get,
    showError: alertActions.error,
    createData: crudActions._create,
    updateData: crudActions._update,
};

export default connect(mapState, actionCreators)(Form);
