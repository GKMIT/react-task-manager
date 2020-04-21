import React from "react";
import MaterialTable from 'material-table';
import { crudService } from '../../_services';
import { alertActions } from '../../_actions';
import { connect } from 'react-redux';

const tableRef = React.createRef();

function MaterialDataTable(props) {
    const [columns] = React.useState(props.columns);

    const actions = []
    const options = {
        selection: props.selection,
        actionsColumnIndex: -1,
        search: true,
        sorting: true,
        filtering: true,
    }

    if (props.deleteAll) {
        actions.push({
            icon: 'delete',
            tooltip: 'Delete',
            onClick: (event, rowData) => {
                props.deleteAll(rowData);
            }
        })
    }
    if (props.addData) {
        actions.push({
            icon: 'add',
            tooltip: 'Add',
            isFreeAction: true,
            onClick: () => {
                props.addData();
            }
        })
    }

    if (props.refresh) {
        actions.push({
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => tableRef.current && tableRef.current.onQueryChange()
        })
    }

    return (
        <MaterialTable
            tableRef={tableRef}
            title={props.title}
            data={query =>
                new Promise((resolve, reject) => {
                    crudService._getAll(props.url, query)
                        .then(
                            result => {
                                resolve({
                                    data: result.data.data,
                                    page: result.data.page - 1,
                                    totalCount: result.data.total,
                                })
                            },
                            error => {
                                props.showError(error.message)
                            }
                        );
                })
            }
            options={options}
            actions={actions}
            columns={columns}
        />);
}

const actionCreators = {
    showError: alertActions.error,
}

export default connect(null, actionCreators)(MaterialDataTable);