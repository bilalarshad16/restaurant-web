import React, { createContext, useState, useContext, useEffect } from 'react';

// Context
export const UserContext = createContext({
  name: "",
  auth: false,
  email:""
});

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(()=>{
    
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : { name: "", auth: false, email: "" };
    });  // This can store user data such as { id, name, email, etc. }
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const login = (userData) => {
    const userObj = {
      name: userData.name,
      auth: true,
      email:userData.email
    };
    setUser(userObj);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userObj));
  };

  const logout = () => {
    const userObj = {
      name: "",
      auth: false,
      email:""
    };
    setUser(userObj);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

 

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
