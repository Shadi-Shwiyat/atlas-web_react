import React from 'react';
import { shallow } from 'enzyme';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import BodySection from './BodySection';

describe('BodySectionWithMarginBottom Component', () => {
  it('renders BodySection with correct props and CSS applied', () => {
    const title = 'test title';
    const children = <p>test children node</p>;
    const wrapper = shallow(<BodySectionWithMarginBottom title={title}>{children}</BodySectionWithMarginBottom>);
    
    const bodySection = wrapper.find(BodySection);
    expect(bodySection.exists()).toBe(true);
    expect(bodySection.prop('title')).toBe(title);
    expect(bodySection.prop('children')).toBe(children);

    expect(wrapper.find('#bodySectionWithMarginBottom').exists()).toBe(true);
  });
});
