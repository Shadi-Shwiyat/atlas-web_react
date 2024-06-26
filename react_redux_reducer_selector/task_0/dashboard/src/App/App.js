import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils.js';
import { StyleSheet, css } from 'aphrodite';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';
import AppContext from './AppContext';

const styles = StyleSheet.create({
  body: {
    margin: 0,
  },
  appBody: {
    margin: '60px',
    '@media (max-width: 900px)': {
      margin: '10px'
    }
  },
  appBodyP: {
    fontFamily: 'arial',
    fontSize: '19px',
    width: '100%',
    margin: 0
  },
  footer: {
    margin: 0,
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
      listNotifications: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, type: "urgent", html: { __html: getLatestNotification() } }
      ],
      listCourses: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 }
      ],
      displayDrawer: false,
    };
  }

  logIn = (email, password) => {
    this.setState({
      user: {
        email: email,
        password: password,
        isLoggedIn: true
      }
    });
  }

  logOut = () => {
    this.setState({
      user: {
        email: '',
        password: '',
        isLoggedIn: false
      }
    });
  }

  handleDisplayDrawer = () => {
    this.setState({ displayDrawer: true });
  }

  handleHideDrawer = () => {
    this.setState({ displayDrawer: false });
  }

  markNotificationAsRead = (id) => {
    this.setState((prevState) => ({
      listNotifications: prevState.listNotifications.filter(notification => notification.id !== id)
    }));
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    const { logOut } = this;
    const { ctrlKey, key } = event;

    if (ctrlKey && key === 'h') {
      alert('Logging you out');
      logOut();
    }
  }

  render() {
    const { user, listNotifications, listCourses } = this.state;
    const { displayDrawer } = this.state;

    return (
      <AppContext.Provider value={{ user: user, logOut: this.logOut }}>
        <>
          <Notifications 
            displayDrawer={displayDrawer} 
            listNotifications={listNotifications} 
            handleDisplayDrawer={this.handleDisplayDrawer}
            handleHideDrawer={this.handleHideDrawer}
            markNotificationAsRead={this.markNotificationAsRead}
          />
          <div className={css(styles.app)}>
            <Header user={user} />
            <div className={css(styles.appBody)}>
              {user.isLoggedIn ? (
                <BodySectionWithMarginBottom title="Course list">
                  <CourseList listCourses={listCourses} />
                </BodySectionWithMarginBottom>
              ) : (
                <BodySectionWithMarginBottom title="Log in to continue">
                  <Login logIn={this.logIn} user={user} />
                </BodySectionWithMarginBottom>
              )}
              <BodySection title="News from the School">
                <p className={css(styles.appBodyP)}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus, justo ac maximus gravida, ex tellus vestibulum magna, ut dapibus eros dui a mauris. Ut sit amet nibh sit amet dui laoreet viverra. Donec quis felis sed lectus fringilla accumsan. Proin ac elit nec est fermentum vehicula. Nam ut viverra dolor, sit amet vestibulum dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
              </BodySection>
            </div>
            <Footer />
          </div>
        </>
      </AppContext.Provider>
    );
  }
}

App.propTypes = {
  loggedIn: PropTypes.bool,
  logOut: PropTypes.func
};

App.defaultProps = {
  logOut: () => {}
};

export default App;
