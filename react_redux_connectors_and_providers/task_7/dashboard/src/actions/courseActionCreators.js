import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from './courseActionTypes';
import { bindActionCreators } from 'redux';

export function selectCourse(index) {
  return {
    type: SELECT_COURSE,
    index
  };
}

export function unSelectCourse(index) {
  return {
    type: UNSELECT_COURSE,
    index
  };
}

export function fetchCourseSuccess(data) {
  return {
    type: FETCH_COURSE_SUCCESS,
    data
  };
}

export function setCourses(data) {
  return {
    type: FETCH_COURSE_SUCCESS,
    data
  };
}

export function fetchCourses() {
  return async (dispatch) => {
    try {
      const response = await fetch('/dist/courses.json');
      const data = await response.json();
      dispatch(setCourses(data));
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
}


export const boundSelectCourse = bindActionCreators(selectCourse);
export const boundUnSelectCourse = bindActionCreators(unSelectCourse);
