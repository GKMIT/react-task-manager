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
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user.data));            
            return user;
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