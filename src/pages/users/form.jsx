import React from 'react';
import MuiForm from '../../component/form'
import FormLayout from '../../theme/formLayout'

import { connect } from 'react-redux';
import { crudService } from '../../_services';
import { crudActions, alertActions } from '../../_actions';

class Form extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: 'Create User',
            submitText: 'Save',
            action: 'create',
            id: null,
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
            ],
            formData: []
        }
    }


    componentDidMount() {
        const { id } = this.props.match.params
        if (id && id !== 'new') {
            this.getData(id)
        }
    }

    getData = (id) => {
        crudService._get('users', id)
            .then(
                result => {
                    this.setState({ id: id, action: 'update' })
                    this.bindForm(result.data)
                }, error => {
                    this.props.showError(error.message)
                }
            );
    }

    bindForm = (formData) => {
        const { form } = this.state
        if (!formData.length) {
            form.forEach((element, index) => {
                if (formData[element.name] !== undefined)
                    form[index]['value'] = formData[element.name]
            });
            this.setState({ form: form })
        }
    }

    handleChange = (value, index) => {
        const { form } = this.state
        form[index].value = value
        this.setState(form)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { action, id, form } = this.state
        if (form) {
            let formData = {}
            form.forEach(formValue => {
                formData[formValue.name] = formValue.value
            })
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
    const { user } = state;
    return {
        form: user
    };
}

const actionCreators = {
    getData: crudActions._get,
    showError: alertActions.error,
    createData: crudActions._create,
    updateData: crudActions._update,
};

export default connect(mapState, actionCreators)(Form);
