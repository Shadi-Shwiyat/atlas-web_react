import React from 'react';
import { render } from '@testing-library/react';
import CourseListRow from './CourseListRow';

describe('CourseListRow Component', () => {
  test('renders one cell with colspan = 2 when textSecondCell does not exist', () => {
    const { getByText } = render(
      <table>
        <tbody>
          <CourseListRow isHeader={true} textFirstCell="Header" />
        </tbody>
      </table>
    );

    const headerCell = getByText('Header');
    expect(headerCell.getAttribute('colSpan')).toBe('2');
  });

  test('renders two cells when textSecondCell is present', () => {
    const { getAllByRole } = render(
      <table>
        <tbody>
          <CourseListRow isHeader={true} textFirstCell="Header1" textSecondCell="Header2" />
        </tbody>
      </table>
    );

    const headerCells = getAllByRole('columnheader');
    expect(headerCells).toHaveLength(2);
  });

  test('renders correctly two td elements within a tr element', () => {
    const { getAllByRole } = render(
      <table>
        <tbody>
          <CourseListRow isHeader={false} textFirstCell="Data1" textSecondCell="Data2" />
        </tbody>
      </table>
    );

    const dataCells = getAllByRole('cell');
    expect(dataCells).toHaveLength(2);
  });
});
