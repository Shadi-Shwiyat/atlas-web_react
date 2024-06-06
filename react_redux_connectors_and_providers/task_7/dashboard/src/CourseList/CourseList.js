import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CourseListRow from './CourseListRow';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import { fetchCourses, selectCourse, unSelectCourse } from '../actions/courseActionCreators';
import { getListCourses } from '../selectors/courseSelector';

const styles = StyleSheet.create({
  courseList: {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid rgb(61, 61, 61)'
  },
});

class CourseList extends Component {
  componentDidMount() {
    this.props.fetchCourses();
  }

  onChangeRow = (id, checked) => {
    if (checked) {
      this.props.selectCourse(id);
    } else {
      this.props.unSelectCourse(id);
    }
  };

  render() {
    const { listCourses = [] } = this.props;

    return (
      <table id="CourseList" className={css(styles.courseList)}>
        <thead>
          <CourseListRow isHeader={true} textFirstCell="Available courses" />
          <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
        </thead>
        <tbody>
          {listCourses.length === 0 ? (
            <CourseListRow textFirstCell="No course available yet" />
          ) : (
            listCourses.map(course => (
              <CourseListRow
                key={course.id}
                isHeader={false}
                textFirstCell={course.name}
                textSecondCell={course.credit}
                onChangeRow={this.onChangeRow}
                id={course.id}
                isChecked={course.isSelected}
              />
            ))
          )}
        </tbody>
      </table>
    );
  }
}

CourseList.propTypes = {
  listCourses: PropTypes.array,
  fetchCourses: PropTypes.func.isRequired,
  selectCourse: PropTypes.func.isRequired,
  unSelectCourse: PropTypes.func.isRequired
};

CourseList.defaultProps = {
  listCourses: []
};

const mapStateToProps = (state) => ({
  listCourses: getListCourses(state).toList().toJS()
});

const mapDispatchToProps = {
  fetchCourses,
  selectCourse,
  unSelectCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
