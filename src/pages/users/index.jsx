import React from 'react';
import { connect } from 'react-redux';
import { crudActions, confirmActions } from '../../_actions';

import { TableAction } from '../../component/material-table/tableAction'
import MaterialDataTable from '../../component/material-table/table'

const title = 'User List'
class List extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        this.props.getAll('users', 'users');
    }

    refresh = () => {
        this.getData();
    }

    render() {
        const columns = []
        columns.push({
            title: "Email",
            field: "email"
        })
        if (this.deleteCrud && this.editCrud) {
            columns.push(TableAction(this.deleteCrud, this.editCrud))
        }
        const { listData } = this.props

        return (
            <React.Fragment>
                <MaterialDataTable
                    title={title}
                    data={listData}
                    columns={columns}
                    addCrud={this.addCrud}
                    deleteAll={this.deleteAll}
                    onRefresh={this.refresh}
                />
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    const { users, confirm } = state;
    return { listData: users, confirm };
}

const actionCreators = {
    getAll: crudActions._getAll,
    deleteCrud: crudActions._delete,
    showConfirm: confirmActions.show,
    clearConfirm: confirmActions.clear,
}

export default connect(mapStateToProps, actionCreators)(List);
