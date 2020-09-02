import React from 'react';

import ExpenseEntry from './ExpenseEntry'
import ExpenseSummary from './ExpenseSummary'
import ExpenseTypes from './ExpenseTypes';
import ExpenseLog from './ExpenseLog';
import ExpenseReport from './ExpenseReport';

import { connect } from "react-redux";
import { reloadLogs } from "../actions";

function mapDispatchToProps(dispatch) {
    console.log("ExpenseEntry mapDispatchToProps");
    return {
        reloadLogs: (logs) => dispatch(reloadLogs(logs))
    };
}

class ConnectedExpenseForm extends React.Component {
    render() {
        return (
            <div>
                <ExpenseEntry />
                <ExpenseSummary />
                <ExpenseReport />
                <ExpenseLog />
                <ExpenseTypes />
            </div>
        );
    }
}

const ExpenseForm = connect(
    null,
    mapDispatchToProps
)(ConnectedExpenseForm);

export default ExpenseForm;
