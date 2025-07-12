import { ROLES } from "../constants/roles";
import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, login, signup, logout } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // use getCurrentUser
    const currentUser = getCurrentUser();
    if(currentUser){
      setUser({
      username: "email@email.com", //currentUser.user.username,
      email: "blaha", //currentUser.user.email,
      role : "admin"//currentUser.user.role
      });
    }else{
      setUser({});
    }
    
    setLoading(false);
  }, []);

  const loginn = async (email, password, role) => {
    // use login
    const result = await login(email, password, role);
    if (!result.error) {
      setUser({
        username: result.user.username,
        email: result.user.email,
        role : result.type
      });

      localStorage.setItem("token", result.token);

      return {
       username: result.user.username,
       email: result.user.email,
       role : result.type
      };
    }

    return {
      error: result.error
    }

    
  };

  const logoutt = () => {
    // use logout
    logout();
    setUser(null);
  };

  const hasRole = (role) => {
    return user && user.role == role;
  };

  const canAccess = (requiredRole) => {
    if (!user) return requiredRole == ROLES.GUEST;

    const roleHierarchy = {
      [ROLES.GUEST]: 0,
      [ROLES.USER]: 1,
      [ROLES.ADMIN]: 2,
    };

    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  };

  const value = {
    user,
    loginn,
    logoutt,
    hasRole,
    canAccess,
    loading,
    isAuthenticated: !!user,
    isGuest: !user || user.role === ROLES.GUEST,
    isUser: user && user.role === ROLES.USER,
    isAdmin: user && user.role === ROLES.ADMIN,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
