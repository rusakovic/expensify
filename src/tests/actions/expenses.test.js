import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
  startAddExpense, 
  addExpense, 
  editExpense, 
  removeExpense, 
  setExpenses, 
  startSetExpenses, 
  startRemoveExpense,
  startEditExpense
} from  '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

// creating a fake uid
const uid = 'thisismytestuid';

const defaultAuthState = { auth: { uid } };

// creating fake redux store for testing
const createMockStore = configureMockStore([thunk]);


// Convert data from our fixtures/expenses to Fireabase data presentation and push it to Firebase
beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt }
  })
  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done())
})

test('should setup reomve expense action object', () => {
  const action = removeExpense({ id: '123abc'});
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
})



test('should remove expense from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id: id
    });
    // we should check if the expense with current id was removed
    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapshot) => {
    // the value of unexisted expense should be null. null equals to false
    expect(snapshot.val()).toBeFalsy();
    done();
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
  const store = createMockStore(defaultAuthState);
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
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData)
      done();
  });
})

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
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
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseDefaults)
      done();
  });
})

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
});

test('should fetch the expenses from Firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done()
  })
});


test('should setup edit expense action object', () => {
  const action = editExpense( '123abc', {note: 'New note value'} );
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: { note: 'New note value' }
  })
});

test('should edit expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id;
  const updates = { note: 'New note for firebase'};
  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id: id,
      updates: updates
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().note).toBe(updates.note)
    done();
  })
})

