import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (user, userId) => {
    setUser(user);
    setUserId(userId)
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setUserId(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ user, userId, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };
