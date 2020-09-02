import React from 'react';

import { connect } from "react-redux";
import { removeExpense, reloadLogs } from "../actions";
import { clearExpenses } from "../actions";

import Repository from "./Repository";

const mapStateToProps = state => {
    console.log("Expenses:", state.expenses);
    return { expenses: state.expenses };
};

function mapDispatchToProps(dispatch) {
    console.log("ExpenseSummary mapDispatchToProps");
    return {
        removeExpense: id => dispatch(removeExpense(id)),
        clearExpenses: () => dispatch(clearExpenses()),
        reloadLogs: (logs) => dispatch(reloadLogs(logs))
    };
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class ConnectedExpenseSummary extends React.Component {
    constructor() {
        super();
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.repository = new Repository();
    }

    handleRemove(event) {
        event.preventDefault();
        this.props.removeExpense(event.target.id);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.repository.putExpenses(this.props.expenses);
        this.props.clearExpenses();
        this.props.reloadLogs(this.repository.getExpenses());
    }

    render() {
        const total = numberWithCommas(this.props.expenses.reduce((subtotal, expense) => subtotal + Number(expense.amount), 0).toFixed(2));
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Item</th>
                            <th>Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.expenses.map(expense =>
                                (
                                    <tr key={expense.id}>
                                        <td>{expense.id.substring(0,8)}</td>
                                        <td>{expense.type}</td>
                                        <td>{expense.amount}</td>
                                        <td>{expense.date}</td>
                                        <td>{expense.item}</td>
                                        <td>{expense.qty}</td>
                                        <td>
                                            <button id={expense.id} onClick={this.handleRemove} tabIndex="-1">Remove</button>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                        <tr>
                            <td></td>
                            <td>Total</td>
                            <td>{total}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td><button onClick={this.handleSubmit}>Submit</button></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

const ExpenseSummary = connect(mapStateToProps, mapDispatchToProps)(ConnectedExpenseSummary);

export default ExpenseSummary;
