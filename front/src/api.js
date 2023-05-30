export const API_HOST = 'http://localhost:3000/api'

export const saveToken = (token) => {
    localStorage.setItem('token', token);
}

export const getToken = () => {
    return localStorage.getItem('token');
}