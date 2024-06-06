import { createSelector } from 'reselect';
// import { List } from 'immutable';

// Selector to get the courses state
const getCoursesState = (state) => state.courses;

// Selector to get all course entities
export const getAllCourses = createSelector(
  [getCoursesState],
  (coursesState) => coursesState.valueSeq().toList()
);
