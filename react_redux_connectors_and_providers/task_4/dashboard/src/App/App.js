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
import { connect } from 'react-redux';
import { displayNotificationDrawer, hideNotificationDrawer, loginRequest, logout } from '../actions/uiActionCreators';

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
    };
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
    const { logout, isUserLoggedIn } = this.props;
    const { ctrlKey, key } = event;

    if (ctrlKey && key === 'h') {
      alert('Logging you out');
      logout();
    }

    if (ctrlKey && key === 'u') {
      console.log('isUserLoggedIn:', isUserLoggedIn);
    }
  }

  render() {
    const { listNotifications, listCourses } = this.state;
    const { isUserLoggedIn, displayDrawer, displayNotificationDrawer, hideNotificationDrawer, loginRequest, logout, user } = this.props;

    return (
      <AppContext.Provider value={{ user: user, logOut: logout }}>
        <>
          <Notifications 
            displayDrawer={displayDrawer} 
            listNotifications={listNotifications} 
            handleDisplayDrawer={displayNotificationDrawer}
            handleHideDrawer={hideNotificationDrawer}
            markNotificationAsRead={this.markNotificationAsRead}
          />
          <div className={css(styles.app)}>
            <Header id="app-header" user={user} />
            <div className={css(styles.appBody)}>
              {isUserLoggedIn ? (
                <BodySectionWithMarginBottom title="Course list">
                  <CourseList listCourses={listCourses} />
                </BodySectionWithMarginBottom>
              ) : (
                <BodySectionWithMarginBottom title="Log in to continue">
                  <Login logIn={loginRequest} user={user} />
                </BodySectionWithMarginBottom>
              )}
              <BodySection title="News from the School">
                <p className={css(styles.appBodyP)}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus, justo ac maximus gravida, ex tellus vestibulum magna, ut dapibus eros dui a mauris. Ut sit amet nibh sit amet dui laoreet viverra. Donec quis felis sed lectus fringilla accumsan. Proin ac elit nec est fermentum vehicula. Nam ut viverra dolor, sit amet vestibulum dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
              </BodySection>
            </div>
            <Footer id="app-footer" />
          </div>
        </>
      </AppContext.Provider>
    );
  }
}

App.propTypes = {
  isUserLoggedIn: PropTypes.bool,
  logout: PropTypes.func,
  displayDrawer: PropTypes.bool,
  displayNotificationDrawer: PropTypes.func,
  hideNotificationDrawer: PropTypes.func,
  loginRequest: PropTypes.func,
  user: PropTypes.object,
};

App.defaultProps = {
  logout: () => {},
  user: {},
};

export { App as UnconnectedApp };

export function mapStateToProps(state) {
  console.log('App state:', state);
  return {
    isUserLoggedIn: state.ui.get('isUserLoggedIn'),
    displayDrawer: state.ui.get('isNotificationDrawerVisible'),
    user: state.ui.get('user').toJS(),
  };
}

const mapDispatchToProps = {
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginRequest,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
