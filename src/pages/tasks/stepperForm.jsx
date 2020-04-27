import React from 'react';
import MuiForm from '../../component/form/stepper'

import { connect } from 'react-redux';
import { crudActions, alertActions,modalActions } from '../../_actions';

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
                start_date: this.props.start_date,
                start_time: new Date(),
                end_date: this.props.end_date,
                end_time: new Date(),
                details: ''
            },
        }
    }

    createForm = () => {
        const { form } = this.state        
        const { users } = this.props
        let steps = []

        steps.push({
            label: 'Select User',
            formFields: [
                {
                    name: 'user_id',
                    label: 'User',
                    type: 'select',
                    icon: '',
                    value: form.user_id,
                    options: users,
                    validation: 'required',
                }
            ]
        })


        steps.push({
            label: 'Task Details',
            formFields: [
                {
                    name: 'name',
                    label: 'Name',
                    type: 'text',
                    icon: '',
                    value: form.name,
                    validation: 'required',
                },
                {
                    name: 'details',
                    label: 'Details',
                    type: 'text',
                    icon: '',
                    value: form.details,
                    validation: 'min:1',
                }
            ]
        })

        steps.push({
            label: 'Task Date & time',
            formFields: [
                {
                    name: 'start_date',
                    label: 'Start Date',
                    type: 'date',
                    variant: 'inline',
                    format: 'DD-MM-YYYY',
                    value: form.start_date,
                    validation: 'required',
                },
                {
                    name: 'start_time',
                    label: 'Start Time',
                    type: 'time',
                    variant: 'inline',
                    format: 'hh:mm A',
                    value: form.start_time,
                    validation: 'required',
                },
                {
                    name: 'end_date',
                    label: 'End Date',
                    type: 'date',
                    variant: 'inline',
                    format: 'DD-MM-YYYY',
                    value: form.end_date,
                    validation: 'required',
                },
                {
                    name: 'end_time',
                    label: 'End Time',
                    type: 'time',
                    variant: 'inline',
                    format: 'hh:mm A',
                    value: form.end_time,
                    validation: 'required',
                }
            ]
        })

        return steps
    }

    componentDidMount() {
        const { id } = this.props
        this.props.getAll('users', 'users')
        if (id && id !== 'new') {
            this.props.getData('task', 'tasks', id)
        }
    }

    static getDerivedStateFromProps(props) {
        let newState = {};
        if (props.id !== 'new' && props.form !== null) {
            newState.id = props.id
            newState.title = 'Edit Task'
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
                user_id: form.user_id,
                name: form.name,
                start_date: form.start_date,
                start_time: form.start_time,
                end_date: form.end_date,
                end_time: form.end_time,
                details: form.details,
            }
            if (action === 'update') {
                this.props.updateData('task', 'tasks', id, formData)
            } else {
                this.props.createData('task', 'tasks', formData)
            }      
            this.props.closeModal();      
        }
    }

    render() {
        const { submitText } = this.state
        return (
            <MuiForm
                steps={this.createForm()}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                submitText={submitText}
                submitFullWidth={false}
                fullWidth={true}
                noValidate={false}
            />
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
    closeModal: modalActions.close,
};

export default connect(mapState, actionCreators)(Form);
