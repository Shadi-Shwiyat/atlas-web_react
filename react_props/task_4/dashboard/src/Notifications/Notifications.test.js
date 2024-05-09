import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import Notifications from './Notifications.js';
import NotificationItem from './NotificationItem';

test('renders Notifications without crashing', () => {
  render(<Notifications displayDrawer={true} />);
});

test('renders the text "Here is the list of notifications"', () => {
  const { getByText } = render(<Notifications displayDrawer={true} />);
  const textElement = getByText('Here is the list of notifications');
  expect(textElement).toBeInTheDocument();
});

test('renders three NotificationItem elements', () => {
  const wrapper = shallow(<Notifications displayDrawer={true} />);
  const notificationItems = wrapper.find(NotificationItem);
  expect(notificationItems.length).toBe(3); // Assuming there are three NotificationItem elements
});

test('renders the correct html for the first NotificationItem', () => {
  const { getAllByRole } = render(<Notifications displayDrawer={true} />);
  const notificationItems = getAllByRole('listitem');
  const firstNotificationItem = notificationItems[0];
  expect(firstNotificationItem).toHaveAttribute('data-priority', 'default');
  expect(firstNotificationItem.innerHTML).toContain('New course available');
});

test('displays menu item when displayDrawer is false', () => {
  const wrapper = shallow(<Notifications displayDrawer={false} />);
  const menuItem = wrapper.find('.menuItem');
  expect(menuItem.exists()).toBe(true);
});

test('does not display Notifications when displayDrawer is false', () => {
  const wrapper = shallow(<Notifications displayDrawer={false} />);
  const notifications = wrapper.find('.Notifications');
  expect(notifications.exists()).toBe(false);
});

test('displays menu item when displayDrawer is true', () => {
  const wrapper = shallow(<Notifications displayDrawer={true} />);
  const menuItem = wrapper.find('.menuItem');
  expect(menuItem.exists()).toBe(true);
});

test('displays Notifications when displayDrawer is true', () => {
  const wrapper = shallow(<Notifications displayDrawer={true} />);
  const notifications = wrapper.find('.Notifications');
  expect(notifications.exists()).toBe(true);
});
