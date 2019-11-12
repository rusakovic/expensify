import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';
import expenses from '../fixtures/expenses';

test('should render ExpenseSummary without expenses', () => {
  const wrapper = shallow(<ExpenseSummary expenses={[]} />)
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseSummary with 1 expense', () => {
  const wrapper = shallow(<ExpenseSummary expenses={[expenses[0]]} expensesTotal={'195'} />);
  expect(wrapper).toMatchSnapshot();
})