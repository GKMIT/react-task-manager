import { apiConfig } from './api';

export const crudService = {
    _get,
    _getAll,
    _create,
    _update,
    _delete
};
function _get(type, id) {
    return apiConfig.get(`/${type}/${id}`)
        .then(result => {
            return result;
        });
}
function _getAll(type, filterData) {
    return apiConfig.get(`/${type}`, filterData)
        .then(result => {
            return result;
        });
}
function _create(type, data) {
    return apiConfig.post(`/${type}`, data)
        .then(result => {
            return result;
        });
}
function _update(type, id, data) {
    return apiConfig.put(`/${type}/${id}`, data)
        .then(result => {
            return result;
        });
}
function _delete(type, id) {
    return apiConfig.delete(`/${type}/${id}`)
        .then(result => {
            return result;
        });
}