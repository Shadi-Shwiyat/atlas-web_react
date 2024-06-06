import React from 'react';
import { shallow } from 'enzyme';
import { fromJS, Map } from 'immutable';
import configureStore from 'redux-mock-store';
import { StyleSheetTestUtils } from 'aphrodite';
import { UnconnectedApp as App, mapStateToProps } from './App.js';

const mockStore = configureStore([]);
const initialState = Map({
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: Map(),
});
const store = mockStore(initialState);

describe('App Component', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('contains the Notifications component', () => {
    const wrapper = shallow(<App isLoggedIn={false} displayDrawer={false} user={{}} />);
    expect(wrapper.find('Notifications').length).toEqual(1);
  });

  it('contains the Header component', () => {
    const wrapper = shallow(<App isLoggedIn={false} displayDrawer={false} user={{}} />);
    expect(wrapper.find('#app-header').length).toEqual(1);
  });

  it('contains the Footer component', () => {
    const wrapper = shallow(<App isLoggedIn={false} displayDrawer={false} user={{}} />);
    expect(wrapper.find('#app-footer').length).toEqual(1);
  });

  it('does not contain the CourseList component by default', () => {
    const wrapper = shallow(<App isLoggedIn={false} displayDrawer={false} user={{}} />);
    expect(wrapper.find('CourseList').length).toEqual(0);
  });

  describe('When isLoggedIn is true', () => {
    it('does not contain the Login component when user is logged in', () => {
      const wrapper = shallow(<App isUserLoggedIn={true} displayDrawer={false} user={{}} />);
      expect(wrapper.find('Login').length).toEqual(0);
    });

    it('contains the CourseList component', () => {
      const wrapper = shallow(<App isUserLoggedIn={true} displayDrawer={false} user={{}} />);
      expect(wrapper.find('CourseList').length).toEqual(1);
    });
  });

  it('has default displayDrawer state as false', () => {
    const wrapper = shallow(<App isLoggedIn={false} displayDrawer={false} user={{}} />);
    expect(wrapper.find('Notifications').prop('displayDrawer')).toBe(false);
  });

  it('sets displayDrawer to true when the action to display the drawer is dispatched', () => {
    const wrapper = shallow(<App isLoggedIn={false} displayDrawer={false} user={{}} />);
    wrapper.setProps({ displayDrawer: true });
    wrapper.update();
    expect(wrapper.find('Notifications').prop('displayDrawer')).toBe(true);
  });

  it('sets displayDrawer to false when the action to hide the drawer is dispatched', () => {
    const wrapper = shallow(<App isLoggedIn={false} displayDrawer={true} user={{}} />);
    wrapper.setProps({ displayDrawer: false });
    wrapper.update();
    expect(wrapper.find('Notifications').prop('displayDrawer')).toBe(false);
  });
});

describe('mapStateToProps', () => {
  it('should return the correct state', () => {
    const state = fromJS({
      ui: {
        isUserLoggedIn: true,
        isNotificationDrawerVisible: false,
        user: Map(),
      }
    });

    const expectedProps = {
      isUserLoggedIn: true,
      displayDrawer: false,
      user: state.getIn(['ui', 'user']).toJS(),
    };

    expect(mapStateToProps(state)).toEqual(expectedProps);
  });
});
