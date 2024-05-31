import React from 'react';

// Define the default user object
const user = {
  email: '',
  password: '',
  isLoggedIn: false,
};

// Define the default logOut function
const logOut = () => {};

// Create the context with default values
const AppContext = React.createContext({
  user: user,
  logOut: logOut,
});

export default AppContext;
