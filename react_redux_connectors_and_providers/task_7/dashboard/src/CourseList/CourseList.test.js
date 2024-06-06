import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CourseList from './CourseList';
import { fetchCourses, selectCourse, unSelectCourse } from '../actions/courseActionCreators';
import { StyleSheetTestUtils } from 'aphrodite';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

test('renders CourseList component without crashing', () => {
  render(
    <Provider store={mockStore({})}>
      <CourseList />
    </Provider>
  );
});

test('renders the 5 different rows', () => {
  const listCourses = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 }
  ];

  const { getAllByRole } = render(
    <Provider store={mockStore({})}>
      <CourseList listCourses={listCourses} />
    </Provider>
  );
  const rows = getAllByRole('row');
  expect(rows).toHaveLength(5); // Header row + 3 data rows + 1 row for thead
});

test('renders correctly with empty or missing listCourses prop', () => {
  const { getByText, queryAllByRole } = render(
    <Provider store={mockStore({})}>
      <CourseList />
    </Provider>
  );

  expect(queryAllByRole('row')).toHaveLength(3);

  expect(getByText('No course available yet')).toBeInTheDocument();
});

test('renders courses correctly when listCourses is provided', () => {
  const listCourses = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 },
  ];
  const { getByText } = render(
    <Provider store={mockStore({})}>
      <CourseList listCourses={listCourses} />
    </Provider>
  );

  // Check if each course name and credit is rendered correctly
  expect(getByText('ES6')).toBeInTheDocument();
  expect(getByText('60')).toBeInTheDocument();
  expect(getByText('Webpack')).toBeInTheDocument();
  expect(getByText('20')).toBeInTheDocument();
  expect(getByText('React')).toBeInTheDocument();
  expect(getByText('40')).toBeInTheDocument();
});

test('dispatches fetchCourses action when component mounts', () => {
  const store = mockStore({});
  store.dispatch = jest.fn(); // Mock dispatch

  render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  );

  expect(store.dispatch).toHaveBeenCalledWith(fetchCourses());
});

test('dispatches selectCourse and unSelectCourse actions when onChangeRow is called', () => {
  const store = mockStore({});
  store.dispatch = jest.fn(); // Mock dispatch

  const listCourses = [
    { id: 1, name: 'ES6', credit: 60, isSelected: false },
    { id: 2, name: 'Webpack', credit: 20, isSelected: false },
    { id: 3, name: 'React', credit: 40, isSelected: false }
  ];

  const { getAllByRole } = render(
    <Provider store={store}>
      <CourseList listCourses={listCourses} />
    </Provider>
  );

  const checkboxes = getAllByRole('checkbox');

  // Simulate selecting a course
  fireEvent.click(checkboxes[0]);
  expect(store.dispatch).toHaveBeenCalledWith(selectCourse(1));

  // Simulate unselecting a course
  fireEvent.click(checkboxes[0]);
  expect(store.dispatch).toHaveBeenCalledWith(unSelectCourse(1));
});
