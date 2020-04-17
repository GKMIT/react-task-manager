import React from "react";
import MaterialTable from 'material-table';

const tableRef = React.createRef();

export default function MaterialDataTable(props) {
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

    if (props.onRefresh) {
        actions.push({
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => {
                props.onRefresh();
            },
        })
    }


    const data = props.data ? props.data : []

    return (
        <MaterialTable
            tableRef={tableRef}
            title={props.title}
            data={data}
            options={options}
            actions={actions}
            columns={columns}
        />);
}