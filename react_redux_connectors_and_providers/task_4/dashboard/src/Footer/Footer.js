import React from 'react';
import { getFullYear, getFooterCopy } from '../utils/utils.js';
import './Footer.css';
import PropTypes from 'prop-types';

function Footer({ isUserLoggedIn, user }) {
  return (
    <div className='App-footer'>
      <p>Copyright {getFooterCopy(true)} - {getFullYear()}</p>
      {isUserLoggedIn && (
        <p>
          <a href='/contact'>Contact us</a>
        </p>
      )}
    </div>
  );
}

Footer.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

Footer.defaultProps = {
  isUserLoggedIn: false,
  user: {},
};

export { Footer as UnconnectedFooter };

import { connect } from 'react-redux';

export function mapStateToProps(state) {
  return {
    isUserLoggedIn: state.ui.isUserLoggedIn,
    user: state.ui.user,
  };
}

export default connect(mapStateToProps)(Footer);
