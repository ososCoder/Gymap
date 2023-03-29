import { createContext, useEffect, useState } from 'react';
import { getUserDataService } from '../services';

export const AuthContext = createContext();

export const AuthProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getUserDataService(token);
        setUser(data);
      } catch (error) {
        logout();
      }
    };
    if (token) {
      getUserData();
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
