import React from 'react';
import PropTypes from 'prop-types';
import BodySection from './BodySection';
import {StyleSheet, css} from 'aphrodite';

const styles = StyleSheet.create ({
  bodySectionWithMarginBottom: {
    marginBottom: '40px',
  },
})

const BodySectionWithMarginBottom = ({ title, children }) => {
  return (
    <div className={css(styles.bodySectionWithMarginBottom)}>
      <BodySection title={title}>{children}</BodySection>
    </div>
  );
};

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BodySectionWithMarginBottom;
