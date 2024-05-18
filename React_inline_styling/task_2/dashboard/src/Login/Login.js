import React from 'react';
import {StyleSheet, css} from 'aphrodite';

const styles = StyleSheet.create({
  signIn: {
    display: 'flex',
  },
  label: {
    fontFamily: 'arial',
    fontSize: '19px',
  },
  signInLabelLastOfType: {
    marginLeft: '10px',
  },
  signInInput: {
    marginLeft: '10px',
  },
  signInButton: {
    marginLeft: '10px',
    borderRadius: '6px',
  },
});

function Login() {
  const handleLabelClick = (inputId) => {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
      inputElement.focus();
    }
  };

  return (
    <>
      {/* <p>Login to access the full dashboard</p> */}
      <div className={css(styles.signIn)}>
        <label className={css(styles.label)} htmlFor="email" onClick={() => handleLabelClick("email")}>Email:</label>
        <input className={css(styles.signInInput)} type="email" id="email" name="email" />
        <br />
        <label className={css(styles.label, styles.signInLabelLastOfType)} htmlFor="password" onClick={() => handleLabelClick("password")}>Password:</label>
        <input className={css(styles.signInInput)} type="password" id="password" name="password" />
        <br />
        <button className={css(styles.signInButton)}>OK</button>
      </div>
    </>
  );
}

export default Login;
