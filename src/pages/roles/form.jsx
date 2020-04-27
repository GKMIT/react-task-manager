import React from 'react';
import MuiForm from '../../component/form'
import FormLayout from '../../theme/formLayout'
import { connect } from 'react-redux';
import { crudActions, alertActions } from '../../_actions';

class Form extends React.Component {

    constructor() {
        super()
        this.state = {
            title: 'Create Role',
            submitText: 'Create',
            action: 'create',
            id: null,
            form: {
                name: '',
                permissions: []
            },
        }
    }

    createForm = () => {
        const { form } = this.state
        const { permissions } = this.props
        let formFields = []

        formFields.push({
            name: 'name',
            label: 'Name',
            type: 'text',
            icon: '',
            value: form.name,
            validation: 'required',
        })

        formFields.push({
            name: 'permissions',
            label: 'Permissions',
            type: 'multiselect',
            icon: '',
            value: form.permissions,
            options: permissions,
            validation: 'required',
        })

        return formFields
    }

    componentDidMount() {
        const { id } = this.props.match.params
        if (id && id !== 'new') {
            this.props.getData('role', 'roles', id)
        }
        this.props.getAll('permissions', 'permissions')
    }

    static getDerivedStateFromProps(props) {
        let newState = {};
        if (props.match.params.id !== 'new' && props.form !== null) {
            newState.id = props.match.params.id
            newState.title = 'Edit Role'
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
                name: form.name,
                permissions: JSON.stringify(form.permissions),
            }
            if (action === 'update') {
                this.props.updateData('role', 'roles', id, formData)
            } else {
                this.props.createData('role', 'roles', formData)
            }
            this.props.history.push('/roles')
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
    const { role, permissions } = state;
    let permissionData = []
    if (permissions) {
        permissions.forEach(element => {
            permissionData.push({
                id: element.id,
                name: element.code
            })
        });
    }
    return {
        form: role,
        permissions: permissionData
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
