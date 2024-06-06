import { Map, fromJS } from 'immutable';
import courseReducer from './courseReducer';
import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from '../actions/courseActionTypes';
import { coursesNormalizer } from '../schema/courses';

describe('courseReducer', () => {
  it('should return the default state', () => {
    const initialState = Map({
      courses: Map(),
    });
    expect(courseReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_COURSE_SUCCESS', () => {
    const action = {
      type: FETCH_COURSE_SUCCESS,
      data: [
        { id: 1, name: "ES6", credit: 60 },
        { id: 2, name: "Webpack", credit: 20 },
        { id: 3, name: "React", credit: 40 },
      ],
    };
    const normalizedData = coursesNormalizer(action.data);
    const expectedState = Map({
      courses: fromJS(normalizedData.entities.courses).map(course => 
        course.set('isSelected', false)
      ),
    });
    expect(courseReducer(undefined, action).toJS()).toEqual(expectedState.toJS());
  });

  it('should handle SELECT_COURSE', () => {
    const initialState = fromJS({
      courses: {
        1: { id: 1, name: "ES6", isSelected: false, credit: 60 },
        2: { id: 2, name: "Webpack", isSelected: false, credit: 20 },
        3: { id: 3, name: "React", isSelected: false, credit: 40 },
      },
    });
    const action = {
      type: SELECT_COURSE,
      index: 2,
    };
    const expectedState = initialState.setIn(['courses', '2', 'isSelected'], true);
    expect(courseReducer(initialState, action).toJS()).toEqual(expectedState.toJS());
  });

  it('should handle UNSELECT_COURSE', () => {
    const initialState = fromJS({
      courses: {
        1: { id: 1, name: "ES6", isSelected: false, credit: 60 },
        2: { id: 2, name: "Webpack", isSelected: true, credit: 20 },
        3: { id: 3, name: "React", isSelected: false, credit: 40 },
      },
    });
    const action = {
      type: UNSELECT_COURSE,
      index: 2,
    };
    const expectedState = initialState.setIn(['courses', '2', 'isSelected'], false);
    expect(courseReducer(initialState, action).toJS()).toEqual(expectedState.toJS());
  });
});
