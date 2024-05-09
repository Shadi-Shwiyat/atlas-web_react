import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import './App.css';

function App({ loggedIn }) {
  // State to manage login status

  return (
    <>
      <Notifications displayDrawer={false} />
      <div className="App">
        <Header />
        <div className='App-body'>
          {loggedIn ? <CourseList /> : <Login />}
        </div>
        <Footer />
      </div>
    </>
  );
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default App;
