import { ROLES } from "../constants/roles";
import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, login, logout } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // use getCurrentUser
    const currentUser = {
      email: "ass@gmail.com",
      password: "hello",
      role: ROLES.GUEST,
    };
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async ( email, password) => {
    // use login
    const result = await {}
    if(result.success){
        setUser(result.user);
    }

    return result;
  }

  const logout = () => {
    // use logout
  }

  const hasRole = (role) => {
    return user && user.role == role;
  }

  const canAccess = (requiredRole) => {
    if(!user) return requiredRole == ROLES.GUEST;

    const roleHierarchy = {
        [ROLES.GUEST]: 0,
        [ROLES.USER]: 1,
        [ROLES.ADMIN]: 2
    };

    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];

  }

  const value = {
    user,
    login,
    logout,
    hasRole,
    canAccess,
    loading,
    isAuthenticated: !!user,
    isGuest: !user || user.role === ROLES.GUEST,
    isUser: user && user.role === ROLES.USER,
    isAdmin: user && user.role === ROLES.ADMIN
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );

};
