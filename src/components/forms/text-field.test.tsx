import React from 'react';
import { shallow } from 'enzyme';
import { FormTextField } from './text-field';

describe('When viewing a page containing FormTextField component', () => {

    it('should have the right props', () => {
        const expectedName = 'contactName';
        const expectedValue = 'contactNameValue';
        const expectedClassName = 'contactNameCssCLass';
        const wrapper = shallow(<FormTextField name={expectedName} value={expectedValue} className={expectedClassName} />);

        expect(wrapper.prop('name')).toBe(expectedName);
        expect(wrapper.prop('value')).toBe(expectedValue);
        expect(wrapper.prop('className')).toBe(expectedClassName);

    })
})