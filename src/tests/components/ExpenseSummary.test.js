import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';
import expenses from '../fixtures/expenses';

test('should render ExpenseSummary without expenses', () => {
  const wrapper = shallow(<ExpenseSummary expenseCount={0} expensesTotal={0} />)
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseSummary with multiple expenses', () => {
  const wrapper = shallow(<ExpenseSummary expenseCount={34} expensesTotal={244} />);
  expect(wrapper).toMatchSnapshot();
});

