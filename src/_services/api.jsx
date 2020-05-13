import axios from 'axios';
import { authHeader, store } from '../_helpers'
import { alertActions, loaderActions, userActions, crudActions } from '../_actions';

let apiUrl = ''

if (process.env.NODE_ENV === 'production') {
    apiUrl = ''
}

let instance = axios.create({
    baseURL: apiUrl,
});


const { dispatch } = store
const successHandler = (response) => {
    if (response) {
        dispatch(loaderActions.hide());
    }
    return response
}

const errorHandler = (error) => {
    const { response } = error
    if (response) {
        if (response.status === 401) {
            dispatch(userActions.logout())
        }
        dispatch(alertActions.error(response.statusText))
        dispatch(loaderActions.hide());
        return response
    }
    return error
}

const requestHandler = (request) => {
    if (request) {
        dispatch(crudActions._clear('formSubmit'))
    }
    request.headers = authHeader();
    return request
}

instance.interceptors.request.use(
    request => requestHandler(request)
)

instance.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error),
)

export const apiConfig = instance