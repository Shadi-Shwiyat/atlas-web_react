import { Map, fromJS } from 'immutable';
import { coursesNormalizer } from '../schema/courses';
import {
  SELECT_COURSE,
  UNSELECT_COURSE,
  FETCH_COURSE_SUCCESS,
} from "../actions/courseActionTypes";

// Define the initial state as an Immutable Map
const initialState = Map({
  courses: Map(),
});

// Course Reducer
const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS: {
      const normalizedData = coursesNormalizer(action.data);
      // Convert normalized data to Immutable.js Map and merge with the state
      const courses = fromJS(normalizedData.entities.courses).map(course => 
        course.set('isSelected', false)
      );
      return state.set('courses', courses);
    }

    case SELECT_COURSE: {
      return state.setIn(['courses', action.index.toString(), 'isSelected'], true);
    }

    case UNSELECT_COURSE: {
      return state.setIn(['courses', action.index.toString(), 'isSelected'], false);
    }

    default:
      return state;
  }
};

export default courseReducer;
