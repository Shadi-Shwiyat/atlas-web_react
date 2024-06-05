import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from './NotificationItem';
import { StyleSheetTestUtils } from 'aphrodite';

describe('NotificationItem Component', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  it('renders without crashing', () => {
    shallow(<NotificationItem type='default'/>);
  });

  it('renders the correct html with type and value props', () => {
    const type = 'default';
    const value = 'test';
    const wrapper = shallow(<NotificationItem type={type} value={value} />);
    expect(wrapper.find(`li[data-priority="${type}"]`).text()).toEqual(value);
  });

  it('renders the correct html with html prop', () => {
    const html = { __html: '<u>test</u>' };
    const wrapper = shallow(<NotificationItem type='default' html={html} />);
    // Get the inner HTML of the <li> element as a string
    const renderedHtml = wrapper.find('li');
    expect(renderedHtml.prop('dangerouslySetInnerHTML').__html).toBe(html.__html); // Compare the __html property
  });
});

describe('NotificationItem Component', () => {
  it('calls markAsRead with the correct ID when clicked', () => {
    const id = 1;
    const markNotificationAsReadMock = jest.fn();
    const notification = { id: id, type: "default", value: "New course available" };

    const wrapper = shallow(<NotificationItem {...notification} markNotificationAsRead={markNotificationAsReadMock} />);
    wrapper.simulate('click');

    expect(markNotificationAsReadMock).toHaveBeenCalledWith(id);
  });
});