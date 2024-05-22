import React, { useContext } from 'react';
import { getFullYear, getFooterCopy } from '../utils/utils.js';
import './Footer.css';
import AppContext from '../App/AppContext.js';

function Footer() {
  const { user } = useContext(AppContext);

  return (
    <div className='App-footer'>
      <p>Copyright {getFooterCopy(true)} - {getFullYear()}</p>
      {user.isLoggedIn && (
        <p>
          <a href='/contact'>Contact us</a>
        </p>
      )}
    </div>
  );
}

export default Footer;
