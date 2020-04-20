import { crudConstants } from '../_constants';
import { crudService } from '../_services';
import { alertActions } from './alert.actions';
import { loaderActions } from './loader.actions';

export const crudActions = {
    _getAll,
    _get,
    _create,
    _update,
    _delete,
    _clear
};

function _clear(kind) {
    return { type: `${kind}.${crudConstants.CLEAR}` };
}

function _get(kind, url, id) {
    return dispatch => {
        dispatch(loaderActions.show());
        dispatch(request());
        crudService._get(url, id)
            .then(
                result => {
                    dispatch(success(result.data))
                    dispatch(loaderActions.hide());
                },
                error => {
                    dispatch(failure(error.message));
                    dispatch(alertActions.error(error.message));
                    dispatch(loaderActions.hide());
                }
            );
    };

    function request() { return { type: `${kind}.${crudConstants.GET_REQUEST}` } }
    function success(data) { return { type: `${kind}.${crudConstants.GET_SUCCESS}`, data } }
    function failure(error) { return { type: `${kind}.${crudConstants.GET_FAILURE}`, error } }
}

function _getAll(kind, url, filterData) {
    return dispatch => {
        dispatch(loaderActions.show());
        dispatch(request());
        crudService._getAll(url, filterData)
            .then(
                result => {
                    dispatch(success(result.data.data))
                    dispatch(loaderActions.hide());
                },
                error => {
                    dispatch(failure(error.message));
                    dispatch(alertActions.error(error.message));
                    dispatch(loaderActions.hide());
                }
            );
    };

    function request() { return { type: `${kind}.${crudConstants.GET_ALL_REQUEST}` } }
    function success(data) { return { type: `${kind}.${crudConstants.GET_ALL_SUCCESS}`, data } }
    function failure(error) { return { type: `${kind}.${crudConstants.GET_ALL_FAILURE}`, error } }
}

function _create(kind, url, data) {
    return dispatch => {
        dispatch(loaderActions.show());
        dispatch(request());
        crudService._create(url, data)
            .then(
                result => {
                    dispatch(alertActions.success(result.data.message));
                    dispatch(success(null))
                    dispatch(loaderActions.hide());
                    _clear(kind)
                },
                error => {
                    dispatch(failure(error.message));
                    dispatch(alertActions.error(error.message));
                    dispatch(loaderActions.hide());
                }
            );
    };

    function request() { return { type: `${kind}.${crudConstants.CREATE_REQUEST}` } }
    function success(data) { return { type: `${kind}.${crudConstants.CREATE_SUCCESS}`, data } }
    function failure(error) { return { type: `${kind}.${crudConstants.CREATE_FAILURE}`, error } }
}

function _update(kind, url, id, data) {
    return dispatch => {
        dispatch(loaderActions.show());
        dispatch(request());
        crudService._update(url, id, data)
            .then(
                result => {
                    dispatch(alertActions.success(result.data.message));
                    dispatch(success(null))
                    dispatch(loaderActions.hide());
                },
                error => {
                    dispatch(failure(error.message));
                    dispatch(alertActions.error(error.message));
                    dispatch(loaderActions.hide());
                }
            );
    };

    function request() { return { type: `${kind}.${crudConstants.UPDATE_REQUEST}` } }
    function success(data) { return { type: `${kind}.${crudConstants.UPDATE_SUCCESS}`, data } }
    function failure(error) { return { type: `${kind}.${crudConstants.UPDATE_FAILURE}`, error } }
}

function _delete(kind, url, id) {
    return dispatch => {
        dispatch(loaderActions.show());
        dispatch(request());
        crudService._delete(url, id)
            .then(
                result => {
                    dispatch(alertActions.success(result.data.message));
                    dispatch(success(null))
                    dispatch(loaderActions.hide());
                },
                error => {
                    dispatch(failure(error.message));
                    dispatch(alertActions.error(error.message));
                    dispatch(loaderActions.hide());
                }
            );
    };

    function request() { return { type: `${kind}.${crudConstants.DELETE_REQUEST}` } }
    function success(data) { return { type: `${kind}.${crudConstants.DELETE_SUCCESS}`, data } }
    function failure(error) { return { type: `${kind}.${crudConstants.DELETE_FAILURE}`, error } }
}
