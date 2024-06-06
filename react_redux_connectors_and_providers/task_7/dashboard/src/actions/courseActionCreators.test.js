import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { selectCourse, unSelectCourse, fetchCourses, fetchCourseSuccess } from './courseActionCreators';
import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from './courseActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Course Action Creators', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should create an action to select a course', () => {
    const index = 1;
    const expectedAction = {
      type: SELECT_COURSE,
      index
    };
    expect(selectCourse(index)).toEqual(expectedAction);
  });

  it('should create an action to unselect a course', () => {
    const index = 1;
    const expectedAction = {
      type: UNSELECT_COURSE,
      index
    };
    expect(unSelectCourse(index)).toEqual(expectedAction);
  });

  it('creates FETCH_COURSE_SUCCESS when fetching courses has been done', () => {
    const courses = [
      { id: '1', name: 'ES6', credit: 60 },
      { id: '2', name: 'Webpack', credit: 20 },
      { id: '3', name: 'React', credit: 40 }
    ];

    fetchMock.getOnce('/dist/courses.json', {
      body: courses,
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: FETCH_COURSE_SUCCESS, data: courses }
    ];
    const store = mockStore({ courses: [] });

    return store.dispatch(fetchCourses()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
