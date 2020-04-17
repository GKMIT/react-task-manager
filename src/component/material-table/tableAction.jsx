import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LockIcon from '@material-ui/icons/Lock';

export const TableAction = (deleteRole, editRole, editPass = false) => {
    return (
        {
            field: 'action',
            title: 'Action',
            sorting: false,
            filtering: false,
            render: rowData => (
                <React.Fragment>
                    {deleteRole && <IconButton aria-label="delete" onClick={(event) => { deleteRole(rowData) }}><DeleteIcon fontSize="small" /></IconButton>}
                    {editRole && <IconButton aria-label="edit" onClick={(event) => { editRole(rowData) }}><EditIcon fontSize="small" /></IconButton>}
                    {editPass && <IconButton aria-label="edit" onClick={(event) => { editPass(rowData) }}><LockIcon fontSize="small" /></IconButton>}
                </React.Fragment >
            )
        }
    )
}
