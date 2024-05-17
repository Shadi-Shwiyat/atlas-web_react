import React from 'react';
import logo from '../assets/logo.jpg';
import {StyleSheet, css} from 'aphrodite';

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
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
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
});


function Header() {
  return (
    <div className={css(styles.appHeader)}>
      <img src={logo} alt='logo.jpg' className={css(styles.logo)}></img>
      <h1 className={css(styles.h1)}>School dashboard</h1>
    </div>
  );
}

export default Header;
