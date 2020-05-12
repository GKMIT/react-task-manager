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
        .then(data => {
            localStorage.setItem('user', JSON.stringify(data.data.data));
            return data;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}