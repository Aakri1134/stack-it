import { URL } from '../constants/backend';
import { ROLES } from '../constants/roles';
import axios from "axios";

export const signup = async (username,email,password,role) => {
    const response = await axios.post(`${URL.NODE}/auth/signup`, {
        username : username,
        email : email,
        password : password,
        role: role,
    })

    return response.data;
}

export const login = async (email, password, role) => {
    const response = await axios.post(`${URL.NODE}/auth/login`, {
        email : email,
        password : password,
        role : role
    })
    return response.data;
}
export const logout = () => {
    localStorage.removeItem('token');
}
export const getCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if(!token) return null;

    return token;

    // const response = await axios.get(`${URL.NODE}/user/getUser`,{
    //     headers: {
    //         Authorization : `Bearer ${token}`
    //     }
    // });

    // return response.data;
}