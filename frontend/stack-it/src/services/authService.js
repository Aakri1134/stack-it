import { ROLES } from '../constants/roles';

export const login = async (email, password) => {
    return { success: true, user: userData, token };
}
export const logout = () => {
    localStorage.removeItem('token');
}
export const getCurrentUser = () => {
    
}