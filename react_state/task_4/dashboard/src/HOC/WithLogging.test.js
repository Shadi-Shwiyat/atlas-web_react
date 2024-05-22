import React from 'react';
import { shallow } from 'enzyme';
import WithLogging from './WithLogging';

describe('WithLogging Higher-Order Component', () => {
  it('logs mount and unmount messages with pure HTML', () => {
    const spy = jest.spyOn(console, 'log');
    const WrappedComponent = () => <p>Hello</p>;
    const ComponentWithLogging = WithLogging(WrappedComponent);
    const wrapper = shallow(<ComponentWithLogging />);
    
    expect(spy).toHaveBeenCalledWith(`Component WrappedComponent is mounted`);
    wrapper.unmount();
    expect(spy).toHaveBeenCalledWith(`Component WrappedComponent is going to unmount`);

    spy.mockRestore();
  });

  it('logs mount and unmount messages with component name', () => {
    const spy = jest.spyOn(console, 'log');
    const Login = () => <div>Login Component</div>;
    Login.displayName = 'Login';
    const ComponentWithLogging = WithLogging(Login);
    const wrapper = shallow(<ComponentWithLogging />);
    
    expect(spy).toHaveBeenCalledWith('Component Login is mounted');
    wrapper.unmount();
    expect(spy).toHaveBeenCalledWith('Component Login is going to unmount');

    spy.mockRestore();
  });
});
