import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  signIn: {
    display: 'flex',
    '@media (max-width: 900px)': {
      flexDirection: 'column'
    }
  },
  label: {
    fontFamily: 'arial',
    fontSize: '19px',
  },
  signInLabelLastOfType: {
    marginLeft: '10px',
    '@media (max-width: 900px)': {
      marginLeft: '0px',
    }
  },
  signInInput: {
    marginLeft: '10px',
    '@media (max-width: 900px)': {
      marginLeft: '0px',
    }
  },
  signInButton: {
    marginLeft: '10px',
    borderRadius: '6px',
    '@media (max-width: 900px)': {
      marginLeft: '0px',
      maxWidth: '40px'
    }
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      email: '',
      password: '',
      enableSubmit: false,
    };
  }

  handleLoginSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoggedIn: true });
  };

  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value }, this.updateEnableSubmit);
  };

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value }, this.updateEnableSubmit);
  };

  updateEnableSubmit = () => {
    const { email, password } = this.state;
    this.setState({ enableSubmit: email !== '' && password !== '' });
  };

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <>
        {/* <p>Login to access the full dashboard</p> */}
        <div className={css(styles.signIn)}>
          <form onSubmit={this.handleLoginSubmit} className={css(styles.signIn)}>
            <label className={css(styles.label)} htmlFor="email">Email:</label>
            <input
              className={css(styles.signInInput)}
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={this.handleChangeEmail}
            />
            <br />
            <label className={css(styles.label, styles.signInLabelLastOfType)} htmlFor="password">Password:</label>
            <input
              className={css(styles.signInInput)}
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={this.handleChangePassword}
            />
            <br />
            <input
              type="submit"
              value="OK"
              className={css(styles.signInButton)}
              disabled={!enableSubmit}
            />
          </form>
        </div>
      </>
    );
  }
}

export default Login;
