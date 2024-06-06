import { fromJS, Map, List } from 'immutable';
import { getAllCourses } from './courseSelector';

describe('courseSelector', () => {
  it('should return a List of all course entities', () => {
    const state = Map({
      courses: fromJS({
        1: { id: '1', name: 'ES6', credit: 60, isSelected: false },
        2: { id: '2', name: 'Webpack', credit: 20, isSelected: false },
        3: { id: '3', name: 'React', credit: 40, isSelected: false }
      })
    });

    const expectedCourses = fromJS([
      { id: '1', name: 'ES6', credit: 60, isSelected: false },
      { id: '2', name: 'Webpack', credit: 20, isSelected: false },
      { id: '3', name: 'React', credit: 40, isSelected: false }
    ]);

    const result = getAllCourses(state);
    expect(result).toEqual(expectedCourses);
  });

  it('should return an empty List if there are no courses', () => {
    const state = Map({
      courses: Map()
    });

    const expectedCourses = List();

    const result = getAllCourses(state);
    expect(result).toEqual(expectedCourses);
  });
});
