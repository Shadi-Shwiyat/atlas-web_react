import { setLoadingState, setNotifications, fetchNotifications } from './notificationActionCreators';
import { SET_LOADING_STATE, FETCH_NOTIFICATIONS_SUCCESS } from './notificationActionTypes';

describe('Notification Action Creators', () => {
  it('should create an action to set the loading state', () => {
    const isLoading = true;
    const expectedAction = {
      type: SET_LOADING_STATE,
      isLoading
    };
    expect(setLoadingState(isLoading)).toEqual(expectedAction);
  });

  it('should create an action to set the notifications', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];
    const expectedAction = {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: notifications
    };
    expect(setNotifications(notifications)).toEqual(expectedAction);
  });

  it('should dispatch fetchNotifications and setLoadingState actions', async () => {
    const dispatch = jest.fn();
    await fetchNotifications()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(setLoadingState(true));
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function)); // Since fetch is async
    expect(dispatch).toHaveBeenCalledWith(setLoadingState(false));
  });
});
