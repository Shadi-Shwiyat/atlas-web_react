import React from 'react';
import logo from '../assets/logo.jpg';
import {StyleSheet, css} from 'aphrodite';
import { logout } from '../actions/uiActionCreators';
import { connect } from 'react-redux';

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


function Header({ user, logOut }) {
  const handleLogout = () => {
    logOut();
  };

  return (
    <div className={css(styles.appHeader)}>
      <img src={logo} alt='logo.jpg' className={css(styles.logo)}></img>
      <h1 className={css(styles.h1)}>School dashboard</h1>
      {user.isLoggedIn && (
        <div className={css(styles.welcomeMessage)} id="logoutSection">
          Welcome {user.email} (<span className={css(styles.logoutLink)} onClick={handleLogout} id='logoutLink'>logout</span>)
        </div>
      )}
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    user: state.get('user').toJS(),
  };
}

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
