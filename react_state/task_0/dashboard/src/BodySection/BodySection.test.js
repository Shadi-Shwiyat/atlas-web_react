import React from 'react';
import { shallow } from 'enzyme';
import BodySection from './BodySection';

describe('BodySection Component', () => {
  it('renders children and one h2 element with correct title', () => {
    const title = 'test title';
    const children = <p>test children node</p>;
    const wrapper = shallow(<BodySection title={title}>{children}</BodySection>);
    
    const h2Element = wrapper.find('h2');
    expect(h2Element.length).toBe(1);
    expect(h2Element.text()).toBe(title);

    const pElement = wrapper.find('p');
    expect(pElement.length).toBe(1);
    expect(pElement.text()).toBe('test children node');
  });
});
