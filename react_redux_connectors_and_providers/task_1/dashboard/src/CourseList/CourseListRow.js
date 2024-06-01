import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, css} from 'aphrodite';

const styles = StyleSheet.create({
  courseListTh: {
    border: '1px solid rgb(61, 61, 61)',
    padding: '9px',
    textAlign: 'center',
  },
  lastChildTh: {
    border: '1px solid rgb(61, 61, 61)',
    padding: '9px',
    textAlign: 'start',
  },
  courseListTd: {
    border: 'none',
    padding: '8px',
  },
  firstChildTd: {
    textAlign: 'start',
  },
  rowChecked: {
    backgroundColor: '#e6e4e4'
  },
  checkBox: {
    marginRight: '6px'
  }
})

const CourseListRow = ({ isHeader = false, textFirstCell, textSecondCell = null }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  }

  let rowStyle;
  if (isHeader) {
    rowStyle = {
      backgroundColor: '#deb5b545'
    }
  } else {
    rowStyle = {
      backgroundColor: '#f5f5f5ab'
    }
  }

  return (
    <tr className={isChecked ? css(styles.rowChecked) : 'notChecked' } style={rowStyle}>
      {isHeader ? (
        textSecondCell === null ? (
          <th className={css(styles.courseListTh)} colSpan={2}>{textFirstCell}</th>
        ) : (
          <>
            <th className={css(styles.lastChildTh)}>{textFirstCell}</th>
            <th className={css(styles.lastChildTh)}>{textSecondCell}</th>
          </>
        )
      ) : (
        <>
          <td className={css(styles.firstChildTd, styles.courseListTd)}>
            <input
              className={css(styles.checkBox)}
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckbox}
            />
            {textFirstCell}
          </td>
          <td className={css(styles.courseListTd)}>{textSecondCell}</td>
        </>
      )}
    </tr>
  );
};

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default CourseListRow;
