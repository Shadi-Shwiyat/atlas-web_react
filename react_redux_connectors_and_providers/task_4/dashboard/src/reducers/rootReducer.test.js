// rootReducer.test.js
import rootReducer from './rootReducer';
import courseReducer from './courseReducer';
import notificationReducer from './notificationReducer';
import uiReducer from './uiReducer';

describe('rootReducer', () => {
  it('should initialize the state correctly', () => {
    const initialState = rootReducer(undefined, {});
    expect(initialState).toEqual({
      courses: courseReducer(undefined, {}),
      notifications: notificationReducer(undefined, {}),
      ui: uiReducer(undefined, {}),
    });
  });

  it('should handle actions correctly', () => {
    const action = { type: 'TEST_ACTION' };
    const expectedState = {
      courses: courseReducer(undefined, action),
      notifications: notificationReducer(undefined, action),
      ui: uiReducer(undefined, action),
    };

    const newState = rootReducer(undefined, action);
    expect(newState).toEqual(expectedState);
  });
});
