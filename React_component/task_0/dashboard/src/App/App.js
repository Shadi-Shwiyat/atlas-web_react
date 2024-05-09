import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listNotifications: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, type: "urgent", html: { __html: getLatestNotification() } }
      ],
      listCourses: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 }
      ]
    };
  }

  render() {
    const { loggedIn } = this.props;
    const { listNotifications, listCourses } = this.state;

    return (
      <>
        <Notifications displayDrawer={true} listNotifications={listNotifications} />
        <div className="App">
          <Header />
          <div className='App-body'>
            {loggedIn ? <CourseList listCourses={listCourses} /> : <Login />}
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

App.propTypes = {
  loggedIn: PropTypes.bool,
};

export default App;
