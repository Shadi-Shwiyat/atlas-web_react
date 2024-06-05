import React from 'react';
import logo from '../assets/logo.jpg';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../actions/uiActionCreators';

const styles = StyleSheet.create({
  header: {
    margin: 0,
  },
  appHeader: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    margin: 0,
    '::after': {
      content: "''",
      position: 'fixed',
      top: '239px',
      left: 'calc(10px)',
      width: 'calc(100% - 20px)',
      height: '3px',
      backgroundColor: '#E0354B',
    },
  },
  h1: {
    fontFamily: 'arial',
    fontWeight: 'bolder',
    fontSize: '36px',
    color: '#E0354B',
    marginLeft: '30px',
  },
  logo: {
    width: '230px',
    height: '230px',
  },
  welcomeMessage: {
    position: 'absolute',
    right: '10px',
    top: -6,
    fontSize: '18px',
    zIndex: 39
  },
  logoutLink: {
    color: '#E0354B',
    cursor: 'pointer',
  },
});

function Header({ user, isUserLoggedIn, logout }) {
  const handleLogout = () => {
    logout();
  };

  const userEmail = user.get ? user.get('email') : user.email;

  return (
    <div className={css(styles.appHeader)}>
      <img src={logo} alt='logo.jpg' className={css(styles.logo)}></img>
      <h1 className={css(styles.h1)}>School dashboard</h1>
      {isUserLoggedIn && (
        <div className={css(styles.welcomeMessage)} id="logoutSection">
          Welcome {userEmail} (<span className={css(styles.logoutLink)} onClick={handleLogout} id='logoutLink'>logout</span>)
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.instanceOf(Map)
  ]).isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  user: {
    isLoggedIn: false,
    email: '',
  },
};

export { Header as UnconnectedHeader };

export function mapStateToProps(state) {
  return {
    user: state.ui.user,
    isUserLoggedIn: state.ui.isUserLoggedIn,
  };
}

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
