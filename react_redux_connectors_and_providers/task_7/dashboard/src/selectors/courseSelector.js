import { createSelector } from 'reselect';
// import { List } from 'immutable';

// Selector to get the courses state
const getCoursesState = (state) => state.courses;
export const getCourses = (state) => getCoursesState(state).get('courses');


// Selector to get all course entities
export const getListCourses = createSelector(
  [getCourses],
  (coursesState) => coursesState.valueSeq().toList()
);
