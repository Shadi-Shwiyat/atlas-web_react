import React from 'react';
import { getFullYear, getFooterCopy } from '../utils/utils.js';
import './Footer.css';
import { connect } from 'react-redux';

function Footer({ user }) {
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

export function mapStateToProps(state) {
  return {
    user: state.get('user').toJS(),
  };
}

export default connect(mapStateToProps)(Footer);
