import axios from 'axios';
import { authHeader } from '../_helpers'

let apiUrl = ''

if (process.env.NODE_ENV === 'production') {
    apiUrl = ''
}

export const apiConfig = axios.create({
    baseURL: apiUrl,    
    headers: authHeader()
});