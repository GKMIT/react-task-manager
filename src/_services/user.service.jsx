import { apiConfig } from './api';
export const userService = {
    login,
    logout,
};

function login(email, password) {
    const user = {
        email,
        password
    };

    return apiConfig.post(`/auth/login`, user)
        .then(handleResponse)
        .then(data => {
            localStorage.setItem('user', JSON.stringify(data.data));
            return data;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    if (response.status === 401) {
        logout();
        window.location.reload(true);
    }

    if (response.status !== 200) {
        const error = (response.data && response.data.message) || response.statusText;
        return Promise.reject(error);
    }

    return response.data;
}