import { Map, fromJS } from 'immutable';
import { filterTypeSelected, getNotifications, getUnreadNotifications } from './notificationSelector';

describe('notification selectors', () => {
  const state = fromJS({
    filter: 'DEFAULT',
    notifications: [
      { id: 1, type: 'default', value: 'New course available', isRead: false },
      { id: 2, type: 'urgent', value: 'New resume available', isRead: true },
      { id: 3, type: 'urgent', value: 'New data available', isRead: false },
    ],
  });

  it('should return the filter type', () => {
    expect(filterTypeSelected(state)).toEqual('DEFAULT');
  });

  it('should return the notifications list', () => {
    const notifications = getNotifications(state);
    expect(notifications.toJS()).toEqual([
      { id: 1, type: 'default', value: 'New course available', isRead: false },
      { id: 2, type: 'urgent', value: 'New resume available', isRead: true },
      { id: 3, type: 'urgent', value: 'New data available', isRead: false },
    ]);
  });

  it('should return the unread notifications', () => {
    const unreadNotifications = getUnreadNotifications(state);
    expect(unreadNotifications.toJS()).toEqual([
      { id: 1, type: 'default', value: 'New course available', isRead: false },
      { id: 3, type: 'urgent', value: 'New data available', isRead: false },
    ]);
  });
});
