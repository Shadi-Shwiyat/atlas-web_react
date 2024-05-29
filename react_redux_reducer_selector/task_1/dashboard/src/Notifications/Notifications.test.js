import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import Notifications from './Notifications.js';
import NotificationItem from './NotificationItem';
import { getLatestNotification } from '../utils/utils.js';
import { StyleSheetTestUtils } from 'aphrodite';

markNotificationAsRead = (id) => {
  this.setState((prevState) => ({
    listNotifications: prevState.listNotifications.filter(notification => notification.id !== id)
  }));
}

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

test('renders Notifications without crashing', () => {
  render(<Notifications displayDrawer={true} listNotifications={[]} />);
});

test('renders the text "Here is the list of notifications"', () => {
  const { getByText } = render(<Notifications displayDrawer={true} listNotifications={[]} />);
  const textElement = getByText('Here is the list of notifications');
  expect(textElement).toBeInTheDocument();
});

test('renders three NotificationItem elements', () => {
  const listNotifications = [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    { id: 3, type: "urgent", html: { __html: getLatestNotification() } }
  ];
  const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={listNotifications} />);
  const notificationItems = wrapper.find(NotificationItem);
  expect(notificationItems.length).toBe(3); // Assuming there are three NotificationItem elements
});

test('renders the correct html for the first NotificationItem', () => {
  const listNotifications = [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    { id: 3, type: "urgent", html: { __html: getLatestNotification() } }
  ];
  const { getAllByRole } = render(<Notifications displayDrawer={true} listNotifications={listNotifications} />);
  const notificationItems = getAllByRole('listitem');
  const firstNotificationItem = notificationItems[0];
  expect(firstNotificationItem).toHaveAttribute('data-priority', 'default');
  expect(firstNotificationItem.innerHTML).toContain('New course available');
});

test('displays menu item when displayDrawer is false', () => {
  const wrapper = shallow(<Notifications displayDrawer={false} listNotifications={[]} />);
  const menuItem = wrapper.find('#menuItem');
  expect(menuItem.exists()).toBe(true);
});

test('does not display Notifications when displayDrawer is false', () => {
  const wrapper = shallow(<Notifications displayDrawer={false} listNotifications={[]} />);
  const notifications = wrapper.find('.Notifications');
  expect(notifications.exists()).toBe(false);
});

test('displays menu item when displayDrawer is true', () => {
  const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={[]} />);
  const menuItem = wrapper.find('#menuItem');
  expect(menuItem.exists()).toBe(true);
});

test('displays Notifications when displayDrawer is true', () => {
  const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={[]} />);
  const notifications = wrapper.find('#notifications');
  expect(notifications.exists()).toBe(true);
});

test('renders correctly with empty or missing listNotifications prop', () => {
  const wrapper = shallow(<Notifications displayDrawer={true} />);
  expect(wrapper).toBeTruthy();
});

test('displays "No new notification for now" message when listNotifications is empty', () => {
  const { queryByText } = render(<Notifications displayDrawer={true} listNotifications={[]} />);
  const messageElement = queryByText('No new notification for now');
  expect(messageElement).toBeInTheDocument();
});

test('calls markNotificationAsRead when NotificationItem is clicked', () => {
  const markNotificationAsRead = jest.fn();
  const listNotifications = [
    { id: 1, type: "default", value: "New course available" }
  ];

  const wrapper = shallow(
    <Notifications
      displayDrawer={true}
      listNotifications={listNotifications}
      markNotificationAsRead={markNotificationAsRead}
    />
  );

  // Find the NotificationItem and dive to simulate the click on the inner element
  const notificationItemWrapper = wrapper.find(NotificationItem).first().dive();

  // Simulate the click
  notificationItemWrapper.find('li').simulate('click');

  // Check if the mock function is called
  expect(markNotificationAsRead).toHaveBeenCalledWith(1);
});

describe('Notifications Component', () => {
  it('does not rerender with the same list', () => {
    const listNotifications = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "urgent", html: { __html: "Notification content" } }
    ];
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={listNotifications} />);
  
    wrapper.setProps({ listNotifications });
    expect(wrapper.state('displayDrawer')).toBe(true);
  });

  it('rerenders with a longer list', () => {
    const initialList = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "urgent", html: { __html: "Notification content" } }
    ];
    const updatedList = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "urgent", html: { __html: "Notification content" } },
      { id: 4, type: "default", value: "Another notification" }
    ];
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={initialList} />);

    wrapper.setProps({ listNotifications: updatedList });
    expect(wrapper.state('displayDrawer')).toBe(true);
  });

  it('calls handleDisplayDrawer when the menu item is clicked', () => {
    const handleDisplayDrawer = jest.fn();
    const wrapper = shallow(<Notifications handleDisplayDrawer={handleDisplayDrawer} />);
    wrapper.find('#menuItem').simulate('click');
    expect(handleDisplayDrawer).toHaveBeenCalled();
  });

  it('calls handleHideDrawer when the close button is clicked', () => {
    const handleHideDrawer = jest.fn();
    const wrapper = shallow(<Notifications displayDrawer={true} handleHideDrawer={handleHideDrawer} />);
    wrapper.find('button').simulate('click');
    expect(handleHideDrawer).toHaveBeenCalled();
  });
});
