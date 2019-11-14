import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT'});
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
})

test('should NOT remove expense if not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add an expense', () => {
  const expense = {
      id: '6',
      description: 'New expense',
      note: 'New note',
      amount: 514,
      createdAt: 200
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense: expense
    }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense])
});

test('should edit an expense', () => {
  const amount = 111234;
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: {
      amount: amount
    }
  }
  const state = expensesReducer(expenses, action)  ;
  expect(state[1].amount).toBe(amount);
});

test('should not edit expense if expense not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1'
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]]
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]])
});

