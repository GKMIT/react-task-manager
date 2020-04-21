import React from 'react';
import { connect } from 'react-redux';
import { crudActions, confirmActions } from '../../_actions';

import { TableAction } from '../../component/material-table/tableAction'
import MaterialDataTable from '../../component/material-table/table'

const title = 'Role List'
class List extends React.Component {

    deleteData = (id) => {
        this.props.deleteCrud('roles', 'roles', id);
    }

    deleteCrud = (data) => {
        this.props.showConfirm('confirm', `are you sure want to delete ${data.email} ?`, data)
    }

    deleteAll = (data) => {
        this.props.showConfirm('confirm', `are you sure want to delete ${data.length} row ?`, data)
    }

    editCrud = (data) => {
        this.props.history.push(`/role-form/${data.id}`)
    }

    addData = () => {
        this.props.history.push(`/role-form/new`)
    }

    render() {
        const columns = []
        columns.push({
            title: "Name",
            field: "name"
        })
        if (this.deleteCrud && this.editCrud) {
            columns.push(TableAction(this.deleteCrud, this.editCrud))
        }
        return (
            <React.Fragment>
                <MaterialDataTable
                    title={title}
                    url='roles'
                    columns={columns}
                    selection={true}
                    addData={this.addData}
                    deleteAll={this.deleteAll}
                    refresh={true}
                />
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    const { roles, confirm } = state;
    return { listData: roles, confirm };
}

const actionCreators = {
    getAll: crudActions._getAll,
    deleteCrud: crudActions._delete,
    showConfirm: confirmActions.show,
    clearConfirm: confirmActions.clear,
}

export default connect(mapStateToProps, actionCreators)(List);
