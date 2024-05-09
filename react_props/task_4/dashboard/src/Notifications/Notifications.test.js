import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import Notifications from './Notifications.js';
import NotificationItem from './NotificationItem';

test('renders Notifications without crashing', () => {
  render(<Notifications />);
});

test('renders the text "Here is the list of notifications"', () => {
  const { getByText } = render(<Notifications />);
  const textElement = getByText('Here is the list of notifications');
  expect(textElement).toBeInTheDocument();
});

test('renders three NotificationItem elements', () => {
  const wrapper = shallow(<Notifications />);
  const notificationItems = wrapper.find(NotificationItem);
  expect(notificationItems.length).toBe(3); // Assuming there are three NotificationItem elements
});

test('renders the correct html for the first NotificationItem', () => {
  const { getAllByRole } = render(<Notifications />);
  const notificationItems = getAllByRole('listitem');
  const firstNotificationItem = notificationItems[0];
  expect(firstNotificationItem).toHaveAttribute('data-priority', 'default');
  expect(firstNotificationItem.innerHTML).toContain('New course available');
});