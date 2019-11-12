import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpenseSummary = (props) => {
  return (
    <div>
      <h2>working</h2>
      <p>
        Viewing {props.expenses.length} expenses totalling {numeral(props.expensesTotal / 100).format('$0,0.00')}
      </p>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
    expensesTotal: selectExpensesTotal(state.expenses)
  }
}

export default connect(mapStateToProps)(ExpenseSummary);
