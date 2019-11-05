import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../../components/NotFoundPage';

test('render NotFoundPage correctly', () => {
  const wrapper = (<NotFoundPage />);
  expect(wrapper).toMatchSnapshot();
})