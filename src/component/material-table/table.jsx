import React from "react";
import MaterialTable from 'material-table';
import { crudService } from '../../_services';
import { alertActions } from '../../_actions';
import { connect } from 'react-redux';


class MaterialDataTable extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            columns: props.columns
        }

        this.tableRef = React.createRef();
    }

    componentDidUpdate() {
        if(this.tableRef.current){
            this.tableRef.current.onQueryChange()
        }
    }

    render() {
        const { columns } = this.state
        const actions = []
        const options = {
            selection: this.props.selection,
            actionsColumnIndex: -1,
            search: true,
            sorting: true,
            filtering: true,
        }

        if (this.props.deleteAll) {
            actions.push({
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, rowData) => {
                    this.props.deleteAll(rowData);
                }
            })
        }
        if (this.props.addData) {
            actions.push({
                icon: 'add',
                tooltip: 'Add',
                isFreeAction: true,
                onClick: () => {
                    this.props.addData();
                }
            })
        }

        if (this.props.refresh) {
            actions.push({
                icon: 'refresh',
                tooltip: 'Refresh Data',
                isFreeAction: true,
                onClick: () => this.tableRef.current && this.tableRef.current.onQueryChange()
            })
        }


        return (
            <MaterialTable
                tableRef={this.tableRef}
                title={this.props.title}
                data={query =>
                    new Promise((resolve, reject) => {
                        crudService._getAll(this.props.url, query)
                            .then(
                                result => {
                                    resolve({
                                        data: result.data.data,
                                        page: result.data.page - 1,
                                        totalCount: result.data.total,
                                    })
                                },
                                error => {
                                    this.props.showError(error.message)
                                }
                            );
                    })
                }
                options={options}
                actions={actions}
                columns={columns}
            />);
    }
}

const actionCreators = {
    showError: alertActions.error,
}

export default connect(null, actionCreators)(MaterialDataTable);