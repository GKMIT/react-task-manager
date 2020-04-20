import React from 'react';
import { connect } from 'react-redux';
import { crudActions, confirmActions } from '../../_actions';

import { TableAction } from '../../component/material-table/tableAction'
import MaterialDataTable from '../../component/material-table/table'

const title = 'Task List'
class List extends React.Component {

    render() {
        const columns = []
        columns.push({
            title: "name",
            field: "name"
        })
        columns.push({
            title: "details",
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
    const { confirm } = state;
    return { confirm };
}

const actionCreators = {
    getAll: crudActions._getAll,
    deleteCrud: crudActions._delete,
    showConfirm: confirmActions.show,
    clearConfirm: confirmActions.clear,
}

export default connect(mapStateToProps, actionCreators)(List);
