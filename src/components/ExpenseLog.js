import React from 'react';

import { connect } from "react-redux";
import { reloadLogs, loadTypes, loadItems } from "../actions";
import Repository from "./Repository";


const mapStateToProps = state => {
    console.log("Reload expense log");
    return { logs: state.logs };
};

function mapDispatchToProps(dispatch) {
    console.log("ExpenseEntry mapDispatchToProps");
    return {
        reloadLogs: (logs) => dispatch(reloadLogs(logs)),
        loadTypes: (types) => dispatch(loadTypes(types)),
        loadItems: (items) => dispatch(loadItems(items))
    };
}

class ConnectedExpenseLog extends React.Component {
    constructor() {
        super();
        this.handleLoad = this.handleLoad.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.repository = new Repository();
    }

    componentDidMount() {
        var expenses = this.repository.getExpenses();
        this.props.reloadLogs(expenses);

        var types = [...new Set(expenses.map(expense => expense.type))];
        this.props.loadTypes(types);

        var items = [...new Set(expenses.map(expense => expense.item))];
        this.props.loadItems(items);
    }

    handleLoad() {
        var expenses = this.repository.getExpenses();
        console.log("Handle load", expenses);
        this.props.reloadLogs(expenses);
    }

    handleClear() {
        this.repository.clear();
        this.handleLoad();
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Item</th>
                            <th>Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.logs.map(expense =>
                                (
                                    <tr key={expense.id}>
                                        <td>{expense.id}</td>
                                        <td>{expense.type}</td>
                                        <td>{expense.amount}</td>
                                        <td>{expense.date}</td>
                                        <td>{expense.item}</td>
                                        <td>{expense.qty}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><button onClick={this.handleClear} disabled={true}>Clear</button></td>
                            <td><button onClick={this.handleLoad}>Load</button></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

const ExpenseLog = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedExpenseLog);

export default ExpenseLog;