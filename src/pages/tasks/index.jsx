import React from 'react';
import { connect } from 'react-redux';
import { crudActions, confirmActions } from '../../_actions';

import { TableAction } from '../../component/material-table/tableAction'
import MaterialDataTable from '../../component/material-table/table'

const title = 'Task List'
class List extends React.Component {

    deleteData = (id) => {
        this.props.deleteCrud('tasks', 'tasks', id);
    }

    deleteCrud = (data) => {
        this.props.showConfirm('confirm', `are you sure want to delete ${data.name} ?`, data)
    }

    deleteAll = (data) => {
        this.props.showConfirm('confirm', `are you sure want to delete ${data.length} row ?`, data)
    }

    editCrud = (data) => {
        this.props.history.push(`/task-form/${data.id}`)
    }

    addData = () => {
        this.props.history.push(`/task-form/new`)
    }

    render() {
        const columns = []
        columns.push({
            title: "Name",
            field: "name"
        })
        columns.push({
            title: "Start Date",
            field: "start_date"
        })
        columns.push({
            title: "End Date",
            field: "end_date"
        })
        columns.push({
            title: "Details",
            field: "details"
        })
        if (this.deleteCrud && this.editCrud) {
            columns.push(TableAction(this.deleteCrud, this.editCrud))
        }
        return (
            <React.Fragment>
                <MaterialDataTable
                    title={title}
                    url='tasks'
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
    const { tasks, confirm } = state;
    return { listData: tasks, confirm };
}

const actionCreators = {
    getAll: crudActions._getAll,
    deleteCrud: crudActions._delete,
    showConfirm: confirmActions.show,
    clearConfirm: confirmActions.clear,
}

export default connect(mapStateToProps, actionCreators)(List);
