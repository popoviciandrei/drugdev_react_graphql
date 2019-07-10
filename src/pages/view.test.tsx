import * as React from 'react';
import { shallow } from 'enzyme';
import { View } from './view';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';


describe('When viewing the details page of a contact', () => {

    it('should show a title', () => {
        const classesMock = { root: 'root', list: 'list' };
        const contactMock = { contact: { id: 'id', name: 'name', email: 'email', date_created: '2019-07-02 12:20:21', date_edited: '2019-07-05 13:33:01' } }
        const wrapper = shallow(<View loading="false" classes={classesMock} data={contactMock} />);

        expect(wrapper.containsMatchingElement(<h1>View contact</h1>)).toBe(true);
    });

    it('should contain a List element', () => {
        const classesMock = { root: 'root', list: 'list' };
        const contactMock = { contact: { id: 'id', name: 'name', email: 'email', date_created: '2019-07-02 12:20:21', date_edited: '2019-07-05 13:33:01' } }
        const wrapper = shallow(<View loading="false" classes={classesMock} data={contactMock} />);

        expect(wrapper.find(List).length).toBe(1);
    });
})
