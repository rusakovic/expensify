import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from  '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

// creating fake redux store for testing
const createMockStore = configureMockStore([thunk])

test('should setup reomve expense action object', () => {
  const action = removeExpense({ id: '123abc'});
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
})

test('should setup edit expense action object', () => {
  const action = editExpense( '123abc', {note: 'New note value'} );
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: { note: 'New note value' }
  })
});

test('should setup add expense action object with provided values', () => {

  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  })
});


// test is async. to make the test waiting for a promise, we add 'Done' as argument.
// and call this function at the end.
test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This is one is better',
    createdAt: 100
  }
  store.dispatch(startAddExpense(expenseData)).then(() => {
    //getActions is method of 'redux-mock-store'
    const actions = store.getActions();

    // action[0] is the first action in actions/expenses.js file
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    // check if the data stored in Firebase
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData)
      done();
  });
})

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  }
  store.dispatch(startAddExpense({})).then(() => {
    //getActions is method of 'redux-mock-store'
    const actions = store.getActions();

    // action[0] is the first action in actions/expenses.js file
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    });

    // check if the data stored in Firebase
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseDefaults)
      done();
  });
})

// test('should setup add expense action object with default values', () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       id: expect.any(String),
//       description: '',
//       note: '',
//       amount: 0,
//       createdAt: 0,
//     }
//   })
// })