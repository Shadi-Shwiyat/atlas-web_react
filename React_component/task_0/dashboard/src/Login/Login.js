import React from 'react';
import './Login.css';

function Login() {
  const handleLabelClick = (inputId) => {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
      inputElement.focus();
    }
  };

  return (
    <>
      <p>Login to access the full dashboard</p>
      <div className='sign-in'>
        <label htmlFor="email" onClick={() => handleLabelClick("email")}>Email:</label>
        <input type="email" id="email" name="email" />
        <br />
        <label htmlFor="password" onClick={() => handleLabelClick("password")}>Password:</label>
        <input type="password" id="password" name="password" />
        <br />
        <button>OK</button>
      </div>
    </>
  );
}

export default Login;
