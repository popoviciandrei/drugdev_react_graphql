import React from 'react';
import { shallow } from 'enzyme';
import { UpdateContactForm } from './update-contact-form';
import { FormTextField } from './forms/text-field';
import Button from '@material-ui/core/Button';

describe('When viewing component to update a contact', () => {
    it('should render a title ', () => {
        const contactMock = { id: 'asd', name: 'name', email: 'asd@asd.ro' }
        const classesMock = { container: 'container', textField: 'textField', button: 'button' }
        const historyPushMock = jest.fn();
        const wrapper = shallow(<UpdateContactForm initialInput={contactMock} push={historyPushMock} classes={classesMock} />);

        expect(wrapper.containsMatchingElement(<h1>Edit Contact</h1>)).toBe(true);
    })

    it('should contain 2 input text fields', () => {
        const contactMock = { id: 'asd', name: 'name', email: 'asd@asd.ro' }
        const classes = { container: 'container', textField: 'textField', button: 'button' }
        const historyPushMock = jest.fn();
        const wrapper = shallow(<UpdateContactForm initialInput={contactMock} push={historyPushMock} classes={classes} />);

        expect(wrapper.find(FormTextField).length).toBe(2);
    });

    it('should contain a save button', () => {
        const contactMock = { id: 'asd', name: 'name', email: 'asd@asd.ro' }
        const classes = { container: 'container', textField: 'textField', button: 'button' }
        const historyPushMock = jest.fn();
        const wrapper = shallow(<UpdateContactForm initialInput={contactMock} push={historyPushMock} classes={classes} />);

        expect(wrapper.containsMatchingElement(<Button>Save</Button>)).toBe(true);
    });

    // more test to be added
})