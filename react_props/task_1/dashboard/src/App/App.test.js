// task_3/dashboard/src/App.test.js

import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import App from './App.js';

// test('renders App without crashing', () => {
//   render(<App />);
// });

describe('App Component', () => {
  it('contains the Notifications component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Notifications').length).toEqual(1);
  });

  it('contains the Header component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Header').length).toEqual(1);
  });

  it('contains the Login component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Login').length).toEqual(1);
  });

  it('contains the Footer component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Footer').length).toEqual(1);
  });
});
