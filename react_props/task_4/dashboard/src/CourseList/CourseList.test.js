import React from 'react';
import { render } from '@testing-library/react';
import CourseList from './CourseList';

test('renders CourseList component without crashing', () => {
  render(<CourseList />);
});

test('renders the 5 different rows', () => {
  const { getAllByRole } = render(<CourseList />);
  const rows = getAllByRole('row');
  expect(rows).toHaveLength(5); // Header row + 3 data rows + 1 row for thead
});
