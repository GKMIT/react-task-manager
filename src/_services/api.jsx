import axios from 'axios';
import { authHeader, store } from '../_helpers'
import { alertActions, userActions } from '../_actions';

let apiUrl = ''

if (process.env.NODE_ENV === 'production') {
    apiUrl = ''
}

let instance = axios.create({
    baseURL: apiUrl,
    headers: authHeader(),
});


const { dispatch } = store
const successHandler = (response) => {
    return response
}

const errorHandler = (error) => {
    const { response } = error
    if (response.status === 401) {
        dispatch(userActions.logout())
    }
    dispatch(alertActions.error(response.statusText))
    return error
}

instance.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error),
)

export const apiConfig = instance