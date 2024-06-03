import React from 'react';
import { getFullYear, getFooterCopy } from '../utils/utils.js';
import './Footer.css';
import { connect } from 'react-redux';
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

export function mapStateToProps(state) {
  return {
    isUserLoggedIn: state.get('isUserLoggedIn'),
    user: state.get('user').toJS(),
  };
}

export default connect(mapStateToProps)(Footer);
