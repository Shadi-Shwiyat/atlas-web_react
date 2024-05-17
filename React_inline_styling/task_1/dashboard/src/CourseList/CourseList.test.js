import React from 'react';
import { render } from '@testing-library/react';
import CourseList from './CourseList';
import { StyleSheetTestUtils } from 'aphrodite';

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

test('renders CourseList component without crashing', () => {
  render(<CourseList />);
});

test('renders the 5 different rows', () => {
  const listCourses = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 }
  ];

  const { getAllByRole } = render(<CourseList listCourses={listCourses} />);
  const rows = getAllByRole('row');
  expect(rows).toHaveLength(5); // Header row + 3 data rows + 1 row for thead
});

test('renders correctly with empty or missing listCourses prop', () => {
  const { getByText, queryAllByRole } = render(<CourseList />);

  expect(queryAllByRole('row')).toHaveLength(3);

  expect(getByText('No course available yet')).toBeInTheDocument();
});

test('renders courses correctly when listCourses is provided', () => {
  const listCourses = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 },
  ];
  const { getByText } = render(<CourseList listCourses={listCourses} />);

  // Check if each course name and credit is rendered correctly
  expect(getByText('ES6')).toBeInTheDocument();
  expect(getByText('60')).toBeInTheDocument();
  expect(getByText('Webpack')).toBeInTheDocument();
  expect(getByText('20')).toBeInTheDocument();
  expect(getByText('React')).toBeInTheDocument();
  expect(getByText('40')).toBeInTheDocument();
});
