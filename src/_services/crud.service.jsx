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

    let filters = []

    if (filterData.filters) {
        filterData.filters.map(filter => {
            filters.push({
                name: filter.column.field,
                value: filter.value
            })
            return null
        })
    }

    const filter = {
        page: filterData.page + 1,
        pageSize: filterData.pageSize,
        search: filterData.search,
        orderBy: filterData.orderBy ? filterData.orderBy.field : null,
        orderDirection: filterData.orderDirection,
        filters: JSON.stringify(filters),
    }

    return apiConfig.get(`/${type}`, { params: filter })
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